import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { BaseProps } from 'types';

const FieldHelp = (props: React.PropsWithChildren<{ role?: string } & BaseProps>) => {
    if (!props.children) return null;

    const className = classNames('field-help', {
        [styles.fieldHelp]: !props.unstyled,
    });

    return (
        <small role={props.role} className={className}>
            {props.children}
        </small>
    );
};

export default FieldHelp;
