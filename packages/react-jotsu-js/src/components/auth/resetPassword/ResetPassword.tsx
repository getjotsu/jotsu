import React, { ReactNode, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';

import { getErrorDetail, resetPassword, type ResetPasswordData, getFirstQueryParam } from '@jotsu/jotsu-js';

import type { AuthFormProps } from 'types';

import Form from 'components/forms/Form';
import ButtonGroup from 'components/auth/common/ButtonGroup';
import FormHelp from 'components/forms/FormHelp';
import ResetPasswordPasswordFormGroup from './ResetPasswordPasswordFormGroup';
import ResetPasswordConfirmPasswordFormGroup from './ResetPasswordConfirmPasswordFormGroup';

type ResetPasswordFormData = ResetPasswordData & {
    confirm_password: string;
};

const ResetPasswordMessage = (props: { message: ReactNode | undefined }) => {
    if (!props.message) {
        return <div>Your password was successfully reset.</div>;
    }
    return props.message as ReactNode;
};

const ResetPasswordMissingToken = () => <div>Your reset password request couldn't be processed. Please try again.</div>;

const ResetPassword = (
    props: {
        resetUrl: string;
        message?: ReactNode;
        onFinish?: (email: string) => void;
        help?: {
            email?: string;
        };
    } & AuthFormProps,
) => {
    const token = getFirstQueryParam('t');
    const submitText = props.submitText ? props.submitText : 'Submit';

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordFormData>();

    const [busy, setBusy] = useState(false);
    const [formError, setFormError] = useState('');
    const [done, setDone] = useState(false);

    const className = classNames('login-form', {
        error: !!formError,
    });

    const onReset = () => {
        reset();
        setFormError('');
    };

    const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
        try {
            setBusy(true);
            const res = await resetPassword(props.apiClient, {
                password: data.password,
                token: token || '',
            });
            setDone(true);
            props.onFinish?.(res.email);
        } catch (e) {
            console.log(e);
            setFormError(getErrorDetail(e));
        } finally {
            setTimeout(() => setBusy(false), 0);
        }
    };

    if (!token) {
        return <ResetPasswordMissingToken />;
    }

    if (done) {
        return <ResetPasswordMessage message={props.message} />;
    }

    return (
        <Form
            className={className}
            onSubmit={handleSubmit(onSubmit)}
            unstyled={props.unstyled}
            onReset={onReset}
            aria-describedby={'reset-password-form-help'}
        >
            {props.header}
            <FormHelp id={'reset-password-form-help'}>{formError}</FormHelp>
            <ResetPasswordPasswordFormGroup
                {...register('password', {
                    required: true,
                    pattern: {
                        value: /^(?=.*\d)(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                        message:
                            'The password that must be at least eight (8) characters including upper and lower case letters, numbers and symbols like ! " ? $ % ^ &.',
                    },
                })}
                autoComplete={'new-password'}
                errors={errors}
            />
            <ResetPasswordConfirmPasswordFormGroup
                {...register('confirm_password', {
                    required: true,
                    validate: (val: string) => {
                        if (watch('password') != val) {
                            return 'The passwords must match.';
                        }
                    },
                })}
                autoComplete={'new-password'}
                errors={errors}
            />
            <ButtonGroup disabled={busy} showReset={props.show?.reset} submitText={submitText} />
            {props.footer}
        </Form>
    );
};

export default ResetPassword;
