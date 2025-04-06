import React, { type FormEvent, FormEventHandler, useRef, useState } from 'react';
import { formSubmit, type FormInstance, type ErrorDetail } from '@jotsu/jotsu-js';

import { BaseProps } from 'types';
import BaseForm from './BaseForm';

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>, BaseProps {
    accountId: string,
    name: string,
    onSubmitBegin?: () => void;
    onSubmitSuccess?: (formInstance: FormInstance) => void;
    onSubmitError?: (e: ErrorDetail) => void;
    handleSubmit: (onSubmit: () => void) => FormEventHandler<HTMLFormElement>;
}

const SubmitSuccess = () => (<div>Your form was successfully submitted.</div>);

/**
 * Form component that handles submitting to the Jotsu API.
 *
 * Use it in conjunction with [react-hook-form](https://react-hook-form.com/get-started) like:
 * ```
 * import { useForm } from "react-hook-form"
 *
 * type Inputs = {
 *     example: string
 * }
 * export default function App() {
 *     const {register, handleSubmit} = useForm<Inputs>();
 *
 *     return (
 *         <Form name='test' handleSubmit={handleSubmit} onSubmitSuccess={() => console.log('submit')} >
 *              <input defaultValue="test" {...register("example")} />
 *              ...
 *              <input type="submit" />
 *         </Form>
 *     );
 * }
 * ```
 *
 * @param props
 * @constructor
 */
const Form = (props: FormProps) => {
    const [submit, setSubmit] = useState(false);
    const ref = useRef<HTMLFormElement>(null);

    const {
        accountId,
        handleSubmit,
        onSubmitBegin,
        onSubmitSuccess,
        onSubmitError,
        onReset: onResetProp,
        ...formProps
    } = props;

    const onSubmit = async () => {
        onSubmitBegin?.();
        try {
            const res = await formSubmit(props.accountId, ref.current!);
            if (onSubmitSuccess) {
                onSubmitSuccess?.(res);
            } else {
                setSubmit(true);
            }
        } catch (e) {
            onSubmitError?.(e as ErrorDetail);
        }
    };

    const onReset = (event: FormEvent<HTMLFormElement>) => {
        if (onResetProp) {
            onResetProp(event);
        } else if (ref.current) {
            ref.current.reset();
        }
    };

    return submit ? <SubmitSuccess /> :
        <BaseForm {...formProps} onSubmit={handleSubmit(onSubmit)} onReset={onReset} ref={ref} />;
};

export default Form;
