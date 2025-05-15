import React, { ReactNode, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';

import {
    type ResetPasswordData,
    getErrorDetail,
    resetPassword,
    getFirstQueryParam,
    verifyResetPasswordToken
} from '@jotsu/jotsu-js';

import type { AuthFormProps } from 'types';

import BaseForm from 'components/forms/BaseForm';
import FormHelp from 'components/forms/FormHelp';
import ButtonGroup from 'components/auth/common/ButtonGroup';
import PasswordFormGroup from 'components/auth/common/PasswordFormGroup';
import ConfirmPasswordFormGroup from 'components/auth/common/ConfirmPasswordFormGroup';
import PasswordValidator from 'components/auth/common/PasswordValidator';

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
            email?: ReactNode;
        };
    } & AuthFormProps
) => {
    const token = getFirstQueryParam('t');
    const submitText = props.submitText ? props.submitText : 'Submit';

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm<ResetPasswordFormData>();

    const [busy, setBusy] = useState(true);
    const [formError, setFormError] = useState('');
    const [done, setDone] = useState(false);

    const className = classNames('login-form', {
        error: !!formError
    });

    useEffect(() => {
        if (token) {
            const getData = async () => {
                return await verifyResetPasswordToken(props.apiClient, token);
            };

            getData()
                .then((data) => {
                    setValue('username', data.email);
                })
                .catch((e) => {
                    console.log(e);
                    setFormError('Your token is expired or invalid.  Please reset your password again.');
                })
                .finally(() => setBusy(false));
        }
    }, [token, setValue]);

    const onReset = () => {
        reset();
        setFormError('');
    };

    const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
        try {
            setBusy(true);
            const res = await resetPassword(props.apiClient, {
                username: data.username,
                password: data.password,
                token: token || ''
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
        <BaseForm
            className={className}
            onSubmit={handleSubmit(onSubmit)}
            unstyled={props.unstyled}
            onReset={onReset}
            aria-describedby={'reset-password-form-help'}
        >
            {props.header}
            <FormHelp id={'reset-password-form-help'}>{formError}</FormHelp>

            {/* Also include username in the form submission for Google Password Manager. */}
            <input
                style={{visibility: 'hidden'}}
                {...register('username')}
                autoComplete={'email'}
                autoFocus={false}
            />

            <PasswordFormGroup
                {...register('password', {
                    required: true,
                    validate: (val: string) => {
                        if (!PasswordValidator.isValid(val)) {
                            return 'The password is not sufficiently complex.'
                        }
                    }
                })}
                autoComplete={'new-password'}
                errors={errors}
            />
            <ConfirmPasswordFormGroup
                {...register('confirm_password', {
                    required: true,
                    validate: (val: string) => {
                        if (watch('password') != val) {
                            return 'The passwords must match.';
                        }
                    }
                })}
                autoComplete={'new-password'}
                errors={errors}
            />
            <ButtonGroup disabled={busy} showReset={props.show?.reset} submitText={submitText} />
            {props.footer}
        </BaseForm>
    );
};

export default ResetPassword;
