import React from 'react';
import FormGroup from 'components/forms/FormGroup';
import { AuthFormGroupProps } from 'types';

const LoginEmailFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    return (
        <FormGroup
            id={'username'}
            type={'email'}
            label={'Email'}
            {...props}
            ref={ref}
            autoComplete={'username'}
            required
        />
    );
});

export default LoginEmailFormGroup;
