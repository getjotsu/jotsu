import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { BaseProps } from 'types';

/* The id attribute is required because it should be referenced in the form aria-describedby. */
const FormHelp = (props: React.PropsWithChildren<{ id: string } & BaseProps>) => {
    if (!props.children) return null;

    const className = classNames('form-help', {
        [styles.formHelp]: !props.unstyled,
    });

    return <p className={className}>{props.children}</p>;
};

export default FormHelp;
