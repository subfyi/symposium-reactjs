import React, {Component} from 'react';
import {Actions, ActionsColumn, BootstrapDataTable, Breadcrumb, Column, IdColumn} from 'react-admin-base-adminkit';
import {Card, CardBody} from "reactstrap";

export default class List extends Component {
    render() {
        return <Breadcrumb data={[
            {
                name: "author",
                href: '/author'
            }
        ]}>
            <Card>
                <CardBody>
                    <BootstrapDataTable
                        url="/api/author"
                        add="/author/create"
                        {...this.props}>
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
                </CardBody>
            </Card>
        </Breadcrumb>;
    }
}


