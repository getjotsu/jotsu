import type { User, ErrorDetail } from 'types';
import { Client } from 'api';

export async function fetchMe(apiClient: Client): Promise<User> {
    if (!apiClient.accessToken) {
        const res = await apiClient.refreshAccessToken();
        if (!res && apiClient.loginUrl) {
            window.location.href = apiClient.loginUrl;

            throw { detail: 'Unauthorized', res: null } as ErrorDetail;
        }
    }
    return await apiClient.get<User>('/auth/me?expand=roles&expand=account');
}
