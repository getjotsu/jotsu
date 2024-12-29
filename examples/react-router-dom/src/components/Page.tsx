import { PropsWithChildren, useState } from 'react';
import StyleDropdown from './StyleDropdown';

const Page = (props: PropsWithChildren) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            <header className={'header'}>
                <StyleDropdown onChange={() => setLoaded(false)} onLoad={() => setLoaded(true)} />
            </header>
            {loaded && <main>{props.children}</main>}
        </>
    );
};

export default Page;
