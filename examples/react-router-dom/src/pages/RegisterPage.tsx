import { Register } from '@jotsu/react-jotsu-js';
import Page from 'components/Page';
import apiClient from 'api';

const RegisterHeader = () => <h2>Register</h2>;

const RegisterFooter = () => (
    <div>
        Already registered? <a href={'/login'}>Log In</a>
    </div>
);

const RegistrationSuccessMessage = (props: { email: string }) => (
    <section>
        <p>Thank you for registering!</p>
        <p>Please confirm your email by clicking the link we sent to '{props.email}'.</p>
        <a href={'/login'}>Login</a>
    </section>
);

const RegisterPage = () => {
    return (
        <Page>
            <section>
                <Register
                    header={<RegisterHeader />}
                    footer={<RegisterFooter />}
                    message={(email: string) => <RegistrationSuccessMessage email={email} />}
                    apiClient={apiClient}
                    show={{ firstLastName: true, reset: true }}
                />
            </section>
        </Page>
    );
};

export default RegisterPage;
