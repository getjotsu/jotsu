import {resetInput} from 'lib/forms/reset';
import {fieldError, getIntAttr, requiredError} from './common';
import {formValidate} from './index';

// Regexp checks from is.js.
// See license: https://github.com/arasatasaygin/is.js/blob/master/LICENSE
// Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook
// Scott Gonzalez: Email address validation
const REGEXES = {
    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, // eslint-disable-line no-control-regex
    url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
} as {[p: string]: RegExp}


function inputMatchRegex(input: HTMLInputElement|HTMLTextAreaElement, type: string) {
    const regex = REGEXES[type];
    return regex.test(input.value);
}

export function validateInput(input: HTMLInputElement|HTMLTextAreaElement): boolean {
    if (input.hasAttribute('required')) {
        if (!input.value) {
            return requiredError(input);
        }
    }

    if (input.type === 'email' && input.value && !inputMatchRegex(input, 'email')) {
        return fieldError(input, 'type', 'The input must be a valid email address.');
    }

    if (input.type === 'url' && input.value && !inputMatchRegex(input, 'url')) {
        return fieldError(input, 'type', 'The input must be a valid URL.');
    }

    const minLength = getIntAttr(input, 'minlength');
    if (!isNaN(minLength) && input.value && input.value.length < minLength) {
        return fieldError(input, 'minlength', `The input must be at least ${minLength} characters.`);
    }

    const maxLength = getIntAttr(input, 'maxlength');
    if (!isNaN(maxLength) && input.value && input.value.length > maxLength) {
        return fieldError(input, 'maxlength', `The input must be no more than ${maxLength} characters.`);
    }

    const pattern = input.getAttribute('pattern')
    if (pattern && input.value) {
        const regex = new RegExp(pattern);
        if (!regex.test(input.value)) {
            return fieldError(input, 'pattern', `The input must match the pattern '${pattern}'.`);
        }
    }

    const match = input.dataset.match;
    if (match) {
        const element = document.getElementById(match) as HTMLInputElement|null;
        if (!element || element.value !== input.value) {
            return fieldError(input, 'pattern', `The input must match the element '${match}'.`);
        }
    }

    const custom = input.dataset.custom;
    if (custom) {
        const funcPtr = (window as any)[custom] as ((input: HTMLElement) => boolean)|undefined;
        if (typeof funcPtr !== 'undefined') {
            if (!funcPtr(input)) {
                return fieldError(input, 'custom', 'This field failed validation.');
            }
        }
    }

    resetInput(input);
    return true
}
