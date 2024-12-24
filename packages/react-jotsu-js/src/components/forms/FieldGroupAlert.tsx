import React from 'react';

const FieldGroupAlert = (props: {
    children: React.ReactNode
}) => {
    return (
        <span className={'alert'} role="alert">{props.children}</span>
    );
}

export default FieldGroupAlert;
