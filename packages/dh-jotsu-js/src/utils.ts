export function saveInnerText(element: HTMLElement) {
    if (!element.dataset.innerText) {
        element.dataset.innerText = element.innerText;
    }
}

export function findErrorHolder(element: HTMLElement): HTMLElement | null {
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

export function getAccountId(accountId: string | null | undefined) {
    if (accountId) {
        return accountId;
    }
    if (typeof window !== 'undefined') {
        const q = new URLSearchParams(window.location.search);
        return q.get('account');
    }
    return null;
}

export function setErrorHolder(errorHolder: HTMLElement | null | undefined, message: string) {
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

export function resetErrorHolder(errorHolder: HTMLElement | null | undefined) {
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

export function formRedirect(form: HTMLFormElement) {
    const redirect = form.dataset.redirect;
    if (redirect) {
        window.location.href = redirect;
        return redirect;
    }
    return false;
}

export function formTemplate(form: HTMLFormElement) {
    const templateId = form.dataset.template;
    if (templateId) {
        return document.getElementById(templateId);
    }
    return null;
}

export function formDataAsJson(formData: FormData) {
    const object = {} as Record<string, any>;
    formData.forEach((value, key) => (object[key] = value));
    return object;
}
