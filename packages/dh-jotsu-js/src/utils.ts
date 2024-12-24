export function getAccountId(accountId: string|null|undefined) {
    if (accountId) {
        return accountId;
    }
    if (typeof window !== 'undefined') {
        const q = new URLSearchParams(window.location.search);
        return q.get('account');
    }
    return null;
}
