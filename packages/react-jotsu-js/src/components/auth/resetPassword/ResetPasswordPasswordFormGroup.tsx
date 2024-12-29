import React from 'react';
import FormGroup from 'components/forms/FormGroup';
import { AuthFormGroupProps } from 'types';

const ResetPasswordPasswordFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    return (
        <FormGroup
            id={'password'}
            type={'password'}
            label={'Password'}
            {...props}
            ref={ref}
            autoComplete={'new-password'}
            required
        />
    );
});

export default ResetPasswordPasswordFormGroup;
