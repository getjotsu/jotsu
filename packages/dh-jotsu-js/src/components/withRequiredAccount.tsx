import React from 'react';
import {getAccountId} from '../utils';
import MissingAccount from './errors/MissingAccount';

function withRequiredAccount<T>(Component: React.ComponentType<T>) {
    return (props: T & {account?: string}) => {
        const accountId = getAccountId(props.account);

        if (!accountId) {
            return <MissingAccount />
        }

        return (<Component {...props} account={accountId} />);
    }
}

export default withRequiredAccount;
