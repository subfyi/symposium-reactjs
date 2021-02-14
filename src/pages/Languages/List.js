
import React, {Component} from 'react';
import {Actions, ActionsColumn, BootstrapDataTable, Breadcrumb, Column, IdColumn} from 'react-admin-base-adminkit';
import {Card, CardBody} from "reactstrap";

export default class List extends Component {
    render() {
        return <Breadcrumb data={[
            {
                name: "language",
                href: '/language'
            }
        ]}>
            <Card>
                <CardBody>
                    <BootstrapDataTable
                        url="/api/language"
                        add="/language/create"
                        {...this.props}>
                        <thead>
                        <tr>
                            <IdColumn/>
                            <Column>code</Column>
                            <Column>name</Column>
                            <ActionsColumn/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            row => <tr>
                                <td>{row.id}</td>
                                <td>{row.code}</td>
                                <td>{row.name}</td>
                                <Actions
                                    edit={`/language/${row.id}/edit`}
                                    del={`/api/language/${row.id}`}
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



