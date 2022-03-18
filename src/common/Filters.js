import React, {useState} from 'react';
import {useDataTableContext} from "react-admin-base-bootstrap";
import {JournalSelect, LanguageSelect} from "./Selects";

export function LanguageFilter() {
    const [language, setLanguage] = useState(null);
    const [params, setParams] = useDataTableContext();

    return <LanguageSelect
        value={language}
        onChange={a => {
            setLanguage(a);
            setParams({language: (a && a.id) || null});
        }}
    />;
}

export function JournalFilter() {
    const [journal, setJournal] = useState(null);
    const [params, setParams] = useDataTableContext();

    return <JournalSelect
        value={journal}
        onChange={a => {
            setJournal(a);
            setParams({journal_id: (a && a.id) || null});
        }}
    />;
}
