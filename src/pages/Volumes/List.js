import React, {Component, useCallback, useState} from 'react';
import {useAuth} from 'react-admin-base';
import {useDataTableContext, Actions, ActionsColumn, BootstrapDataTable, Breadcrumb, Column, IdColumn} from 'react-admin-base-adminkit';
import {Button, Card, CardBody, Col} from "reactstrap";
import Moment from "react-moment";
import swal2 from "sweetalert2";
import {JournalFilter, LanguageFilter} from "../../common/Filters";

function GetArticles({value}) {
    const [, setParams] = useDataTableContext();
    const [api] = useAuth();
    const [loading, setLoading] = useState(false);

    const onChange = useCallback(async function (e) {
        setLoading(true);
        try {
            await api.tokenized.post('/api/volume/getarticles', {
                row: value
            });
            setParams({});
        //    this.table.current && this.table.current.update();
        } finally {
            swal2.close();
        }
    }, [api, value, setParams]);


    return <>
        <Button color="btn btn-outline-warning ml-1 btn-sm" onClick={onChange}>Get Articles</Button>
    </>;
}


export default class List extends Component {


    render() {
        return <Breadcrumb data={[
            {
                name: "volumes",
                href: '/volume'
            }
        ]}>
            <Card>
                <CardBody>
                    <BootstrapDataTable
                        url="/api/volume"
                        {...this.props}>
                        <thead>
                        <tr>
                            <IdColumn/>
                            <Column sort="created_at">Sended Date</Column>
                            <Column sort="d_id">d_id</Column>
                            <Column>journal_id</Column>
                            <Column>journal</Column>
                            <Column sort="volume">volume</Column>
                            <Column sort="issue">issue</Column>
                            <Column sort="special">special</Column>
                            <ActionsColumn/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            row => <>
                                <tr>
                                </tr>
                                <tr>
                                    <td>{row.id}</td>
                                    <td><Moment format="DD.MM.YYYY HH.mm" date={new Date(row.created_at)}/></td>
                                    <td>{row.d_id}</td>
                                    <td>{row.journalto.id}</td>
                                    <td>{row.journalto.slug}</td>
                                    <td>{row.volume}</td>
                                    <td>{row.issue}</td>
                                    <td>{row.special}</td>
                                    <Actions>
                                        <GetArticles value={row}/>
                                    </Actions>

                                </tr>
                            </>
                        }
                        </tbody>
                        <>
                            <Col>
                                <JournalFilter/>
                            </Col>
                        </>
                    </BootstrapDataTable>
                </CardBody>
            </Card>
        </Breadcrumb>;
    }
}

