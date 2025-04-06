import BrowserOnly from '@docusaurus/BrowserOnly';

export default function HomepageContactForm() {
    return (
        <BrowserOnly>
            {() => {
                const HomepageContactFormBrowserOnly = require('./form.tsx').default;
                return <HomepageContactFormBrowserOnly />;
            }}
        </BrowserOnly>
    );
}
