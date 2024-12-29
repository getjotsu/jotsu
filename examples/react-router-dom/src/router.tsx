import { Navigate, RouteObject } from 'react-router-dom';

import loader from './loader';

import Page from 'components/Page';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import ForgotPasswordPage from 'pages/ForgotPasswordPage';
import ResetPasswordPage from 'pages/ResetPasswordPage';

export function HydrateFallback() {
    return (
        <Page>
            <section>
                <p>Loading ...</p>
            </section>
        </Page>
    );
}

const router = [
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
    },
    {
        path: '/reset-password',
        element: <ResetPasswordPage />,
    },
    {
        path: '/',
        element: <HomePage />,
        loader: loader,
        HydrateFallback,
    },
    {
        path: '*',
        element: <Navigate to={'/'} replace />,
    },
] as RouteObject[];

export default router;
