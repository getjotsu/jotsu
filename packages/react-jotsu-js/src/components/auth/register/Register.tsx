import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';

import { type User, type RegisterData, getErrorDetail, register as registerService } from '@jotsu/jotsu-js';

import Form from 'components/forms/Form';
import FormHelp from 'components/forms/FormHelp';

import { AuthFormProps } from 'types';
import ButtonGroup from 'components/auth/common/ButtonGroup';

import RegisterEmailFormGroup from './RegisterEmailFormGroup';
import RegisterPasswordFormGroup from './RegisterPasswordFormGroup';
import RegisterConfirmPasswordFormGroup from './RegisterConfirmPasswordFormGroup';
import RegisterFirstNameFormGroup from './RegisterFirstNameFormGroup';
import RegisterLastNameFormGroup from './RegisterLastNameFormGroup';

type RegisterShowOpts = { firstLastName?: boolean };

// Autocomplete wants the field to be named 'username'.
type RegisterFormData = Omit<RegisterData, 'email'> & {
    username: string;
    confirm_password: string;
};

const Register = (
    props: {
        message: React.JSX.Element;
        onRegister?: (user: User) => void;
        help?: {
            email?: string;
            password?: string;
            confirmPassword?: string;
        };
        show?: RegisterShowOpts & Exclude<AuthFormProps['show'], undefined>;
    } & Omit<AuthFormProps, 'show'>,
) => {
    const submitText = props.submitText ? props.submitText : 'Register';

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const [busy, setBusy] = useState(false);
    const [formError, setFormError] = useState('');
    const [success, setSuccess] = useState(false);

    const className = classNames('register-form', {
        error: !!formError,
    });

    const onReset = () => {
        reset();
        setFormError('');
    };

    const onSubmit: SubmitHandler<RegisterFormData> = async (formData) => {
        // Swap email for username and remove confirm_password.
        const {
            username,
            confirm_password,
            ...data
        }: {
            username: RegisterFormData['username'];
            confirm_password: RegisterFormData['confirm_password'];
        } & RegisterData = { ...formData, email: formData.username };

        try {
            const res = await registerService(props.apiClient, data);
            props.onRegister?.(res);
            setSuccess(true);
        } catch (e) {
            setFormError(getErrorDetail(e));
        } finally {
            setTimeout(() => setBusy(false), 0);
        }
    };

    if (success) {
        return props.message;
    }

    return (
        <Form
            className={className}
            onSubmit={handleSubmit(onSubmit)}
            onReset={onReset}
            unstyled={props.unstyled}
            aria-describedby={'register-form-help'}
        >
            {props.header}
            <FormHelp id={'register-form-help'}>{formError}</FormHelp>
            {props.show?.firstLastName && (
                <>
                    <RegisterFirstNameFormGroup
                        {...register('first_name', {
                            required: true,
                        })}
                        errors={errors}
                        required
                    />
                    <RegisterLastNameFormGroup
                        {...register('last_name', {
                            required: true,
                        })}
                        errors={errors}
                        required
                    />
                </>
            )}
            <RegisterEmailFormGroup
                {...register('username', {
                    required: true,
                })}
                errors={errors}
                required
            />
            <RegisterPasswordFormGroup
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
                required
            />
            <RegisterConfirmPasswordFormGroup
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
                required
            />
            <ButtonGroup disabled={busy} showReset={props.show?.reset} submitText={submitText} />
            {props.footer}
        </Form>
    );
};

export default Register;
