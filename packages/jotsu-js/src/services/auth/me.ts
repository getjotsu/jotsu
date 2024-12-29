import type { User } from 'types';
import { Client } from 'api';

export async function fetchMe(apiClient: Client) {
    return await apiClient.get<User>('/auth/me?expand=roles&expand=account');
}
