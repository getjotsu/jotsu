import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Client } from '@jotsu/jotsu-js';

export type BaseProps = {
    unstyled?: boolean;
};

export type AuthFormProps = BaseProps & {
    apiClient: Client;
    submitText?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    show?: {
        reset?: boolean;
    };
};

export type AuthFormGroupProps = Partial<UseFormReturn> & {
    autoComplete?: string;
    errors: UseFormReturn['formState']['errors'];
    help?: string;
};
