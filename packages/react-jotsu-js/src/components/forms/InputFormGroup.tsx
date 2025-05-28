import React from 'react';

import FormGroup, { type FormGroupProps } from './FormGroup';

type InputFormGroupProps = React.InputHTMLAttributes<HTMLInputElement> & Omit<FormGroupProps, 'children'>;

const InputFormGroup = React.forwardRef<HTMLInputElement, InputFormGroupProps>((props, ref) => {
    const { unstyled, label, help, errors, ...inputProps } = props;
    const error = props.name ? errors[props.name] : undefined;

    return (
        <FormGroup name={props.name} htmlFor={props.id} unstyled={unstyled} label={label} help={help} errors={errors}>
            <input {...inputProps} aria-invalid={!!error} formNoValidate ref={ref} />
        </FormGroup>
    );
});

export default InputFormGroup;
