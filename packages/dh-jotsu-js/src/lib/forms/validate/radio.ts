import { setErrorHolder } from 'utils';
import { findFormGroup } from './common';

function findFormRadiosByName(form: HTMLFormElement, name: string): HTMLInputElement[] {
    return Array.from(form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`));
}

/*
 * Radios use the first errormessage on an input with the given name.
 * If no input has an errormessage, then the first describedby element is used.
 */
function findRadioErrorHolder(inputs: HTMLInputElement[]): HTMLElement | null {
    for (const input of inputs) {
        const ariaErrorMessage = input.getAttribute('aria-errormessage');
        if (ariaErrorMessage) {
            const element = document.getElementById(ariaErrorMessage);
            if (element) {
                return element;
            }
        }
    }
    for (const input of inputs) {
        const ariaErrorMessage = input.getAttribute('aria-describedby');
        if (ariaErrorMessage) {
            const element = document.getElementById(ariaErrorMessage);
            if (element) {
                return element;
            }
        }
    }
    return null;
}

/*
 * A radio button is required if *any* of the inputs has a 'required' attribute.
 */
function isRadioRequired(inputs: HTMLInputElement[]): boolean {
    for (const input of inputs) {
        if (input.hasAttribute('required')) {
            return true;
        }
    }
    return false;
}

/*
 * A radio button is required if *any* of the inputs has a 'required' attribute.
 */
function isRadioSet(inputs: HTMLInputElement[]): boolean {
    for (const input of inputs) {
        if (input.checked) {
            return true;
        }
    }
    return false;
}

function radioInputError(inputs: HTMLInputElement[]): false {
    for (const input of inputs) {
        input.setAttribute('aria-invalid', '');
    }

    const formGroup = findFormGroup(inputs[0]);
    if (formGroup) {
        formGroup.classList.add('is-error');
    }
    return false;
}

function radioErrorMessage(inputs: HTMLInputElement[]) {
    for (const input of inputs) {
        const message = input.dataset[`required_message`];
        if (message) {
            return message;
        }
    }
    return undefined;
}

export function validateRadio(form: HTMLFormElement, input: HTMLInputElement, handledRadios: Set<string>): boolean {
    const name = input.name;
    if (!name || handledRadios.has(name)) {
        return true;
    }

    const radios = findFormRadiosByName(form, name);
    const required = isRadioRequired(radios);
    if (!required || isRadioSet(radios)) {
        handledRadios.add(name);
        return true;
    }

    const errorHolder = findRadioErrorHolder(radios);
    setErrorHolder(errorHolder, radioErrorMessage(radios) || 'You must select an option.');
    return radioInputError(radios);
}
