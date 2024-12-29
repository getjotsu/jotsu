import React from 'react';
import { FieldErrors } from 'react-hook-form';
import classNames from 'classnames';
import { kebabCase } from 'change-case';

import styles from './styles.module.scss';
import FieldHelp from './FieldHelp';
import { fieldError } from './utils';

type FormGroupProps = React.InputHTMLAttributes<HTMLInputElement> & {
    unstyled?: boolean;
    label: string;
    help?: string;
    errors: FieldErrors;
};

const FormGroup = React.forwardRef<HTMLInputElement, FormGroupProps>((props, ref) => {
    const { errors, ...inputProps } = props;
    const error = props.id ? errors[props.id] : undefined;
    const fieldHelp = error ? fieldError(error) : props.help;

    const className = classNames('form-group', {
        [`form-group-${kebabCase(props.name || '')}`]: props.name,
        [styles.formGroup]: !props.unstyled,
        required: !!props.required,
        error: !!error,
        'has-field-help': !!fieldHelp,
    });

    return (
        <div className={className}>
            <label className={'field-label'} htmlFor={props.id}>
                {props.label}
            </label>
            <input {...inputProps} aria-invalid={!!error} formNoValidate ref={ref} />
            <FieldHelp role={error ? 'alert' : undefined}>{error ? fieldError(error) : props.help}</FieldHelp>
        </div>
    );
});

export default FormGroup;
