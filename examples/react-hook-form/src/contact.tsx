import React from 'react';
import {useForm} from 'react-hook-form';
import clsx from 'clsx';

import { type FormInstance } from '@jotsu/jotsu-js';
import {Form} from '@jotsu/react-jotsu-js';

const SubmitSuccess = (props: {formInstance: FormInstance}) => (
    <div className={'success'}>
        <div>Your form was submitted successfully!  The information collected with the form is shown below.</div>
        <pre>{JSON.stringify(props.formInstance, null, 4)}</pre>
    </div>
);

type Inputs = {
    name: string;
    email: string;
    comment: string;
}

function ContactForm() {
    const [formInstance, setFormInstance] = React.useState<FormInstance|null>(null);
    const {register, reset, handleSubmit, formState: {errors}} = useForm<Inputs>();

    if (formInstance) {
        return <SubmitSuccess formInstance={formInstance} />
    }

    return (
        <Form
            name="contact" accountId={'0'} handleSubmit={handleSubmit}
            onSubmitSuccess={setFormInstance}
            onReset={() => reset()}
            aria-describedby="contact"
        >
            <div className="form-help" id="contact"></div>
            <div className={clsx('form-group', 'has-field-help', {'error': !!errors.name})}>
                <label className="field-label" htmlFor="name">Name <span aria-required="true">*</span></label>
                <input
                    className="form-input" id="name" aria-describedby="name-help"
                    {...register('name', {
                        required: 'Required'
                    })}
                />
                <small className="field-help" id="name-help">{errors.name ? errors.name.message : ''}</small>
            </div>
            <div className={clsx('form-group', 'has-field-help', {'error': !!errors.email})}>
                <label className="field-label" htmlFor="email">Email <span aria-required="true">*</span></label>
                <input
                    className="form-input" type="email" id="email" aria-describedby="email-help"
                    {...register('email', {
                        required: 'Required',
                        pattern: {
                            value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email address',
                        },
                    })}
                />
                <small className="field-help" id="email-help">{errors.email ? errors.email.message : ''}</small>
            </div>
            <div className={clsx('form-group', 'has-field-help', {'error': !!errors.comment})}>
                <label className="field-label" htmlFor="comment">Comments <span
                    aria-required="true">*</span></label>
                <textarea
                    className="form-input"
                    id="comment" rows={6} aria-describedby="comment-help"
                    {...register('comment', {
                        required: 'Required'
                    })}
                >
                </textarea>
                <small className="field-help" id="comment-help">
                    {errors.email ? errors.email.message : "We're happy to help!"}
                </small>
            </div>

            <div className={'buttons'}>
                <input type="submit"/>
                <input type="reset"/>
            </div>
        </Form>
    )
}

export default ContactForm;
