import React, {Component} from 'react';
import {Actions, ActionsColumn, BootstrapDataTable, Breadcrumb, Column, IdColumn} from 'react-admin-base-adminkit';
import {Card, CardBody, Table} from "reactstrap";
import {Link} from "react-router-dom";

export default class Posters extends Component {
    render() {

        return <Breadcrumb
            data={
                [
                    {
                        href: '/presentation/oral',
                        name: 'Oral Presentation'
                    },
                    {
                        href: '/presentation/poster',
                        name: 'Poster Presentation'
                    },
                ]
            }
        >
            <Card>
                <CardBody>
                    <Table hover bordered striped responsive size="m">
                        <thead>
                        <tr>
                            <th><Link to={"/presentation/1/watch"} className="btn btn-sm btn-primary col-md-12"><i className="fas fa-eye"/> Opening speech</Link></th>
                        </tr>
                        </thead>
                    </Table>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <BootstrapDataTable
                        url="/api/submission?page=1&itemPerPage=-1&query=&sort=id&desc=false&posters=1&year=2021&presentation=1"
                        {...this.props}>
                        <thead>
                        <tr>
                            <Column sort="en_title">Title of Abstract</Column>
                            <Column sort="topic.value">Topic of Article</Column>
                            <Column>Authors</Column>
                            <Column></Column>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            row => {
                                return <tr>
                                    <td>{row.en_title}</td>
                                    <td>{row.topic && row.topic.value}</td>
                                    <td>{row.authors.map((author, index) => <div>
                                        {index + 1}. {author.first_name} {author.last_name}{" "}
                                        {!!author.correspond && <>(Correspond)</>}
                                        {!!author.presenter && <>(Presenter)</>}
                                    </div>)}
                                    </td>
                                    <th><Link to={"/presentation/" + row.id + "/watch"} className="btn btn-sm btn-outline-primary"><i className="fas fa-eye"/> Watch</Link></th>

                                </tr>;
                            }
                        }
                        </tbody>
                    </BootstrapDataTable>
                </CardBody>
            </Card>
        </Breadcrumb>;
    }
}

