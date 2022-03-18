import React, {Component} from 'react';
import {Actions, ActionsColumn, BootstrapDataTable, Column, IdColumn} from 'react-admin-base-bootstrap';
import {Breadcrumb} from "react-admin-base-front";
import {Card, CardBody, Col} from "reactstrap";
import {LanguageFilter} from "../../common/Filters";

export default class List extends Component {
    render() {
        return <Breadcrumb data={[
            {
                name: "subject",
                href: '/subject'
            }
        ]}>
            <Card>
                <CardBody>
                    <BootstrapDataTable
                        url="/api/subject"
                        add="/subject/create"
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
                                    edit={`/subject/${row.id}/edit`}
                                    del={`/api/subject/${row.id}`}
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

