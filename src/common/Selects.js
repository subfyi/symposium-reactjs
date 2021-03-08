import React from 'react';
import {ApiSelect} from "react-admin-base-adminkit";

export function AuthorSelect(props) {
    return <ApiSelect {...props} url="/api/author" />;
}

export function ParameterSelect(props) {
    const { ptur, type } = props;

    return <ApiSelect {...props} url={`/api/parameters${(ptur && `-${ptur}`) || ''}/${type}`} nameKey="value" />;
}

export function LanguageSelect(props) {
    return <ApiSelect {...props} url="/api/language" />;
}

export function JournalSelect(props) {
    return <ApiSelect {...props} url="/api/journal" >
        { row => <>{row.slug}</> }
    </ApiSelect>;
}

export function AuthoritySelect(props) {
    return <ApiSelect {...props} url="/api/roles" />;
}
