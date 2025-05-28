import React from 'react';
import { useForm } from 'react-hook-form';

import { type FormInstance } from '@jotsu/jotsu-js';
import { Form, FormGroup } from '@jotsu/react-jotsu-js';

const SubmitSuccess = (props: { formInstance: FormInstance }) => (
    <div className={'success'}>
        <div>Your form was submitted successfully! The information collected with the form is shown below.</div>
        <pre>{JSON.stringify(props.formInstance, null, 4)}</pre>
    </div>
);

type Inputs = {
    name: string;
    email: string;
    comment: string;
};

function ContactForm() {
    const [formInstance, setFormInstance] = React.useState<FormInstance | null>(null);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    if (formInstance) {
        return <SubmitSuccess formInstance={formInstance} />;
    }

    return (
        <Form
            name="contact"
            accountId={'0'}
            handleSubmit={handleSubmit}
            onSubmitSuccess={setFormInstance}
            onReset={() => reset()}
            aria-describedby="contact"
        >
            <div className="form-help" id="contact"></div>
            <FormGroup name={'name'} className={'example'} label={'Name'} errors={errors} required>
                <input
                    className="form-input"
                    id="name"
                    aria-describedby="name-help"
                    {...register('name', {
                        required: 'Required',
                    })}
                />
            </FormGroup>
            <FormGroup name={'email'} className={'example'} label={'Email'} errors={errors} required>
                <input
                    className="form-input"
                    type="email"
                    id="email"
                    aria-describedby="email-help"
                    {...register('email', {
                        required: 'Required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email address',
                        },
                    })}
                />
            </FormGroup>
            <FormGroup name={'comment'} className={'example'} label={'Comments'} errors={errors} required>
                <textarea
                    className="form-input"
                    id="comment"
                    rows={6}
                    aria-describedby="comment-help"
                    {...register('comment', {
                        required: 'Required',
                    })}
                ></textarea>
            </FormGroup>

            <div className={'buttons'}>
                <input type="submit" />
                <input type="reset" />
            </div>
        </Form>
    );
}

export default ContactForm;
