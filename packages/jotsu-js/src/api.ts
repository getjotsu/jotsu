// noinspection JSUnusedGlobalSymbols

import type { ErrorDetail, TokenResponse, User } from 'types';
import { getCookie } from './utils';

export const API_URL = window.process?.env?.API_URL ? window.process?.env.API_URL : 'https://api.jotsu.com';

export class Client {
    public readonly base;

    /* Use protected variables and getters so that derived classes can access. */
    protected _accountId: string;
    protected _bffPath: string;
    protected _accessToken: string | undefined;
    protected _csrfToken: string | undefined;
    protected _currentUser: User | undefined;
    protected _loginUrl: string | undefined;

    constructor(accountId: string, options?: { token?: string; base?: string; bffPath?: string; loginUrl?: string }) {
        this.base = options?.base ? options.base : API_URL;
        this._bffPath = options?.bffPath ? options.bffPath : '/api/auth';
        this._accountId = accountId;
        this._accessToken = options?.token;
        this._loginUrl = options?.loginUrl;
    }

    get accountId() {
        return this._accountId;
    }

    get bffPath() {
        return this._bffPath;
    }

    get loginUrl() {
        return this._loginUrl;
    }

    get loginAPIEndpoint() {
        return `${this.base}/${this.accountId}/auth/login`;
    }

    get logoutAPIEndpoint() {
        return `${this.base}/${this.accountId}/auth/logout`;
    }

    get currentUser(): User | undefined {
        return this._currentUser;
    }

    get accessToken(): string | undefined {
        return this._accessToken;
    }

    clearTokens() {
        this._currentUser = undefined;
        this._accessToken = undefined;
        this._csrfToken = undefined;
    }

    buildUrl(path: string, offset?: number, limit?: number): URL {
        path = `/${this.accountId}${path}`;

        const url = new URL(path, this.base);
        if (typeof offset !== 'undefined') {
            url.searchParams.set('offset', offset.toString());
        }
        if (typeof limit !== 'undefined') {
            url.searchParams.set('limit', limit.toString());
        }
        return url;
    }

    async getCSRFToken(): Promise<string> {
        if (this._csrfToken) {
            return this._csrfToken;
        }

        // This will only work if the customer's webserver proxies it.
        const cookie = getCookie('csrf_token');
        if (cookie) {
            return cookie;
        }

        const url = `${this.bffPath}/csrf_token`;
        const res = await fetch(url, {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${this._accessToken}`,
            },
        });
        const data = await res.json();
        this._csrfToken = data.csrf_token;
        return this._csrfToken as string;
    }

    async refreshAccessToken(): Promise<TokenResponse | null> {
        const csrf_token = await this.getCSRFToken();

        const url = `${this.bffPath}/refresh`;
        try {
            const res = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrf_token,
                },
            });
            const data = (await res.json()) as TokenResponse;

            this._currentUser = data.user;
            this._accessToken = data.token.access_token;
            this._csrfToken = data.csrf_token;

            return data;
        } catch (_) {}
        return null;
    }

    async login(username: string, password: string) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const res = await fetch(`${this.bffPath}/login`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });

        if (res.status >= 300) {
            const detail = (await res.json()) as ErrorDetail;
            detail.res = res;
            throw detail;
        }

        const loginResponse = (await res.json()) as TokenResponse;
        this._accessToken = loginResponse.token.access_token;
        this._csrfToken = loginResponse.csrf_token;
        return loginResponse;
    }

    async logout() {
        const formData = new FormData();
        if (this._accessToken) {
            formData.append('access_token', this._accessToken);
        }

        await fetch(`${this.bffPath}/logout`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });
        this.clearTokens();
    }

    async fetchWithAuth(input: RequestInfo, init?: RequestInit, retry = true): Promise<Response> {
        const authHeaders = this._accessToken ? { Authorization: `Bearer ${this._accessToken}` } : undefined;
        const response = await fetch(input, {
            ...init,
            headers: {
                ...init?.headers,
                ...authHeaders,
            },
        });

        if (response.status === 401 && retry) {
            const refreshedAccessToken = await this.refreshAccessToken();

            if (refreshedAccessToken) {
                return this.fetchWithAuth(input, init, false); // retry once
            } else if (this._loginUrl) {
                window.location.href = this._loginUrl;
            }
        }
        return response;
    }

    async request<T>(method: string, url: string, data?: any): Promise<T> {
        url = url.startsWith('/') ? `${this.base}/${this.accountId}${url}` : url;
        method = method.toUpperCase();

        const headers = {} as Record<string, string>;
        if (!['GET', 'DELETE'].includes(method)) {
            headers['Content-Type'] = 'application/json';
        }

        const res = await this.fetchWithAuth(url, {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        if (res.status >= 300) {
            const detail = (await res.json()) as ErrorDetail;
            detail.res = res;
            throw detail;
        }
        return (await res.json()) as T;
    }

    async get<T>(url: string) {
        return this.request<T>('GET', url, undefined);
    }

    async patch<T>(url: string, data: any) {
        return this.request<T>('PATCH', url, data);
    }

    async post<T>(url: string, data: any) {
        return this.request<T>('POST', url, data);
    }

    async delete<T>(url: string) {
        return this.request<T>('DELETE', url, undefined);
    }
}

export class StorageClient extends Client {
    private readonly key;

    constructor(accountId: string, options?: { key?: string; base?: string }) {
        const key = options?.key ? options.key : 'access_token';
        const token = window.sessionStorage.getItem(key) || undefined;
        super(accountId, { token, base: options?.base });
        this.key = key;
    }

    async refreshAccessToken(): Promise<TokenResponse | null> {
        const res = await super.refreshAccessToken();
        if (res?.token.access_token) {
            window.sessionStorage.setItem(this.key, res?.token.access_token);
        } else {
            window.sessionStorage.removeItem(this.key);
        }
        return res;
    }

    clearTokens() {
        super.clearTokens();
        window.sessionStorage.removeItem(this.key);
    }

    async login(username: string, password: string) {
        const res = await super.login(username, password);
        window.sessionStorage.setItem(this.key, res?.token.access_token);
        return res;
    }

    async logout() {
        window.sessionStorage.removeItem(this.key);
        return super.logout();
    }
}
