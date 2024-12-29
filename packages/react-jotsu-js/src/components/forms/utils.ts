import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export function fieldError(errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined) {
    if (errors?.type === 'required' && !errors?.message) {
        return 'Required';
    }
    return errors?.message?.toString();
}
