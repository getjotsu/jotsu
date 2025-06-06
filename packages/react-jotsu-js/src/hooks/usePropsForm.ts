import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';

export function usePropsForm<T extends FieldValues>(form: UseFormReturn<T> | undefined = undefined) {
    const internalForm = useForm<T>();
    return form ? form : internalForm;
}
