import React from 'react';
import FormGroup from 'components/forms/FormGroup';
import { AuthFormGroupProps } from 'types';

const RegisterEmailFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    return (
        <FormGroup
            id={'username'}
            type={'email'}
            label={'Email'}
            {...props}
            ref={ref}
            autoComplete={'email'}
            required
        />
    );
});

export default RegisterEmailFormGroup;
