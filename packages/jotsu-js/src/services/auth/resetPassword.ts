import type { User } from 'types';
import { Client } from 'api';

export type ResetPasswordData = {
    token: string;
    username: string;
    password: string;
};

export async function resetPassword(apiClient: Client, data: ResetPasswordData) {
    return await apiClient.post<User>('/auth/reset_password', data);
}

export async function verifyResetPasswordToken(apiClient: Client, token: string) {
    return await apiClient.get<User>(`/auth/reset_password?token=${token}`);
}
