import React from 'react';
import type { Client, User } from '@jotsu/jotsu-js';
import { isError, isFunction } from '@jotsu/jotsu-js';
import { useConfirmEmail } from 'hooks/useConfirmEmail';

const ConfirmEmailSuccess = (props: { user: User }) => (
    <>
        <h2>This email is verified.</h2>
        <p>
            You're all set! Your address <strong>{props.user.email}</strong> is verified.
        </p>
    </>
);

const ConfirmEmailError = (props: { error: Error }) => (
    <>
        <p>Your email verification request couldn't be processed. Make sure the link is correct.</p>
        <p>{props.error.message}</p>
    </>
);

const ConfirmEmail = (props: {
    apiClient: Client;
    error?: React.JSX.Element | ((error: Error) => React.JSX.Element);
    success?: React.JSX.Element | ((user: User) => React.JSX.Element);
}) => {
    const userOrError = useConfirmEmail(props.apiClient);

    if (!userOrError) return null;

    if (isError(userOrError)) {
        if (isFunction(props.error)) {
            return (props.error as (error: Error) => React.JSX.Element)(userOrError);
        }
        if (props.error) {
            return props.error as React.JSX.Element;
        }
        return <ConfirmEmailError error={userOrError} />;
    }

    if (isFunction(props.success)) {
        return (props.success as (user: User) => React.JSX.Element)(userOrError);
    }

    return props.success ? (props.success as React.JSX.Element) : <ConfirmEmailSuccess user={userOrError} />;
};

export default ConfirmEmail;
