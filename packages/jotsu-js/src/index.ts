export { Client, StorageClient } from './api';
export { domReady } from './dom';

export { fetchAccount } from './services';
export { fetchUsers, deleteUser } from './services';
export { fetchForms, fetchForm, formSubmit } from './services';
export { fetchMe, login, register, forgotPassword, resetPassword } from './services';

export {
    getAccountIdFromElement,
    getDocumentAccountId,
    getErrorDetail,
    getFirstQueryParam,
    getTestMode,
    isUndefined,
    isDefined,
    redirectURI,
} from './utils';
