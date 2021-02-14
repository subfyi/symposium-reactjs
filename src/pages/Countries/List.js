import React, {Component} from 'react';
import {Actions, ActionsColumn, BootstrapDataTable, Breadcrumb, Column, IdColumn} from 'react-admin-base-adminkit';
import {Card, CardBody} from "reactstrap";

export default class List extends Component {
    render() {
        return <Breadcrumb data={[
            {
                name: "countrie",
                href: '/countrie'
            }
        ]}>
            <Card>
                <CardBody>
                    <BootstrapDataTable
                        url="/api/countrie"
                        add="/countrie/create"
                        {...this.props}>
                        <thead>
                        <tr>
                            <IdColumn/>
                            <Column>type</Column>
                            <Column>name</Column>
                            <ActionsColumn/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            row => <tr>
                                <td>{row.id}</td>
                                <td>{row.type}</td>
                                <td>{row.name}</td>
                                <Actions
                                    edit={`/countrie/${row.id}/edit`}
                                    del={`/api/countrie/${row.id}`}
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



