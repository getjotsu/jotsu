import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form'
import classNames from 'classnames';

import FieldGroupAlert from 'components/forms/FieldGroupAlert';
import FieldGroupAlertRequired from 'components/forms/FieldGroupAlertRequired';

import styles from './Register.module.scss';

type RegisterFormRequest = {
    email: string,
    password: string,
    confirm_password: string,
    first_name: string | null,
    last_name: string | null,
}

export type RegisterResponse = {
    account_id: string,
    id: string,
    email: string,
    first_name: string | null,
    last_name: string | null,
}

const Register = (props: {
    account: string,
    unstyled?: boolean,
    submitText?: string,
    onRegister?: (data: RegisterResponse) => void,
}) => {
    const className = classNames('register-form', {
        [styles.form]: !props.unstyled
    });
    const submitText = props.submitText ? props.submitText : 'Register';

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<RegisterFormRequest>()
    const onSubmit: SubmitHandler<RegisterFormRequest> = (data) => console.log(data)

    return (
        <form className={className} onSubmit={handleSubmit(onSubmit)}>
            <div className={'field-group required'}>
                <label htmlFor={'email'}>Email</label>
                <input
                    id={'email'}
                    autoComplete={'email'}
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register('email', {
                        required: true
                    })}
                />
                {errors.email && errors.email.type === "required" && (
                    <FieldGroupAlertRequired />
                )}
            </div>
            <div className={'field-group required'}>
                <label htmlFor={'password'}>Password</label>
                <input
                    id={'password'}
                    type={'password'}
                    autoComplete={'current-password'}
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register('password', {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
                    })}
                />
                {errors.password && errors.password.type === "required" && (
                    <FieldGroupAlertRequired />
                )}
                {errors.password && errors.password.type === "pattern" && (
                    <FieldGroupAlert>The password that must be at least eight (8) characters including upper and lower case letters, number and symbols like ! " ? $ % ^ &.</FieldGroupAlert>
                )}
            </div>
            <div className={'field-group required'}>
                <label htmlFor={'confirm_password'}>Confirm Password</label>
                <input
                    id={'confirm_password'}
                    type={'password'}
                    autoComplete={'current-password'}
                    aria-invalid={errors.confirm_password ? "true" : "false"}
                    {...register('confirm_password', {
                        required: true,
                        validate: (val: string) => {
                            if (watch('password') != val) {
                                return 'The passwords must match.';
                            }
                        },
                    })}
                />
                {errors.confirm_password && errors.confirm_password.type === "required" && (
                    <FieldGroupAlertRequired />
                )}
                {errors.confirm_password && errors.confirm_password.type === "pattern" && (
                    <FieldGroupAlert>{errors.confirm_password.message}</FieldGroupAlert>
                )}
            </div>
            <div className={'button-group'}>
                <button type={'submit'}>{submitText}</button>
            </div>
        </form>
    );
}

export default Register;
