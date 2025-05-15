import React, { ReactNode, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';

import {
    type User,
    type RegisterData,
    getErrorDetail,
    register as registerService,
    isFunction
} from '@jotsu/jotsu-js';

import BaseForm from 'components/forms/BaseForm';
import FormHelp from 'components/forms/FormHelp';

import { AuthFormProps } from 'types';
import ButtonGroup from 'components/auth/common/ButtonGroup';

import RegisterEmailFormGroup from './RegisterEmailFormGroup';
import RegisterFirstNameFormGroup from './RegisterFirstNameFormGroup';
import RegisterLastNameFormGroup from './RegisterLastNameFormGroup';

import PasswordFormGroup from 'components/auth/common/PasswordFormGroup';
import PasswordValidator from 'components/auth/common/PasswordValidator';
import ConfirmPasswordFormGroup from 'components/auth/common/ConfirmPasswordFormGroup';

// Autocomplete wants the field to be named 'username'.
type RegisterFormData = Omit<RegisterData, 'email'> & {
    username: string;
    confirm_password: string;
};

/**
 * Props for the **\<Register/\>** component.
 * @category auth
 */
export interface RegisterProps extends Omit<AuthFormProps, 'show'> {
    /** Message show after the user successfully registers. */
    message: React.JSX.Element | ((email: string) => React.JSX.Element);
    /** Callback with the newly registered user. */
    onRegister?: (user: User) => void;
    /** Per-field help messages. */
    help?: {
        /** Help text for the 'email' field. */
        email?: ReactNode;
        /** Help text for the 'password' field. */
        password?: ReactNode;
        /** Help text for the password confirmation field. */
        confirmPassword?: ReactNode;
    };
    /** Specify what option information to collect. */
    show?: Exclude<AuthFormProps['show'], undefined> & {
        /** Show the first and last names fields? */
        firstLastName?: boolean
    };
    /** Minimum number of characters for a password.   Must be >= 8, default=12. */
    passwordMinLength?: number
}

/**
 * A fully functional registration form.
 * @category auth
 *
 * @param props
 * @returns {React.JSX.Element}
 */
const Register = (props: RegisterProps): React.JSX.Element => {
    const submitText = props.submitText ? props.submitText : 'Register';

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
        <BaseForm
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

export default Register;
