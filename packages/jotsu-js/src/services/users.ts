// noinspection JSUnusedGlobalSymbols
import { User } from 'types';

import { Client } from 'api';
import { buildUrlWithOffsetLimit } from 'utils';

export async function fetchUsers(apiClient: Client, options?: { offset?: number; limit?: number }) {
    const url = buildUrlWithOffsetLimit(`/${apiClient.accountId}/users`, options?.offset, options?.limit);
    return apiClient.get<User[]>(url);
}

export async function deleteUser(apiClient: Client, userId: string) {
    const url = apiClient.buildUrl(`/users/${userId}`);
    return apiClient.delete<User>(url.toString());
}
