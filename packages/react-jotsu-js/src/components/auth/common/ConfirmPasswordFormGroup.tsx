import React from 'react';
import InputFormGroup from 'components/forms/InputFormGroup';
import { AuthFormGroupProps } from 'types';

const ConfirmPasswordFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    return (
        <InputFormGroup
            id={'confirm_password'}
            type={'password'}
            label={'Confirm Password'}
            {...props}
            ref={ref}
            required
        />
    );
});

export default ConfirmPasswordFormGroup;
