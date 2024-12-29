import { redirect } from 'react-router-dom';
import { ErrorDetail, StorageClient } from '@jotsu/jotsu-js';

class ApiClient extends StorageClient {
    public accountId: string = process.env.REACT_APP_ACCOUNT_ID;

    constructor() {
        super(process.env.REACT_APP_ACCOUNT_ID);
    }

    async get<T>(url: string) {
        try {
            return await super.get<T>(url);
        } catch (e) {
            const detail = e as ErrorDetail;
            if (detail.res?.status === 401) {
                throw redirect('/login');
            }
            throw e;
        }
    }
}

const apiClient = new ApiClient();
export default apiClient;