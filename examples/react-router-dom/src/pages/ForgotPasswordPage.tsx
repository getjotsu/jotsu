import { ForgotPassword } from '@jotsu/react-jotsu-js';
import Page from 'components/Page';
import apiClient from 'api';

const ForgotPasswordHeader = () => <h2>Example Forgot Password</h2>;

const ForgotPasswordFooter = () => (
    <div>
        <a href={'/login'}>&lt;&lt; Back to Login</a>
    </div>
);

const ForgotPasswordPage = () => {
    return (
        <Page>
            <section>
                <ForgotPassword
                    resetUrl={`${window.location.origin}/reset-password`}
                    apiClient={apiClient}
                    header={<ForgotPasswordHeader />}
                    footer={<ForgotPasswordFooter />}
                    help={{
                        email: <small>Enter the email you used when you created your account.</small>,
                    }}
                    show={{
                        reset: true,
                    }}
                />
            </section>
        </Page>
    );
};

export default ForgotPasswordPage;
