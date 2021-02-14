import React, {Component, useState} from 'react';
import {Actions, ActionsColumn, BootstrapDataTable, Breadcrumb, Column, IdColumn, useDataTableContext} from 'react-admin-base-adminkit';
import {Card, CardBody, Col} from "reactstrap";
import {LanguageFilter} from "../../common/Filters";

export default class List extends Component {
    render() {
        return <Breadcrumb data={[
            {
                name: "articletype",
                href: '/articletype'
            }
        ]}>
            <Card>
                <CardBody>
                    <BootstrapDataTable
                        url="/api/articletype"
                        add="/articletype/create"
                        {...this.props}>
                        <thead>
                        <tr>
                            <IdColumn/>
                            <Column>Lang</Column>
                            <Column>name</Column>
                            <ActionsColumn/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            row => <tr>
                                <td>{row.id}</td>
                                <td>{row.language.code}</td>
                                <td>{row.name}</td>
                                <Actions
                                    edit={`/articletype/${row.id}/edit`}
                                    del={`/api/articletype/${row.id}`}
                                />
                            </tr>
                        }

                        </tbody>
                        <>
                            <Col>
                                <LanguageFilter/>
                            </Col>
                        </>
                    </BootstrapDataTable>
                </CardBody>
            </Card>
        </Breadcrumb>;
    }
}
