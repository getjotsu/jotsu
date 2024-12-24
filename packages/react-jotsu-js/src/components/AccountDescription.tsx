import React, {useEffect, useState} from 'react';

import {useShowErrorBoundary} from 'hooks/useShowErrorBoundary';

import type {Account} from '@jotsu/jotsu-js';
import {fetchAccount} from '@jotsu/jotsu-js';

const AccountDescription = (props: {
    account: string
}) => {
    const [account, setAccount] = useState<Account>();
    const {showBoundary} = useShowErrorBoundary();

    useEffect(() => {
        if (props.account) {
            fetchAccount(props.account)
                .then(account => {
                    setAccount(account);
                })
                .catch(e => {
                    showBoundary(e);
                });
        }
    }, [props.account]);

    if (!account) {
        return null;
    }

    return (
        <dl>
            <dt>
                Name
            </dt>
            <dd>
                {account.name}
            </dd>

            <dt>
                ID
            </dt>
            <dd>
                {account.id}
            </dd>

            <dt>
                Created
            </dt>
            <dd>
                {new Date(account.created_at).toDateString()}
            </dd>
        </dl>
    );
}

export default AccountDescription;
