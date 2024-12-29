import { ResetPassword } from '@jotsu/react-jotsu-js';
import Page from 'components/Page';
import apiClient from 'api';

const ResetPasswordMessage = () => {
    return (
        <p>
            <p>Your password was successfully reset.</p>
            <a href={'/login'}>Proceed to Login</a>
        </p>
    );
};

const ResetPasswordHeader = () => <h2>Example Reset Password</h2>;

const ResetPasswordFooter = () => (
    <div>
        <a href={'/login'}>&lt;&lt; Back to Login</a>
    </div>
);

const ResetPasswordPage = () => {
    return (
        <Page>
            <section>
                <ResetPassword
                    resetUrl={`${window.location.origin}/reset-password`}
                    message={<ResetPasswordMessage />}
                    apiClient={apiClient}
                    header={<ResetPasswordHeader />}
                    footer={<ResetPasswordFooter />}
                    show={{
                        reset: true,
                    }}
                />
            </section>
        </Page>
    );
};

export default ResetPasswordPage;
