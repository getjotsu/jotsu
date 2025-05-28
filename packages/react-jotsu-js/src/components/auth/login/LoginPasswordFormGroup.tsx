import React from 'react';
import InputFormGroup from 'components/forms/InputFormGroup';
import { AuthFormGroupProps } from 'types';

const LoginPasswordFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    return (
        <InputFormGroup
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
