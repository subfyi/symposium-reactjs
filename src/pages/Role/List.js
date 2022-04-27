
import React from 'react';
import {Actions, ActionsColumn, Column, CRUD, IdColumn} from 'react-admin-base-bootstrap';
import {Breadcrumb} from "react-admin-base-nazox";
import RoleEntity from "./RoleEntity";

export default function Roles() {
    return <Breadcrumb
        data={
            [
                {
                    name: "roles",
                    href: '/roles'
                }
            ]
        }
    >
        <CRUD url="/api/roles" Component={RoleEntity}>
                        <thead>
                        <tr>
                            <IdColumn/>
                            <Column>name</Column>
                            <ActionsColumn/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            row => <tr>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <Actions
                                    edit={`/roles/${row.id}/edit`}
                                    del={`/api/roles/${row.id}`}
                                />
                            </tr>
                        }
                        </tbody>
                    </CRUD>
        </Breadcrumb>;
    }


