import {requiredError} from './common';
import {resetInput} from 'lib/forms/reset';

export function validateCheckbox(input: HTMLInputElement): boolean {
    if (input.hasAttribute('required')) {
        if (!input.checked) {
            return requiredError(input);
        }
    }
    resetInput(input);
    return true
}
