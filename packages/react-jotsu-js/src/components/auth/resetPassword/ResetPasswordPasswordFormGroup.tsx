import React, { ChangeEvent, EventHandler, useState } from 'react';
import FormGroup from 'components/forms/FormGroup';
import { AuthFormGroupProps } from 'types';
import ResetPasswordValidator from './ResetPasswordValidator';

export const PASSWORD_LENGTH = 15;

const ResetPasswordPasswordFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    const [focused, setFocused] = useState(false);
    const [password, setPassword] = useState(props.value as string);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        props.onChange?.(event);
    }

    return (
        <>
            <FormGroup
                id={'password'}
                type={'password'}
                label={'Password'}
                {...props}
                ref={ref}
                autoComplete={'new-password'}
                value={password}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required
            />
            <ResetPasswordValidator
                style={{ display: focused ? 'block' : 'none', margin: props.unstyled ? undefined : '0 0 2em 0' }} // negative margin when show
                password={password}
                length={PASSWORD_LENGTH}
            />
        </>
    );
});

export default ResetPasswordPasswordFormGroup;
