import { setElementError } from 'utils';

export function findFormGroup(input: HTMLElement): HTMLElement | null {
    let parent = input.parentElement;
    while (parent) {
        if (parent.classList.contains('form-group')) {
            return parent;
        }
        if (parent.tagName === 'FORM') {
            break;
        }
        parent = parent.parentElement;
    }
    return null;
}

export function getIntAttr(element: HTMLElement, name: string) {
    const attr = element.getAttribute(name);
    if (attr) {
        return parseInt(attr);
    }
    return NaN;
}

function errorMessage(input: HTMLElement, type: string) {
    return input.dataset[`${type}_message`];
}

function inputError(input: HTMLElement): false {
    input.setAttribute('aria-invalid', '');

    const formGroup = findFormGroup(input);
    if (formGroup) {
        formGroup.classList.add('is-error');
    }
    return false;
}

export function fieldError(input: HTMLElement, type: string, defaultErrorMessage: string) {
    setElementError(input, errorMessage(input, type) || defaultErrorMessage);
    return inputError(input);
}

export function requiredError(input: HTMLElement) {
    return fieldError(input, 'required', 'This field is required.');
}
