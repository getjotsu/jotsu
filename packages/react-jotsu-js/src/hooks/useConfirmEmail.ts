import { useEffect, useState } from 'react';
import type { Client, User } from '@jotsu/jotsu-js';
import { confirmEmail, getFirstQueryParam, getErrorDetail } from '@jotsu/jotsu-js';

export function useConfirmEmail(apiClient: Client): User | Error | undefined {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string>();

    const token = getFirstQueryParam('t');

    useEffect(() => {
        if (token) {
            confirmEmail(apiClient, { token })
                .then((user) => setUser(user))
                .catch((e) => setError(getErrorDetail(e)));
        }
    }, [apiClient, token]);

    return error ? Error(error) : user;
}
