import React from 'react';
import {Sidebar, Menu, MenuGroup} from 'react-admin-base-adminkit';
import {useUser} from "./Components/UserProvider";
import {FormattedMessage, injectIntl} from 'react-intl';

export default injectIntl(function MenuSidebar() {
    const user = useUser();

    return <Sidebar>
        <MenuGroup title="Submission">
            {user.role >= 8 && <Menu title={"Send Paper"} to="/submission/create" icon="fas fa-book-open"/> }
            <Menu title={"My Paper"} to="/submissions" icon="fas fa-book-reader"/>
            {user.role >= 8 && <Menu title={"Deleted"} to="/submission/deleted" icon="fas fa-trash-alt"/> }
        </MenuGroup>
        {user.role >= 0 &&
        <MenuGroup title="Presentations">
            <Menu title={"Oral Presentations"} to="/presentation/oral" icon="far fa-file-video"/>
            <Menu title={"Poster Presentations"} to="/presentation/poster" icon="fas fa-file-powerpoint"/>
        </MenuGroup>
        }


        {user.role >= 8 &&
        <MenuGroup title="Other">
            <Menu title={"Author"} to="/author" icon="fas fa-minus"/>
        </MenuGroup>
        }
        <MenuGroup title="Settings">
            {user.role >= 8 && <Menu title="Users" to="/user" icon="fas fa-users"/>}
            {user.role >= 8 && <Menu title={"Roles"} to="/roles" icon="fas fa-magic"/>}
            <Menu title={"Profile"} to="/profile" icon="fas fa-user"/>
        </MenuGroup>
    </Sidebar>;
});
