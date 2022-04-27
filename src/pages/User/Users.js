import {Actions, ActionsColumn, Column, CRUD, IdColumn} from 'react-admin-base-bootstrap';
import {Breadcrumb} from 'react-admin-base-nazox';
import React from 'react';
import UserEntity from "./UsersEntity";

export default function Users() {
    return <Breadcrumb
        title="User"
        data={
            [
                {
                    href: '/user',
                    name: 'User'
                }
            ]
        }
    >
        <CRUD url="/api/user" Component={UserEntity}>
            <thead>
            <tr>
                <IdColumn/>
                <Column sort="first_name">Adı</Column>
                <Column sort="last_name">Soyadı</Column>
                <Column sort="email">Mail Adresi</Column>
                <ActionsColumn/>
            </tr>
            </thead>
            <tbody>
            {
                row => <tr key={row.id}>
                    <td className="min text-center">{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.surname}</td>
                    <td>{row.email}</td>
                    <Actions
                        edit={"/user/" + row.id + "/edit"}
                        del={"/user/" + row.id}
                    />
                </tr>
            }
            </tbody>
        </CRUD>
    </Breadcrumb>;
}

