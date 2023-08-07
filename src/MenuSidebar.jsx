import React from 'react';
import {Menu, MenuGroup, Sidebar} from 'react-admin-base-nazox';
import {useUser} from "./Components/UserProvider";
import {injectIntl} from 'react-intl';

export default injectIntl(function MenuSidebar() {
    const user = useUser();

    return <Sidebar>
        <MenuGroup title="Home">
            <Menu title="Home Site" to="https://iseser.com/" icon="fas fa-home"/>
        </MenuGroup>
        {user.role >= 1 && <MenuGroup title="Submission">
            {user.role >= 1 &&
                <Menu title={"Send Paper"} to={process.env.REACT_APP_PORTAL + "/submission/create"} icon="fas fa-book-open"/>}
            {user.role >= 1 && <Menu title={"My Paper"} to="/submission" icon="fas fa-book-reader"/>}
            {user.role >= 8 && <Menu title={"Deleted"} to="/submission/deleted" icon="fas fa-trash-alt"/>}
        </MenuGroup>}

        {user.role >= 8 &&
            <MenuGroup title="Other">
                <Menu title={"Author"} to="/author" icon="fas fa-minus"/>
            </MenuGroup>
        }

        {user.role >= 1 &&
            <MenuGroup title="Settings">
                {user.role >= 8 && <Menu title="Users" to="/user" icon="fas fa-users"/>}
                {user.role >= 8 && <Menu title={"Roles"} to="/roles" icon="fas fa-magic"/>}
                {user.role >= 1 && <Menu title={"Profile"} to="/profile" icon="fas fa-user"/>}
            </MenuGroup>
        }

        <MenuGroup title="General">
            <Menu title="Documents" to="https://iseser.com/documents" icon="fas fa-file"/>
            <Menu title="Archives" to="https://iseser.com/documents-all" icon="fas fa-paste"/>
            <Menu title="Contact" to="https://iseser.com/contact" icon="fas fa-phone"/>
        </MenuGroup>


        {user.role >= 1 &&
            <MenuGroup title="Logout">
                {user.role >= 1 && <Menu title={"Logout"} to="/logout" icon="fas fa-sign-out-alt"/>}
            </MenuGroup>
        }
    </Sidebar>;
});
