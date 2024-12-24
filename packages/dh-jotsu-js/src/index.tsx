import {render, ComponentType, h} from 'preact';

import {domReady} from '@jotsu/jotsu-js';
import {HelloWorld, AccountDescription, Register} from '@jotsu/react-jotsu-js';

import withRequiredAccount from 'components/withRequiredAccount';
import ErrorBoundary from 'components/errors/ErrorBoundary';

import {formHydrate} from './lib/forms';
import {formStyle} from './lib/forms/style';

/* Declarative */
domReady(() => {
    let addStyle = false;
    document.querySelectorAll('*[id^="gauged-"], *[class*="gauged"]').forEach(element => {
        const id = element.getAttribute('id');
        if (id === 'gauged-test') {
            return render(<HelloWorld/>, element);
        }

        if (id === 'gauged-auth-register') {
            const RegisterRequired = withRequiredAccount(Register) as ComponentType<{}>;
            return render(<RegisterRequired/>, element);
        }

        if (element.classList.contains('gauged-account-description')) {
            const AccountDescriptionRequired = withRequiredAccount(AccountDescription) as ComponentType<{}>;
            return render(<ErrorBoundary><AccountDescriptionRequired/></ErrorBoundary>, document.body);
        }

        if (element.tagName === 'FORM' && element.classList.contains('gauged-form')) {
            formHydrate(element as HTMLFormElement);

            if (!element.hasAttribute('data-unstyled')) {
                addStyle = true;
            }
        }
    });

    if (addStyle) {
        formStyle();
    }
});
