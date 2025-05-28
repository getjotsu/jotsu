import React from 'react';

import FieldHelp from './FieldHelp';
import { fieldError } from './utils';
import FormGroup, { type FormGroupProps } from './FormGroup';

type InputFormGroupProps = React.InputHTMLAttributes<HTMLInputElement> & Omit<FormGroupProps, 'children'>;

const InputFormGroup = React.forwardRef<HTMLInputElement, InputFormGroupProps>((props, ref) => {
    const { unstyled, label, help, errors, ...inputProps } = props;
    const error = props.id ? errors[props.id] : undefined;

    return (
        <FormGroup unstyled={unstyled} label={label} help={help} errors={errors}>
            <input {...inputProps} aria-invalid={!!error} formNoValidate ref={ref} />
            <FieldHelp role={error ? 'alert' : undefined}>{error ? fieldError(error) : props.help}</FieldHelp>
        </FormGroup>
    );
});

export default InputFormGroup;
