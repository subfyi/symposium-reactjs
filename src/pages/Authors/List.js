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
                            <IdColumn/>
                            <Column>email</Column>
                            <Column>first_name</Column>
                            <Column>middle_name</Column>
                            <Column>last_name</Column>
                            <ActionsColumn/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            row => <tr>
                                <td>{row.id}</td>
                                <td>{row.email}</td>
                                <td>{row.first_name}</td>
                                <td>{row.middle_name}</td>
                                <td>{row.last_name}</td>
                                <Actions
                                    edit={`/author/${row.id}/edit`}
                                    del={`/api/author/${row.id}`}
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


