export { Client, StorageClient } from './api';
export { domReady } from './dom';

export { fetchAccount } from './services';
export { fetchUsers, deleteUser } from './services';
export { fetchForms, fetchForm, formSubmit } from './services';
export { fetchMe, register, forgotPassword, resetPassword, confirmEmail, verifyResetPasswordToken } from './services';

export {
    fullURL,
    getAccountIdFromElement,
    getDocumentAccountId,
    getErrorDetail,
    getFirstQueryParam,
    getTestMode,
    isUndefined,
    isDefined,
    isError,
    isFunction,
    isA,
    redirectURI,
} from './utils';
