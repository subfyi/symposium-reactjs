import React from 'react';
import {Sidebar, Menu, MenuGroup} from 'react-admin-base-adminkit';
import {useUser} from "./Components/UserProvider";
import {FormattedMessage, injectIntl} from 'react-intl';

export default injectIntl(function MenuSidebar() {
    const user = useUser();

    return <Sidebar>
        <MenuGroup title="Submission">
            <Menu title={"Send Paper"} to="/journal" icon="fas fa-home"/>
            <Menu title={"My Paper"} to="/volume" icon="fas fa-home"/>

        </MenuGroup>
        <MenuGroup title="Presentations">
            <Menu title={"Oral Presentations"} to="/article" icon="fas fa-home"/>
            <Menu title={"Poster Presentations"} to="/article" icon="fas fa-home"/>


            <Menu title={"Settings"} icon="fas fa-feather-alt">
                <Menu title={"Users"} to="/user"/>
            </Menu>
        </MenuGroup>


    </Sidebar>;
});
