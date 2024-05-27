import {useMemo} from 'react';
import {useFreeFetch} from 'react-admin-base';
import {LanguageProvider as BootstrapLanguageProvider} from 'react-admin-base-bootstrap';

function useLanguage(language) {
    const [ messages ] = useFreeFetch(language && language.url);
    return messages || {};
}

export default function LanguageProvider({ children }) {
    const [ languages ] = useFreeFetch('/language');

    const allLanguages = useMemo(() => languages && languages.data
		.reduce((a, b) => ({
            ...a,
            [b.language_code]: {
                original: b,
                id: b.id,
                name: b.name,
                priority: b.priority,
                language_code: b.language_code,
                icon: b.icon && b.icon.access_url,
                url: b.precompiled_json && b.precompiled_json.access_url
            }
        }), {}), [languages]);

    if (!allLanguages)
        return null;

    return <BootstrapLanguageProvider defaultLanguage="de" languages={allLanguages} loader={useLanguage}>
        { children }
    </BootstrapLanguageProvider>
}
