import Page from 'components/Page';
import apiClient from 'api';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const onClick = async () => {
        await apiClient.logout();
        navigate('/login');
    };
    return (
        <Page>
            <section>
                <p>
                    <strong>Success!</strong>
                </p>
                <p>
                    <button onClick={onClick}>Logout</button>
                </p>
            </section>
        </Page>
    );
};

export default HomePage;
