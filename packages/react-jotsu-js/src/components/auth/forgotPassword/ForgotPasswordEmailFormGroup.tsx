import React from 'react';
import InputFormGroup from 'components/forms/InputFormGroup';
import { AuthFormGroupProps } from 'types';

const LoginEmailFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    return (
        <InputFormGroup
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
