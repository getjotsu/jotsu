import {API_URL, Client} from 'api';
import type {ErrorDetail, Form} from 'types';

export async function formSubmit(accountId: string, form: HTMLFormElement) {
    const url = `${API_URL}/${accountId}/services/forms`;

    const data = new FormData(form);
    if (!data.get('__form__')) {
        const name = form.getAttribute('name');
        if (name) {
            data.set('__form__', name);
        }
    }
    if (!data.get('__form__')) {
        console.error(`The submitted form is missing the 'name' attribute.`);
    }

    const res = await fetch(url, {
        method: 'POST',
        body: data
    });
    if (res.status !== 200) {
        throw await res.json() as ErrorDetail;
    }

    return await res.json();
}

export type FormsResponse = {
    data: Form[];
    total: number,
    offset: number,
    limit: number,
}

export async function fetchForms(apiClient: Client, options?: {offset?: number, limit?: number, name?: string}) {
    const url = apiClient.buildUrl('/services/forms', options?.offset, options?.limit);
    if (options?.name) {
        url.searchParams.set('name', options.name);
    }
    return apiClient.get<FormsResponse>(url.toString());
}

export async function fetchForm(apiClient: Client, formId: string) {
    const url = apiClient.buildUrl(`/services/forms/${formId}`);
    return apiClient.get<Form>(url.toString());
}
