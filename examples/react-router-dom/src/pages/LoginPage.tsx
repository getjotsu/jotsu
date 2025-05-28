import { Login } from '@jotsu/react-jotsu-js';
import Page from 'components/Page';
import apiClient from 'api';

const LoginHeader = () => <h2>Example Login</h2>;

const LoginFooter = () => (
    <div>
        Need an account? <a href={'/register'}>Sign Up</a>
    </div>
);

const PasswordHelp = () => <a href={'/forgot-password'}>Forgot password?</a>;

const LoginPage = () => {
    return (
        <Page>
            <section>
                <Login
                    apiClient={apiClient}
                    header={<LoginHeader />}
                    footer={<LoginFooter />}
                    help={{
                        password: <PasswordHelp />,
                    }}
                    show={{
                        reset: true,
                    }}
                >
                    <span /> {/* Useless element to show Login has children. */}
                </Login>
            </section>
        </Page>
    );
};

export default LoginPage;
