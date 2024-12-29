import React from 'react';
import FormGroup from 'components/forms/FormGroup';
import { AuthFormGroupProps } from 'types';

const RegisterFirstNameFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    return (
        <FormGroup
            id={'first_name'}
            type={'text'}
            label={'First Name'}
            {...props}
            ref={ref}
            autoComplete={'given-name'}
            required
        />
    );
});

export default RegisterFirstNameFormGroup;
