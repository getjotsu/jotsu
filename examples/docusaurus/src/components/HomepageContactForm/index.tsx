import { ReactNode, useState } from 'react';
import { useForm } from "react-hook-form";
import { Form } from '@jotsu/react-jotsu-js';
import styles from './styles.module.css';

type Inputs = {
    email: string
}

export default function HomepageContactForm(): ReactNode {
    const [submitted, setSubmitted] = useState(false);
    const {register, handleSubmit, formState: { errors }, reset} = useForm<Inputs>();

    if (submitted) {
        return (
            <section className={styles.section}>
                <p className={styles.submitted}>Thank you for your submission!</p>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <Form
                className={styles.form}
                accountId={'1'}
                name={'contact'}
                handleSubmit={handleSubmit}
                onReset={() => reset()}
                onSubmitSuccess={() => setSubmitted(true)}
            >
                <div className={errors.email ? 'error' : undefined}>
                    <label className={'field-help'} htmlFor={'email'}>Email <span aria-required="true">*</span></label>
                    <input id={'email'} {...register('email', { required: true })} />
                    {errors.email && <span className={'field-help'}>This field is required</span>}
                </div>
                <input type={'submit'} />
                <input type={'reset'} />
            </Form>
        </section>
    );
}
