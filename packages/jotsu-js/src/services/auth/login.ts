import type { AuthToken, ErrorDetail, User } from 'types';
import { Client } from 'api';

export type LoginResponse = {
    token: AuthToken;
    user: User;
};

export async function login(apiClient: Client, username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    /* login is the one non-JSON endpoint (for oauth2) */
    const res = await fetch(apiClient.buildUrl('/auth/login'), {
        method: 'POST',
        body: formData,
    });

    if (res.status >= 300) {
        const detail = (await res.json()) as ErrorDetail;
        detail.res = res;
        throw detail;
    }

    const loginResponse = (await res.json()) as LoginResponse;
    apiClient.setToken(loginResponse.token.access_token);
    return loginResponse;
}
