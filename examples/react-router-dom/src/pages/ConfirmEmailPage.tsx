import { ConfirmEmail } from '@jotsu/react-jotsu-js';
import type { User } from '@jotsu/jotsu-js';
import apiClient from 'api';
import Page from '../components/Page';

const ConfirmEmailSuccess = (props: { user: User }) => (
    <section>
        <p>
            You're all set! Your email address <strong>{props.user.email}</strong> is verified.
        </p>
    </section>
);

const ConfirmEmailError = (props: { error: Error }) => (
    <section>
        <p>Your email verification request couldn't be processed. Make sure the link is correct.</p>
        <p>{props.error.message}</p>
    </section>
);

const ConfirmEmailPage = () => (
    <Page>
        <ConfirmEmail
            apiClient={apiClient}
            success={(user: User) => <ConfirmEmailSuccess user={user} />}
            error={(error: Error) => <ConfirmEmailError error={error} />}
        />
    </Page>
);

export default ConfirmEmailPage;
