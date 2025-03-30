import React, { ReactNode, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';

import {
    type User,
    type RegisterData,
    getErrorDetail,
    register as registerService,
    isFunction,
    isA
} from '@jotsu/jotsu-js';

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
        message: React.JSX.Element | ((email: string) => React.JSX.Element);
        onRegister?: (user: User) => void;
        help?: {
            email?: ReactNode;
            password?: ReactNode;
            confirmPassword?: ReactNode;
        };
        show?: RegisterShowOpts & Exclude<AuthFormProps['show'], undefined>;
        passwordMinLength?: number
    } & Omit<AuthFormProps, 'show'>
) => {
    const submitText = props.submitText ? props.submitText : 'Register';
    const passwordMinLength = isA<number>(props.passwordMinLength) ? Math.floor(props.passwordMinLength) : 12;

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm<RegisterFormData>();

    const [busy, setBusy] = useState(false);
    const [formError, setFormError] = useState('');
    const [successEmail, setSuccessEmail] = useState<string>('');

    const className = classNames('register-form', {
        error: !!formError
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
            setSuccessEmail(data.email);
        } catch (e) {
            setFormError(getErrorDetail(e));
        } finally {
            setTimeout(() => setBusy(false), 0);
        }
    };

    if (successEmail) {
        if (isFunction(props.message)) {
            return (props.message as (email: string) => React.JSX.Element)(successEmail);
        }
        return props.message as React.JSX.Element;
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
                            required: true
                        })}
                        errors={errors}
                    />
                    <RegisterLastNameFormGroup
                        {...register('last_name', {
                            required: true
                        })}
                        errors={errors}
                    />
                </>
            )}
            <RegisterEmailFormGroup
                {...register('username', {
                    required: true
                })}
                errors={errors}
            />
            <RegisterPasswordFormGroup
                {...register('password', {
                    required: true,
                    pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{12,}$/,
                        message:
                            `The password must be at least ${passwordMinLength} characters including upper and lower case letters, and numbers.`
                    }
                })}
                minLength={passwordMinLength}
                autoComplete={'new-password'}
                errors={errors}
            />
            <RegisterConfirmPasswordFormGroup
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
        </Form>
    );
};

export default Register;
