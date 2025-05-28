import React from 'react';

import FormGroup, { type FormGroupProps } from './FormGroup';

type InputFormGroupProps = React.InputHTMLAttributes<HTMLInputElement> & Omit<FormGroupProps, 'children'>;

const InputFormGroup = React.forwardRef<HTMLInputElement, InputFormGroupProps>((props, ref) => {
    const { unstyled, label, help, errors, required, ...inputProps } = props;
    const error = props.name ? errors[props.name] : undefined;

    return (
        <FormGroup
            name={props.name}
            label={label}
            htmlFor={props.id}
            unstyled={unstyled}
            help={help}
            errors={errors}
            required={required}
        >
            <input {...inputProps} required={required} aria-invalid={!!error} formNoValidate ref={ref} />
        </FormGroup>
    );
});

export default InputFormGroup;
