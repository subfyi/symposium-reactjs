import React, {Component} from 'react';
import {Actions, ActionsColumn, BootstrapDataTable, Column, IdColumn} from 'react-admin-base-bootstrap';
import {Breadcrumb} from "react-admin-base-nazox";
import {Card, CardBody, Col, FormGroup} from "reactstrap";
import {LanguageFilter} from "../../common/Filters";

export default class List extends Component {
    render() {
        return <Breadcrumb data={[
            {
                name: "keyword",
                href: '/keyword'
            }
        ]}>
            <Card>
                <CardBody>
                    <BootstrapDataTable
                        url="/api/keyword"
                        add="/keyword/create"
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
                                    edit={`/keyword/${row.id}/edit`}
                                    del={`/api/keyword/${row.id}`}
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
