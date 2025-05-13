export type ErrorDetail = {
    detail: string;
    res: Response | null;
};

export type Account = {
    id: string;
    name: string;
    created_at: string;
    onboarded_at: string | null;
    owner_id: string | null;
};

export type Role = {
    id: string;
    name: string;
    description: string | null;
};

export type User = {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    account_id: string;
    account?: Account;
    roles?: Role[];
    system?: boolean;
};

export type FormInstance = {
    id: string;
    name: string;
    ip_address: string;
    continent: string;
    country: string;
    region: string;
    city: string;
    latitude: string;
    longitude: string;
    timezone: string;
    headers: Record<string, string>;
    data: Record<string, string>;
};

export type AuthToken = {
    access_token: string;
    token_type: 'bearer';
};

export type TokenResponse = {
    token: AuthToken;
    user: User;
    csrf_token: string;
};
