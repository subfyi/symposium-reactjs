import React, {Component, useCallback, useState} from 'react';
import {Actions, ActionsColumn, BootstrapDataTable, Breadcrumb, Column, IdColumn, useDataTableContext} from 'react-admin-base-adminkit';
import {useAuth} from "react-admin-base";
import {Button, Card, CardBody, Col} from "reactstrap";
import Moment from "react-moment";
import swal2 from "sweetalert2";


function GetJournalID({}) {
    const [, setParams] = useDataTableContext();
    const [api] = useAuth();
    const [loading, setLoading] = useState(false);

    const onChange = useCallback(async function (e) {
        setLoading(true);
        try {
            await api.tokenized.post('/api/journal/getid');
            setParams({});
        } finally {
            swal2.close();
        }
    }, [api, setParams]);

    return <>
        <Button color="btn btn-outline-danger ml-1" onClick={onChange}>Get Journal IDs</Button>
    </>;
}

function GetInfo({value}) {
    const [, setParams] = useDataTableContext();
    const [api] = useAuth();
    const [loading, setLoading] = useState(false);

    const onChange = useCallback(async function (e) {
        setLoading(true);
        try {
            await api.tokenized.post('/api/journal/getinfo', {
                row: value
            });
            setParams({});
        } finally {
            swal2.close();
        }
    }, [api, value, setParams]);


    return <>
        <Button color="btn btn-outline-primary ml-1 btn-sm" onClick={onChange}>Get Info</Button>
    </>;
}

function GetIssues({value}) {
    const [, setParams] = useDataTableContext();
    const [api] = useAuth();
    const [loading, setLoading] = useState(false);

    const onChange = useCallback(async function (e) {
        setLoading(true);
        try {
            await api.tokenized.post('/api/journal/getissues', {
                row: value
            });
            setParams({});
        } finally {
            swal2.close();
        }
    }, [api, value, setParams]);


    return <>
        <Button color="btn btn-outline-warning ml-1 btn-sm" onClick={onChange}>Get Issues</Button>
    </>;
}

export default class List extends Component {
    render() {
        return <Breadcrumb data={[
            {
                name: "journal",
                href: '/journal'
            }
        ]}>
            <Card>
                <CardBody>
                    <BootstrapDataTable
                        url="/api/journal"
                        {...this.props}>
                        <thead>
                        <tr>
                            <IdColumn/>
                            <Column sort="created_at">Sended Date</Column>
                            <Column sort="url">url</Column>
                            <Column sort="slug">slug</Column>
                            <Column sort="slug">founded</Column>
                            <ActionsColumn/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            row => <tr>
                                <td>{row.id}</td>
                                <td><Moment format="DD.MM.YYYY HH.mm" date={new Date(row.created_at)}/></td>
                                <td>{row.url}</td>
                                <td>{row.slug}</td>
                                <td>{row.founded}</td>
                                <Actions>
                                    <GetInfo value={row}/>
                                    <GetIssues value={row}/>
                                </Actions>
                            </tr>
                        }
                        </tbody>
                        <>
                            <Col md="2">
                                <GetJournalID/>
                            </Col>
                        </>
                    </BootstrapDataTable>
                </CardBody>
            </Card>
        </Breadcrumb>;
    }
}

