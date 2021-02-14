import React from 'react';
import {ApiSelect} from "react-admin-base-adminkit";

export function LanguageSelect(props) {
    return <ApiSelect {...props} url="/api/language" />;
}


export function JournalSelect(props) {
    return <ApiSelect {...props} url="/api/journal" >
        { row => <>{row.slug}</> }
    </ApiSelect>;
}
