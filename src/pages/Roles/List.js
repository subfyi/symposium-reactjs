
import React, {Component} from 'react';
import {Actions, ActionsColumn, BootstrapDataTable, Column, IdColumn} from 'react-admin-base-bootstrap';
import {Breadcrumb} from "react-admin-base-adminkit";
import {Card, CardBody} from "reactstrap";

export default class List extends Component {
    render() {
        return <Breadcrumb data={[
            {
                name: "roles",
                href: '/roles'
            }
        ]}>
            <Card>
                <CardBody>
                    <BootstrapDataTable
                        url="/api/roles"
                        add="/roles/create"
                        {...this.props}>
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
                    </BootstrapDataTable>
                </CardBody>
            </Card>
        </Breadcrumb>;
    }
}



