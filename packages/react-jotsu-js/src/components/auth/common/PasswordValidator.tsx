import React, { CSSProperties } from 'react';
import styles from '../resetPassword/styles.module.scss';

export const PASSWORD_MIN_LENGTH = 12;

const validate = (value: string, length: number) => {
    return {
        upper: value && /[A-Z]/.test(value),
        lower: value && /[a-z]/.test(value),
        number: value && /[0-9]/.test(value),
        symbol: value && /[^A-Za-z0-9]/.test(value),
        length: value && value.length >= length,
        noTriple: !/(.)\1\1/.test(value),
    } as { [key: string]: boolean };
};

const score = (status: { [key: string]: boolean }) => {
    let n = 0;
    for (const key of ['upper', 'lower', 'number', 'symbol']) {
        if (status[key]) {
            n += 1;
        }
    }
    return n;
};

const isValid = (value: string, length: number | undefined = undefined) => {
    length = length ? length : PASSWORD_MIN_LENGTH;

    const status = validate(value, length);
    return score(status) >= 3 && status['length'] && status['noTriple'];
};

const PasswordValidator = (props: {
    className?: string;
    style?: CSSProperties;
    unstyled?: boolean;
    password: string;
    length?: number;
}) => {
    const length = props.length ? props.length : PASSWORD_MIN_LENGTH;

    const status = validate(props.password, length);
    const n = score(status);

    const className = (key: string) => (status[key] ? 'met' : 'unmet');

    return (
        <div
            className={props.unstyled ? props.className : `${props.className} ${styles.validator}`}
            style={props.style}
        >
            Your password must contain:
            <ul style={{ marginTop: 0 }}>
                <li className={className('length')}>At least {length} characters.</li>
                <li className={n >= 3 ? 'met' : 'unmet'}>
                    At least 3 of the following:
                    <ul>
                        <li className={className('lower')}>Lower-case letters (a-z)</li>
                        <li className={className('upper')}>Upper-case letters (A-Z)</li>
                        <li className={className('number')}>Numbers (0-9)</li>
                        <li className={className('symbol')}>Special characters (e.g. *&^%$#@!)</li>
                    </ul>
                </li>
                <li className={className('noTriple')}>No more than 2 identical characters in a row.</li>
            </ul>
        </div>
    );
};

PasswordValidator.isValid = isValid;

export default PasswordValidator;
