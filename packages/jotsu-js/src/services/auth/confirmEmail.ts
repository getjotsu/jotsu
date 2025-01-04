import type { User } from 'types';
import { Client } from 'api';

export type ConfirmEmailData = {
    token: string;
};

export async function confirmEmail(apiClient: Client, data: ConfirmEmailData) {
    return await apiClient.post<User>('/auth/confirm_email', data);
}
