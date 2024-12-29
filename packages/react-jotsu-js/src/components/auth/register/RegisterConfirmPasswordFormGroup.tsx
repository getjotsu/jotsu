import React from 'react';
import FormGroup from 'components/forms/FormGroup';
import { AuthFormGroupProps } from 'types';

const RegisterConfirmPasswordFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    return (
        <FormGroup id={'confirm_password'} type={'password'} label={'Confirm Password'} {...props} ref={ref} required />
    );
});

export default RegisterConfirmPasswordFormGroup;
