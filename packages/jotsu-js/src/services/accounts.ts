// noinspection JSUnusedGlobalSymbols
import { Account, ErrorDetail } from 'types';
import { API_URL } from 'api';

export async function fetchAccount(accountId: string) {
    const url = `${API_URL}/${accountId}`;

    const res = await fetch(url);
    if (res.status !== 200) {
        throw (await res.json()) as ErrorDetail;
    }

    return (await res.json()) as Account;
}
