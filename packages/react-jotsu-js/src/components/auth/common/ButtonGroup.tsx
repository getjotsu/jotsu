import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import type { BaseProps } from 'types';

const ButtonGroup = (props: { showReset?: boolean; submitText?: string; disabled?: boolean } & BaseProps) => {
    const submitText = props.submitText ? props.submitText : 'Submit';

    const className = classNames('button-group', {
        [styles.buttonGroup]: !props.unstyled,
    });

    return (
        <div className={className}>
            <input disabled={props.disabled} type={'submit'} value={submitText} />
            {props.showReset && <input disabled={props.disabled} type={'reset'} />}
        </div>
    );
};

export default ButtonGroup;
