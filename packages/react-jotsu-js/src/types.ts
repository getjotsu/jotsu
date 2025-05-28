import type { HTMLProps, ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { Client } from '@jotsu/jotsu-js';

export interface BaseProps {
    unstyled?: boolean;
}

export interface AuthFormProps extends BaseProps {
    /** The Jotsu Client instance */
    apiClient: Client;
    /** The text for the submit button. */
    submitText?: string;
    /** Header content for the form. */
    header?: ReactNode;
    /** Footer content for the form. */
    footer?: ReactNode;
    /** Show/hide controls. */
    show?: {
        /** Include a reset button? */
        reset?: boolean;
    };
    /** Children inline in the form. */
    children?: ReactNode;
}

export type AuthFormGroupProps = BaseProps &
    Partial<UseFormReturn> &
    HTMLProps<HTMLInputElement> & {
        errors: UseFormReturn['formState']['errors'];
        help?: ReactNode;
    };

export type { Client, ErrorDetail, FormInstance } from '@jotsu/jotsu-js';
