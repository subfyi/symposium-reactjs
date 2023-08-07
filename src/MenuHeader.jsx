import {useCallback, useState} from 'react';
import {useAuth} from "react-admin-base";
import {Header} from 'react-admin-base-nazox';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {useUser} from "./Components/UserProvider";

function UserPart() {
    const user = useUser();
    const [api] = useAuth();
    const [show, setShow] = useState(false);

    const logout = useCallback(function () {
        api.logout();
    }, [api]);

    return <Dropdown isOpen={show} toggle={() => setShow(!show)}>
        <DropdownToggle nav caret>
            Hello, <b>{user.name + " " + user.surname}</b>
        </DropdownToggle>
        <DropdownMenu end>
            <DropdownItem onClick={logout}>Logout</DropdownItem>
        </DropdownMenu>
    </Dropdown>;
}

export default function MenuHeader() {
    return <Header>
        <UserPart/>
    </Header>;
}
