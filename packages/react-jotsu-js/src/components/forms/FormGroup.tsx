import React, { ReactNode } from 'react';
import { FieldErrors } from 'react-hook-form';
import classNames from 'classnames';
import { kebabCase } from 'change-case';

import styles from './styles.module.scss';
import FieldHelp from './FieldHelp';
import { fieldError } from './utils';

export type FormGroupProps = {
    unstyled?: boolean;
    label: string;
    help?: ReactNode;
    errors: FieldErrors;

    id?: string;
    name?: string;
    required?: boolean;

    children?: ReactNode;
};

const FormGroup = React.forwardRef<HTMLInputElement, FormGroupProps>((props, ref) => {
    const error = props.id ? props.errors[props.id] : undefined;
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
            {props.children}
            <FieldHelp role={error ? 'alert' : undefined}>{error ? fieldError(error) : props.help}</FieldHelp>
        </div>
    );
});

export default FormGroup;
