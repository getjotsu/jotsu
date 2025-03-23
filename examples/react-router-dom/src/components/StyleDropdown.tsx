import styles from './StyleDropdown.module.scss';
import StylePortal from './StylePortal';

/*
 * https://github.com/dbohdan/classless-css
 * https://blog.logrocket.com/comparing-classless-css-frameworks/
 */
const STYLES = {
    Almond: 'https://unpkg.com/almond.css@latest/dist/almond.min.css',
    'AttriCSS (Dark Fairy Pink)': 'https://cdn.jsdelivr.net/gh/raj457036/attriCSS/themes/darkfairy-pink.css',
    'Bolt.css': 'https://unpkg.com/boltcss/bolt.min.css',
    Classless: 'https://classless.de/classless.css',
    'Missing.css': 'https://unpkg.com/missing.css',
    MVP: 'https://unpkg.com/mvp.css',
    Sakura: 'https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css',
    Pico: 'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css',
    'Simple.css': 'https://cdn.simplecss.org/simple.min.css',
    Tacit: 'https://cdn.jsdelivr.net/gh/yegor256/tacit@gh-pages/tacit-css.min.css',
    'Tiny.css': 'https://cdn.jsdelivr.net/npm/tiny.css@0.12/dist/tiny.css',
    'Water.css': 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.min.css',
} as Record<string, string>;

const key = 'framework';

const StyleDropdown = (props: {
    value?: string;
    onChange?: (name: string) => void;
    onLoad?: (name: string) => void;
}) => {
    const value = props.value ? props.value : localStorage.getItem(key) || 'MVP';

    const onChange = (value: string) => {
        localStorage.setItem(key, value);
        props.onChange?.(value);
    };

    const onLoad = () => {
        if (value && props.onLoad) {
            props.onLoad(value);
        }
    };

    return (
        <div className={styles.styleDropdown}>
            <label className={styles.label} htmlFor="framework">
                Choose a style:
            </label>

            <select
                className={styles.select}
                name="framework"
                id="framework"
                defaultValue={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {Object.keys(STYLES).map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>

            <StylePortal href={STYLES[value]} onLoad={onLoad} />
        </div>
    );
};

StyleDropdown.KEY = key;

export default StyleDropdown;
