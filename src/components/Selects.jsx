import React, {useCallback} from 'react';
import {ApiSelect} from "react-admin-base-bootstrap";
import {FormattedMessage} from "react-intl";

export function AuthorSelect(props) {
    const onCreateOption = useCallback(async function(email) {
        return { email };
    }, []);

    return <ApiSelect url="/api/author" idKey="email" nameKey="email" onCreateOption={onCreateOption} {...props}>
        { row => row.__isNew__ ? <FormattedMessage
            id="CREATE_VALUE"
            values={{ text: <b>{row.email}</b> }}
        /> : <>{row.email} (<b>{row.first_name} {row.last_name}</b>)</> }
    </ApiSelect>;
}

export function ParameterSelect(props) {
    const { ptur, type } = props;

    return <ApiSelect url={`/api/parameters${(ptur && `-${ptur}`) || ''}/${type}`} nameKey="value" idKey="id" {...props} />;
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

export function UserSelect(props) {
    return <ApiSelect {...props} url={"/api/user"}>
        { row => <>{ row.name } { row.surname }</> }
    </ApiSelect>;
}

export function YearSelect(props) {
    return <ApiSelect {...props} idKey="title_year" url={"/api/submission/years"}>
        { row => +row.title_year || 'Empty' }
    </ApiSelect>;
}
