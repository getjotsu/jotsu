import { useEffect } from 'react';

function StylePortal(props: { href: string; onLoad?: () => void }) {
    const { href, onLoad } = props;

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;

        // onload event (not reliable in all browsers)
        link.onload = () => {
            onLoad?.();
        };

        // Fallback polling method
        const pollForStylesheet = setInterval(() => {
            for (let i = 0; i < document.styleSheets.length; i++) {
                const sheet = document.styleSheets[i];
                if (sheet.href === link.href) {
                    clearInterval(pollForStylesheet);
                    onLoad?.();
                    break;
                }
            }
        }, 100);

        link.onerror = () => {
            clearInterval(pollForStylesheet);
            console.error('Stylesheet failed to load:', href);
        };

        document.head.appendChild(link);

        return () => {
            clearInterval(pollForStylesheet);
            document.head.removeChild(link);
        };

        // Ignore the onLoad dependency.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [href]);

    return null; // no visual component
}

export default StylePortal;
