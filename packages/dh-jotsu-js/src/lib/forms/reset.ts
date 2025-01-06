import { resetElementError } from 'utils';
import { customEvent } from 'lib/events';
import { findFormGroup } from './validate/common';

export function resetInput(input: HTMLInputElement | HTMLTextAreaElement): true {
    const formGroup = findFormGroup(input);
    if (formGroup) {
        formGroup.classList.remove('is-error');
    }
    input.removeAttribute('aria-invalid');
    resetElementError(input);
    return true;
}

export function formReset(form: HTMLFormElement) {
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea').forEach((input) => {
        resetInput(input);
    });
    form.removeAttribute('data-invalid');
    resetElementError(form);
}

export function formResetHandler(event: Event) {
    const form = event.target as HTMLFormElement;
    if (form.hasAttribute('novalidate')) {
        formReset(form);
    }
    customEvent('gauged.form.reset', form);
    return true;
}
