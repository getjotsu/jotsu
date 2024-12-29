import React from 'react';
import FormGroup from 'components/forms/FormGroup';
import { AuthFormGroupProps } from 'types';

const LoginPasswordFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    return (
        <FormGroup
            id={'password'}
            type={'password'}
            label={'Password'}
            {...props}
            ref={ref}
            autoComplete={'current-password'}
            required
        />
    );
});

export default LoginPasswordFormGroup;
