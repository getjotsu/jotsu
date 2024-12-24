import {validateInput} from './input';
import {validateCheckbox} from './checkbox';
import {validateRadio} from './radio';

export const INPUT_SELECTOR = 'input:not([type=button]):not([type=reset]):not([type=submit]):not([type=hidden])';

export function formInputValidate(form: HTMLFormElement, input:HTMLInputElement, radios: Set<string> = new Set()) {
    if (input.type === 'checkbox') {
        return validateCheckbox(input);
    }

    if (input.type === 'radio') {
        return validateRadio(form, input, radios);
    }

    return validateInput(input);
}

export function formValidate(form: HTMLFormElement): boolean {
    const radios = new Set<string>();

    let result = true;
    form.querySelectorAll<HTMLInputElement>(INPUT_SELECTOR).forEach(input => {
        if (!formInputValidate(form, input, radios)) {
            result = false;
        }
    });
    form.querySelectorAll<HTMLTextAreaElement>('textarea').forEach(textarea => {
        if (!validateInput(textarea)) {
            result = false;
        }
    });

    if (result) {
        form.removeAttribute('data-invalid');
    } else {
        form.setAttribute('data-invalid', '');
    }
    return result;
}
