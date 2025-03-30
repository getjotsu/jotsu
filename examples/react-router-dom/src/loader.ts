import { fetchMe } from '@jotsu/jotsu-js';
import apiClient from './api';

async function loader() {
    return fetchMe(apiClient);
}

export default loader;
