import { formValidate } from './validate';
import { cancelableCustomEvent, customEvent } from 'lib/events';
import { type ErrorDetail, formSubmit, getAccountIdFromElement, getTestMode } from '@jotsu/jotsu-js';

import { formReset } from './reset';
import { findErrorHolder, formDataAsJson, formRedirect, formTemplate, setErrorHolder } from 'utils';

function formSuccess(form: HTMLFormElement, res: any) {
    customEvent('jotsu.form.submit.success', res);

    formReset(form);
    if (formRedirect(form)) {
        return true;
    }
    const template = formTemplate(form);
    if (template) {
        form.outerHTML = template.innerHTML;
    }
    return true;
}

function formError(event: SubmitEvent, form: HTMLFormElement, errorDetail: ErrorDetail) {
    event.preventDefault();
    const errorHolder = findErrorHolder(form);
    setErrorHolder(errorHolder, errorDetail?.detail || 'Unknown network error.');
    customEvent('jotsu.form.submit.error', errorDetail);
}

export async function formSubmitHandler(event: SubmitEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    if (form.hasAttribute('novalidate')) {
        if (!formValidate(form)) {
            return false;
        }
    }
    const canceled = !cancelableCustomEvent('jotsu.form.submit', form);
    if (canceled) {
        return false;
    }

    const testMode = getTestMode(form);
    if (testMode) {
        if (testMode !== 'error') {
            const data = formDataAsJson(new FormData(form));
            return formSuccess(form, { data });
        } else {
            const errorDetail: ErrorDetail = {
                detail: 'Test Error',
                res: new Response(),
            };
            return formError(event, form, errorDetail);
        }
    }

    try {
        const accountId = getAccountIdFromElement(form);
        const res = await formSubmit(accountId, form);
        return formSuccess(form, res);
    } catch (e) {
        return formError(event, form, e as ErrorDetail);
    }
}
