import { ErrorDetail } from './types';

export function buildUrlWithOffsetLimit(baseUrl: string, offset?: number, limit?: number) {
    const url = new URL(baseUrl);
    if (typeof offset !== 'undefined') {
        url.searchParams.set('offset', offset.toString());
    }
    if (typeof limit !== 'undefined') {
        url.searchParams.set('limit', limit.toString());
    }
    return url.toString();
}

export function getDocumentAccountId(): string | undefined {
    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="jotsu-account"]');
    if (meta && meta.content) {
        return meta.content;
    }
    if (document.body.dataset.account) {
        return document.body.dataset.account;
    }
    const account = new URLSearchParams(window.location.search).get('account');
    if (account) {
        return account;
    }
    return undefined;
}

export function getAccountIdFromElement(element: HTMLElement) {
    if (element.dataset.account) {
        return element.dataset.account;
    }
    const accountId = getDocumentAccountId();
    if (accountId) {
        return accountId;
    }
    const error = `Your account number could not be found.  Please specify it via one of the following: a 'jotsu-account' meta tag (preferred), the element 'data-account' attribute, the document body 'data-account' attribute or the 'account' query string.`;
    console.error(error);
    throw Error(error);
}

export function getTestMode(element: HTMLElement) {
    let test = new URLSearchParams(window.location.search).get('test');
    if (!test) {
        if (element.hasAttribute('data-test')) {
            test = element.dataset.test || 'true';
        }
    }
    if (test) {
        test = test.toLowerCase();
        if (test === 'error') {
            return 'error';
        }
        return ['', 't', '1', 'true'].includes(test.toLowerCase());
    }
    return false;
}

export function isUndefined(value: any): boolean {
    return typeof value === 'undefined';
}

export function isDefined(value: any): boolean {
    return !isUndefined(value);
}

export function isString(s: any) {
    return typeof s === 'string' || s instanceof String;
}

export function isFunction(f: any) {
    return typeof f === 'function';
}

export function isError(e: any) {
    return e instanceof Error;
}

export function getErrorDetail(e: any): string {
    if (e instanceof TypeError) {
        const typeError = e as TypeError;
        console.log(e.stack);
        return typeError.message ? typeError.message : typeError.toString();
    }

    const detail = e as ErrorDetail;
    const error = detail.detail ? detail.detail : e;

    return isString(error) ? error.toString() : JSON.stringify(error);
}

export function redirectURI() {
    const params = new URLSearchParams(document.location.search);
    const location = params.get('redirect_uri');
    return location ? location : '/';
}

export function getFirstQueryParam(name: string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
