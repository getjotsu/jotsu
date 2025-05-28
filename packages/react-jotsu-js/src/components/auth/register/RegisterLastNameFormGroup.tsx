import React from 'react';
import InputFormGroup from 'components/forms/InputFormGroup';
import { AuthFormGroupProps } from 'types';

const RegisterLastNameFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    return (
        <InputFormGroup
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
