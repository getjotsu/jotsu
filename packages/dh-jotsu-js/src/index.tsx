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
    document.querySelectorAll('*[id^="jotsu-"], *[class*="jotsu"]').forEach(element => {
        const id = element.getAttribute('id');
        if (id === 'jotsu-test') {
            return render(<HelloWorld/>, element);
        }

        if (id === 'jotsu-auth-register') {
            const RegisterRequired = withRequiredAccount(Register) as ComponentType<{}>;
            return render(<RegisterRequired/>, element);
        }

        if (element.classList.contains('jotsu-account-description')) {
            const AccountDescriptionRequired = withRequiredAccount(AccountDescription) as ComponentType<{}>;
            return render(<ErrorBoundary><AccountDescriptionRequired/></ErrorBoundary>, document.body);
        }

        if (element.tagName === 'FORM' && element.classList.contains('jotsu-form')) {
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
