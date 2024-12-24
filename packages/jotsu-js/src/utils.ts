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

export function getDocumentAccountId(): string|undefined {
    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="gauged-account"]');
    if (meta && meta.content) {
        return meta.content;
    }
    if (document.body.dataset.account) {
        return document.body.dataset.account
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
    const error = `Your account number could not be found.  Please specify it via one of the following: a 'gauged-account' meta tag (preferred), the element 'data-account' attribute, the document body 'data-account' attribute or the 'account' query string.`;
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

export function formDataAsJson(formData: FormData) {
    const object = {} as Record<string, any>;
    formData.forEach((value, key) => object[key] = value);
    return object;
}

export function formTemplate(form: HTMLFormElement) {
    const templateId = form.dataset.template;
    if (templateId) {
        return document.getElementById(templateId);
    }
    return null;
}

export function formRedirect(form: HTMLFormElement) {
    const redirect = form.dataset.redirect;
    if (redirect) {
        window.location.href = redirect;
        return redirect;
    }
    return false;
}

export function findErrorHolder(element: HTMLElement): HTMLElement|null {
    const ariaErrorMessage = element.getAttribute('aria-errormessage');
    if (ariaErrorMessage) {
        const element = document.getElementById(ariaErrorMessage);
        if (element) {
            return element;
        }
    }
    const ariaDescribedBy = element.getAttribute('aria-describedby');
    if (ariaDescribedBy) {
        const element = document.getElementById(ariaDescribedBy);
        if (element) {
            return element;
        }
    }
    return null;
}

export function saveInnerText(element: HTMLElement) {
    if (!element.dataset.innerText) {
        element.dataset.innerText = element.innerText;
    }
}

export function setErrorHolder(errorHolder: HTMLElement|null|undefined, message: string) {
    if (errorHolder) {
        saveInnerText(errorHolder);
        errorHolder.innerText = message;
    } else {
        console.log(message);
    }
}

export function setElementError(element: HTMLElement, message: string) {
    const errorHolder = findErrorHolder(element);
    setErrorHolder(errorHolder, message);
}

export function resetErrorHolder(errorHolder: HTMLElement|null|undefined) {
    if (errorHolder) {
        if (errorHolder.hasAttribute('data-inner-text')) {
            errorHolder.innerText = errorHolder.dataset.innerText || '';
            delete errorHolder.dataset.innerText;
        }
    }
}

export function resetElementError(element: HTMLElement) {
    const errorHolder = findErrorHolder(element);
    if (errorHolder) {
        if (errorHolder.hasAttribute('data-inner-text')) {
            errorHolder.innerText = errorHolder.dataset.innerText || '';
            delete errorHolder.dataset.innerText;
        }
    }
}
