import React, { ReactNode, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';

import { login, getErrorDetail, redirectURI, type LoginResponse } from '@jotsu/jotsu-js';

import type { AuthFormProps } from 'types';

import Form from 'components/forms/Form';
import ButtonGroup from 'components/auth/common/ButtonGroup';
import FormHelp from 'components/forms/FormHelp';
import LoginEmailFormGroup from './LoginEmailFormGroup';
import LoginPasswordFormGroup from './LoginPasswordFormGroup';

type LoginFormRequest = {
    username: string;
    password: string;
    confirm_password: string;
};

const Login = (
    props: {
        onLogin?: (data: LoginResponse) => void;
        help?: {
            email?: ReactNode;
            password?: ReactNode;
        };
    } & AuthFormProps,
) => {
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
            const res = await login(props.apiClient, data.username, data.password);
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
        <Form
            className={className}
            onSubmit={handleSubmit(onSubmit)}
            unstyled={props.unstyled}
            onReset={onReset}
            aria-describedby={'login-form-help'}
        >
            {props.header}
            <FormHelp id={'login-form-help'}>{formError}</FormHelp>
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
        </Form>
    );
};

export default Login;
