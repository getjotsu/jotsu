import React from 'react';
import FormGroup from 'components/forms/FormGroup';
import { AuthFormGroupProps } from 'types';

const RegisterLastNameFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    return (
        <FormGroup
            id={'last_name'}
            type={'text'}
            label={'Last Name'}
            {...props}
            ref={ref}
            autoComplete={'family-name'}
            required
        />
    );
});

export default RegisterLastNameFormGroup;
