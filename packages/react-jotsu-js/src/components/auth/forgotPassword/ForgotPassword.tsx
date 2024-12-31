import React, { ReactNode, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';

import { getErrorDetail, forgotPassword, isFunction, type ForgotPasswordData } from '@jotsu/jotsu-js';

import type { AuthFormProps } from 'types';

import Form from 'components/forms/Form';
import ButtonGroup from 'components/auth/common/ButtonGroup';
import FormHelp from 'components/forms/FormHelp';
import ForgotPasswordEmailFormGroup from './ForgotPasswordEmailFormGroup';

const ForgotPasswordMessage = (props: { email: string; message?: ReactNode | ((email: string) => ReactNode) }) => {
    if (!props.message) {
        return (
            <div>
                If the entered email is associated with an account, an email has been sent to {props.email} with
                instructions of how to reset your password.
            </div>
        );
    }

    if (isFunction(props.message)) {
        const message = props.message as (email: string) => ReactNode;
        return message(props.email);
    }

    return props.message as ReactNode;
};

const ForgotPassword = (
    props: {
        resetUrl: string;
        message?: ReactNode | ((email: string) => ReactNode);
        onFinish?: (email: string) => void;
        help?: {
            email?: ReactNode;
        };
    } & AuthFormProps,
) => {
    const submitText = props.submitText ? props.submitText : 'Submit';

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ForgotPasswordData>();

    const [busy, setBusy] = useState(false);
    const [formError, setFormError] = useState('');
    const [email, setEmail] = useState('');

    const className = classNames('login-form', {
        error: !!formError,
    });

    const onReset = () => {
        reset();
        setFormError('');
    };

    const onSubmit: SubmitHandler<ForgotPasswordData> = async (data) => {
        try {
            setBusy(true);
            const res = await forgotPassword(props.apiClient, {
                email: data.email,
                reset_url: props.resetUrl,
            });
            setEmail(res.email);
            props.onFinish?.(res.email);
        } catch (e) {
            setFormError(getErrorDetail(e));
        } finally {
            setTimeout(() => setBusy(false), 0);
        }
    };

    if (email) {
        return <ForgotPasswordMessage email={email} message={props.message} />;
    }

    return (
        <Form
            className={className}
            onSubmit={handleSubmit(onSubmit)}
            unstyled={props.unstyled}
            onReset={onReset}
            aria-describedby={'forgot-password-form-help'}
        >
            {props.header}
            <FormHelp id={'forgot-password-form-help'}>{formError}</FormHelp>
            <ForgotPasswordEmailFormGroup
                help={props.help?.email}
                {...register('email', {
                    required: true,
                })}
                errors={errors}
            />
            <ButtonGroup disabled={busy} showReset={props.show?.reset} submitText={submitText} />
            {props.footer}
        </Form>
    );
};

export default ForgotPassword;
