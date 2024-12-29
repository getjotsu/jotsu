import { Client } from 'api';

export type ForgotPasswordData = {
    email: string;
    reset_url: string;
};

export type ForgotPasswordResponse = ForgotPasswordData;

export async function forgotPassword(apiClient: Client, data: ForgotPasswordData) {
    return await apiClient.post<ForgotPasswordResponse>('/auth/forgot_password', data);
}
