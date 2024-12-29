import type { User } from 'types';
import { Client } from 'api';

export type RegisterData = {
    email: string;
    password: string;
    first_name?: string | null;
    last_name?: string | null;
};

export async function register(apiClient: Client, data: RegisterData) {
    return await apiClient.post<User>('/auth/register', data);
}
