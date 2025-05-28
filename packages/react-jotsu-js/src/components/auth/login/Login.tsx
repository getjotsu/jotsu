import React, { ReactNode, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';

import { getErrorDetail, redirectURI, type TokenResponse } from '@jotsu/jotsu-js';

import type { AuthFormProps } from 'types';

import BaseForm from 'components/forms/BaseForm';
import ButtonGroup from 'components/auth/common/ButtonGroup';
import FormHelp from 'components/forms/FormHelp';
import LoginEmailFormGroup from './LoginEmailFormGroup';
import LoginPasswordFormGroup from './LoginPasswordFormGroup';

type LoginFormRequest = {
    username: string;
    password: string;
    confirm_password: string;
};

/**
 * Props for the **\<Login/\>** component.
 * @category auth
 */
export interface LoginProps extends AuthFormProps {
    /** callback after login success. */
    onLogin?: (data: TokenResponse) => void;

    /** Per-field help messages. */
    help?: {
        /** Help text for the email field. */
        email?: ReactNode;
        /** Help text for the password field. */
        password?: ReactNode;
    };
}

/**
 * A fully functional login form.
 * @category auth
 *
 * @param props
 * @returns {React.JSX.Element}
 */
const Login = (props: LoginProps): React.JSX.Element => {
    const submitText = props.submitText ? props.submitText : 'Login';

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormRequest>();

    const [busy, setBusy] = useState(false);
    const [formError, setFormError] = useState('');

    const className = classNames('login-form', {
        error: !!formError,
    });

    const onReset = () => {
        reset();
        setFormError('');
    };

    const onSubmit: SubmitHandler<LoginFormRequest> = async (data) => {
        try {
            setBusy(true);
            const res = await props.apiClient.login(data.username, data.password);
            if (props.onLogin) {
                props.onLogin(res);
            } else {
                window.location.href = redirectURI();
            }
        } catch (e) {
            setFormError(getErrorDetail(e));
        } finally {
            setTimeout(() => setBusy(false), 0);
        }
    };

    return (
        <BaseForm
            className={className}
            onSubmit={handleSubmit(onSubmit)}
            unstyled={props.unstyled}
            onReset={onReset}
            aria-describedby={'login-form-help'}
            method={'POST'}
            action={props.apiClient.loginAPIEndpoint}
        >
            {props.header}
            <FormHelp id={'login-form-help'}>{formError}</FormHelp>
            {props.children}
            <LoginEmailFormGroup
                help={props.help?.email}
                {...register('username', {
                    required: true,
                })}
                errors={errors}
            />
            <LoginPasswordFormGroup
                help={props.help?.password}
                {...register('password', {
                    required: true,
                })}
                errors={errors}
            />
            <ButtonGroup disabled={busy} showReset={props.show?.reset} submitText={submitText} />
            {props.footer}
        </BaseForm>
    );
};

export default Login;
