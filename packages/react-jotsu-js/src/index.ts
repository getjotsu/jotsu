// noinspection JSUnusedGlobalSymbols

import HelloWorld from './components/HelloWorld';
import AccountDescription, {type AccountDescriptionProps} from './components/AccountDescription';

import Register from './components/auth/register/Register';
import Login, {type LoginProps} from './components/auth/login/Login';
import ForgotPassword from './components/auth/forgotPassword/ForgotPassword';
import ResetPassword from './components/auth/resetPassword/ResetPassword';
import ConfirmEmail from './components/auth/confirmEmail/ConfirmEmail';

export {
    HelloWorld,
    AccountDescription, AccountDescriptionProps,
    Register,
    Login, LoginProps,
    ForgotPassword, ResetPassword, ConfirmEmail
};
