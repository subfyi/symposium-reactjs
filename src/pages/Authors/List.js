
import {Route, Routes} from "react-router-dom";
import PostEntity from "./Edit";
import {
    Actions,
    ActionsColumn,
    BootstrapDataTable,
    Column,
} from "react-admin-base-bootstrap";
import {Breadcrumb} from 'react-admin-base-nazox';
import React from "react";

export default function Posts() {
    return <Routes>
        <Route path="create" element={<PostEntity />} />
        <Route path=":id/edit" element={<PostEntity />} />
        <Route path="*" element={<Breadcrumb
            title="Posts"
            data={
                [
                    {
                        href: '/author',
                        name: 'Author'
                    }
                ]
            }
        >
                    <BootstrapDataTable
                        url="/api/author"
                        add="/author/create">
                        <thead>
                        <tr>
                            <Column sort={"email"}>email</Column>
                            <Column sort={"first_name"}>first_name</Column>
                            <Column sort={"last_name"}>last_name</Column>
                            <ActionsColumn/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            row => <tr>
                                <td>{row.email}</td>
                                <td>{row.first_name}</td>
                                <td>{row.last_name}</td>
                                <Actions
                                    edit={`/author/${row.email}/edit`}
                                    del={`/api/author/${row.email}`}
                                />
                            </tr>
                        }

                        </tbody>
                    </BootstrapDataTable>
        </Breadcrumb>} />
    </Routes>;
}
