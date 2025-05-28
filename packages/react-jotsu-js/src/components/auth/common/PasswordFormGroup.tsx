import React, { ChangeEvent, useState } from 'react';
import InputFormGroup from 'components/forms/InputFormGroup';
import PasswordValidator from 'components/auth/common/PasswordValidator';
import { AuthFormGroupProps } from 'types';

const PasswordFormGroup = React.forwardRef<HTMLInputElement, AuthFormGroupProps>((props, ref) => {
    const [focused, setFocused] = useState(false);
    const [password, setPassword] = useState(props.value as string);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        props.onChange?.(event);
    };

    return (
        <>
            <InputFormGroup
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
            <PasswordValidator
                style={{ display: focused ? 'block' : 'none', margin: props.unstyled ? undefined : '0 0 2em 0' }} // negative margin when show
                password={password}
            />
        </>
    );
});

export default PasswordFormGroup;
