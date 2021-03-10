import React, {useCallback} from 'react';
import {ApiSelect} from "react-admin-base-adminkit";
import {useAuth} from "react-admin-base";

export function AuthorSelects(props) {
    const onCreateOption = useCallback(async function(email) {
        return { email };
    }, []);

    return <ApiSelect url="/api/author" idKey="email" nameKey="email" onCreateOption={onCreateOption} {...props}>
        { row => <>{row.email} (<b>{row.first_name} {row.last_name}</b>)</> }
    </ApiSelect>;
}



export function AuthorSelect(props) {
    const [ api ] = useAuth();

    const url = "/api/author";

    const onCreateOption = useCallback(async function(input) {
        const data = await api.tokenized.put(url, { value: input });
        return data.data;
    }, [api, url]);

    return <ApiSelect
        idKey="email"
        nameKey="email"
        url={url}
        onCreateOption={onCreateOption}
        {...props}
    />;
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
