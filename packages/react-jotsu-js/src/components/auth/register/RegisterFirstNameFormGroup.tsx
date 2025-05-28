import React from 'react';
import InputFormGroup from 'components/forms/InputFormGroup';
import { AuthFormGroupProps } from 'types';

const RegisterFirstNameFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    return (
        <InputFormGroup
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
