import type { User } from 'types';
import { Client } from 'api';

export type ResetPasswordData = {
    token: string;
    password: string;
};

export async function resetPassword(apiClient: Client, data: ResetPasswordData) {
    return await apiClient.post<User>('/auth/reset_password', data);
}
