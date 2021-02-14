import React, {Component} from 'react';
import {Actions, ActionsColumn, BootstrapDataTable, Breadcrumb, Column, IdColumn} from 'react-admin-base-adminkit';
import {Card, CardBody} from "reactstrap";

export default class List extends Component {
    render() {
        return <Breadcrumb data={[
            {
                name: "citation",
                href: '/citation'
            }
        ]}>
            <Card>
                <CardBody>
                    <BootstrapDataTable
                        url="/api/citation"
                        add="/citation/create"
                        {...this.props}>
                        <thead>
                        <tr>
                            <IdColumn/>
                            <Column>raw</Column>
                            <Column>type</Column>
                            <Column>order</Column>
                            <ActionsColumn/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            row => <tr>
                                <td>{row.id}</td>
                                <td>{row.raw}</td>
                                <td>{row.type}</td>
                                <td>{row.order}</td>
                                <Actions
                                    edit={`/citation/${row.id}/edit`}
                                    del={`/api/citation/${row.id}`}
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



