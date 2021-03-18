import React, {useState, useCallback} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {Link} from "react-router-dom";
import {useUser} from "./Components/UserProvider";
import {useAuth, useApp} from "react-admin-base";
import {Header} from 'react-admin-base-adminkit';

function UserPart() {
    const user = useUser();
    const [api] = useAuth();
    const [show, setShow] = useState(false);

    const logout = useCallback(function () {
        api.logout();
    }, [api]);

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var hours = new Date().getHours();
    var mins = new Date().getMinutes();


    return <Dropdown isOpen={show} toggle={() => setShow(!show)}>
        <DropdownToggle nav caret>
            Hello, <b>{user.name + user.surname}</b>
        </DropdownToggle>
        <DropdownMenu right>
            <DropdownItem tag={Link} to="/profile">Profile</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem onClick={logout}>Logout</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem>{(date) + '.' + (month) + '.' + year} {hours}:{mins}</DropdownItem>
        </DropdownMenu>
    </Dropdown>;
}

export default function MenuHeader({leftMenuOpen, toggleLeftMenu}) {
    const app = useApp();

    return <Header>
        {!leftMenuOpen && <img src={app.logo} alt={app.name} className="brand-image text-white mr-3"/>}
        <a className="sidebar-toggle d-flex" onClick={toggleLeftMenu}>
            <i className="hamburger align-self-center "/>
        </a>
        {leftMenuOpen ?
            <a className="extra-sidebar-toggle" onClick={toggleLeftMenu}></a> :
            <a className="extra-sidebar-toggle-closed" onClick={toggleLeftMenu}></a>
        }

        <a className="d-flex align-content-center p-2 text-muted" href="https://iseser.com/" target="_blank" rel="noreferrer">
            Home
        </a>
        <a className="d-flex align-content-center p-2 text-muted" href="https://iseser.com/documents" target="_blank" rel="noreferrer">
            Documents
        </a>
        <a className="d-flex align-content-center p-2 text-muted" href="https://iseser.com/documents-all" target="_blank" rel="noreferrer">
            Archives
        </a>
        <a className="d-flex align-content-center p-2 text-muted" href="https://iseser.com/contact" target="_blank" rel="noreferrer">
            Contact
        </a>

        <div className="navbar-collapse collapse">
            <ul className="navbar-nav navbar-align">
                <UserPart/>
            </ul>
        </div>
    </Header>;
}
