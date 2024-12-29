import React from 'react';
import classNames from 'classnames';

import { isDefined } from '@jotsu/jotsu-js';

import { BaseProps } from 'types';
import styles from './styles.module.scss';

const Form = React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement> & BaseProps>((props, ref) => {
    const formProps = { ...props };
    formProps.noValidate = isDefined(props.noValidate) ? props.noValidate : true;

    formProps.onSubmit = isDefined(props.onSubmit)
        ? props.onSubmit
        : function (e) {
              e.preventDefault();
              e.stopPropagation();
              console.log('submit');
          };

    formProps.className = classNames(props.className, {
        [styles.form]: !props.unstyled,
    });

    return (
        <form {...formProps} ref={ref}>
            {props.children}
        </form>
    );
});

export default Form;
