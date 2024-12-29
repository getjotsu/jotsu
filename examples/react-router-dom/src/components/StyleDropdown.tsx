import { useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import styles from './StyleDropdown.module.scss';

const key = 'framework';

const StyleDropdown = (props: { onChange?: (name: string) => void; onLoad?: () => void }) => {
    /*
     * https://github.com/dbohdan/classless-css
     * https://blog.logrocket.com/comparing-classless-css-frameworks/
     */
    const options: Record<string, ReactNode> = {
        Almond: (
            <link
                rel="stylesheet"
                href="https://unpkg.com/almond.css@latest/dist/almond.min.css"
                onLoad={props.onLoad}
            />
        ),
        'AttriCSS (Dark Fairy Pink)': (
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/raj457036/attriCSS/themes/darkfairy-pink.css"
                onLoad={props.onLoad}
            />
        ),
        'Bolt.css': <link rel="stylesheet" href="https://unpkg.com/boltcss/bolt.min.css" onLoad={props.onLoad} />,
        Classless: <link rel="stylesheet" href="https://classless.de/classless.css" onLoad={props.onLoad} />,
        'Missing.css': <link rel="stylesheet" href="https://unpkg.com/missing.css" onLoad={props.onLoad} />,
        MVP: <link rel="stylesheet" href="https://unpkg.com/mvp.css" onLoad={props.onLoad} />,
        Sakura: (
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css"
                type="text/css"
                onLoad={props.onLoad}
            />
        ),
        Pico: (
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
                onLoad={props.onLoad}
            />
        ),
        'Simple.css': <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css" onLoad={props.onLoad} />,
        Tacit: (
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/yegor256/tacit@gh-pages/tacit-css.min.css"
                onLoad={props.onLoad}
            />
        ),
        'Tiny.css': (
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/tiny.css@0.12/dist/tiny.css"
                onLoad={props.onLoad}
            />
        ),
        'Water.css': (
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.min.css"
                onLoad={props.onLoad}
            />
        ),
    };

    const optionNames = Array.from(Object.keys(options));

    const [style, setStyle] = useState<string>(() => {
        return localStorage.getItem(key) || 'MVP';
    });

    function onChange(value: string) {
        localStorage.setItem(key, value);
        setStyle(value);
        props.onChange?.(value);
    }

    return (
        <div className={styles.styleDropdown}>
            <label className={styles.label} htmlFor="framework">
                Choose a style:
            </label>

            <select
                className={styles.select}
                name="framework"
                id="framework"
                value={style}
                onChange={(event) => onChange(event.target.value)}
            >
                {optionNames.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>

            {createPortal(options[style], document.head)}
        </div>
    );
};

export default StyleDropdown;
