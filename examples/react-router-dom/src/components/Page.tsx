import { PropsWithChildren, useState } from 'react';
import StyleDropdown from './StyleDropdown';

const Page = (props: PropsWithChildren) => {
    const [value, setValue] = useState(() => {
        return localStorage.getItem(StyleDropdown.KEY) || 'MVP';
    });
    const [loaded, setLoaded] = useState<Record<string, boolean>>({});

    const onLoad = (value: string) => {
        console.log(`Loaded '${value}`);
        setLoaded((loaded) => {
            return { ...loaded, [value]: true };
        });
    };

    return (
        <>
            <header className={'header'}>
                <StyleDropdown onChange={setValue} onLoad={onLoad} />
            </header>
            {loaded[value] ? <main>{props.children}</main> : null}
        </>
    );
};

export default Page;
