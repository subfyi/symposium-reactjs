import React, {Component} from 'react';
import {Card, CardBody} from '../../../_metronic/_partials/controls';
import GenelList from '../../common/GenelList';
import {Link} from 'react-router-dom';
import Table from "@material-ui/core/Table";

export default class Orals extends Component {
    render() {
        return <div className="animated fadeIn">

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


                    <GenelList islem={false} url="/api/submission?page=1&itemPerPage=-1&query=&sort=id&desc=false&orals=1&year=2020&presentation=1">
                        <>
                            <td>#</td>
                            <th sort="pap_title">Title of Abstract</th>
                            <th sort="topic.value">Topic of Article</th>
                            <th sort="parampre.value">Pre. Type</th>
                            <th>Authors</th>
                            <th></th>
                        </>
                        {
                            (row) => <>
                                <td>#</td>
                                <td>{row.pap_title}</td>
                                <td>{row.topic && row.topic.value}</td>
                                <td>{row.parampre && row.parampre.value}</td>
                                <td>{row.authors.map((author, index) => <div>
                                    {index + 1}. {author.name} {author.surname}{" "}
                                    {!!author.correspond && <>(Correspond)</>}
                                    {!!author.presenter && <>(Presenter)</>}
                                </div>)}
                                </td>
                                <th><Link to={"/presentation/" + row.id + "/watch"} className="btn btn-sm btn-outline-primary"><i className="fas fa-eye"/> Watch</Link></th>
                            </>
                        }
                    </GenelList>
                </CardBody>
            </Card>
        </div>;
    }
}