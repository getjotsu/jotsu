import {formValidate, INPUT_SELECTOR} from './validate';

import {formSubmitHandler} from './submit';
import {formResetHandler} from './reset';
import {customEvent} from '../events';

export function formHydrate(form: HTMLFormElement) {
    form.querySelectorAll<HTMLInputElement|HTMLTextAreaElement>(`${INPUT_SELECTOR}, textarea`).forEach(element => {
        element.addEventListener('blur', function () {
            if (form.hasAttribute('data-invalid')) {
                formValidate(form);
            }
        });
    });

    form.addEventListener('submit', formSubmitHandler);
    form.addEventListener('reset', formResetHandler);
    customEvent('gauged.form.hydrate', form);
}
