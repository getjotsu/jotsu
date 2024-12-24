// noinspection JSUnusedGlobalSymbols

import {ErrorDetail} from 'types';

export const API_URL = window.process?.env?.API_URL ? window.process?.env.API_URL : 'https://api.jotsu.com';

export class Client {
    public readonly base;
    public readonly accountId: string;
    private token: string|undefined;

    constructor(accountId: string, options?: {token?: string, base?: string}) {
        this.base = options?.base ? options.base : API_URL;
        this.accountId = accountId;
        this.token = options?.token;
    }

    setToken(token: string|null|undefined) {
        this.token = token ? token : undefined;
    }

    clearToken() {
        this.setToken(undefined);
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

    async request<T>(method: string, url: string, data?: any, options?: {token?: string}): Promise<T> {
        url = url.startsWith('/') ? `${this.base}/${this.accountId}${url}` : url;
        method = method.toUpperCase();
        const token = this.token ? this.token : options?.token;

        const headers = {} as Record<string, string>;
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        if (!['GET', 'DELETE'].includes(method)) {
            headers['Content-Type'] = 'application/json';
        }

        const res = await fetch(
            url,
            {
                method, headers,
                body: data ? JSON.stringify(data) : undefined,
            }
        )

        if (res.status >= 300) {
            const detail = (await res.json()) as ErrorDetail;
            detail.res = res;
            throw detail;
        }
        return await res.json() as T;
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

    constructor(accountId: string, options?: {key?: string, base?: string}) {
        const key = options?.key ? options.key : 'access_token';
        const token = window.sessionStorage.getItem(key) || undefined;
        super(accountId, {token, base: options?.base});
        this.key = key;
    }

    setToken(token: string|undefined) {
        if (token) {
            window.sessionStorage.setItem(this.key, token);
        } else {
            window.sessionStorage.removeItem(this.key);
        }
        super.setToken(token);
    }
}
