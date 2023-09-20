import React, {useCallback} from 'react';
import {Actions, ActionsColumn, BootstrapDataTable, Column, ExcelExportButton, IdColumn, useDataTableContext} from 'react-admin-base-bootstrap';
import {Breadcrumb} from "react-admin-base-falcon";
import {Button, Card, CardBody, FormGroup} from "reactstrap";
import Moment from "react-moment";
import FileDownload from "../../components/FileDownload";
import {useAuth} from "react-admin-base";

export function RestoreButton({url}) {
    const [api] = useAuth();
    const [params, setParams] = useDataTableContext();

    const handleRestore = useCallback(async function (e) {
        e.preventDefault();
        await api.tokenized.get(url);
        setParams({});
    }, [api, url, setParams]);

    return <Button type="button" onClick={handleRestore} outline className="ml-1" color="primary"><i className="fa fa-undo"/></Button>;
}

function RestoreableActions(props) {
    return <Actions {...props}>
        {props.restore_url && <RestoreButton url={props.restore_url}/>}
    </Actions>;
}

export default function List() {

    return <Breadcrumb data={[
        {
            name: "Submission Deleted",
            href: '/submission/deleted'
        }
    ]}>
        <Card>
            <CardBody>
                <BootstrapDataTable
                    url="/api/submission?year=2023&pap_status=3"
                >
                    <thead>
                    <tr>
                        <IdColumn/>
                        <Column sort="created_at">Sended Date</Column>
                        <Column sort="en_title">Title of Abstract</Column>
                        <Column sort="topic.value">Topic of Article</Column>
                        <Column sort="parampap.value">Pap. Type</Column>
                        <Column sort="parampre.value">Pre. Type</Column>
                        <Column>Authors</Column>
                        <Column>Files</Column>
                        <Column>Creator</Column>
                        <ActionsColumn/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        row => {
                            return <tr>
                                <td>{row.id}</td>
                                <td><Moment format="DD.MM.YYYY HH.mm" date={new Date(row.created_at)}/></td>
                                <td>{row.en_title}</td>
                                <td>{row.topic && row.topic.value}</td>
                                <td>{row.parampap && row.parampap.value}</td>
                                <td>{row.parampre && row.parampre.value}</td>
                                <td>{row.authors.map((author, index) => <div>
                                    <div>{index + 1}. {author.first_name} {author.last_name}
                                        {!!author.correspond && <span>{'('}Correspond{')'}</span>}
                                        {!!author.presenter && <span>{'('}Presenter{')'}</span>}
                                    </div>
                                </div>)}</td>
                                <td>
                                    <div className="col-md-12">
                                        <FileDownload label="Abstract" value={row.abstract_dosya}/>
                                        <FileDownload label="Full Paper" value={row.full_paper_dosya}/>
                                        <FileDownload label="Presentation" value={row.poster_presentation_dosya}/>
                                        {row.video && <FormGroup row>
                                            <div>
                                                <a href={`https://drive.google.com/file/d/${row.video.g_dosyaismi}/preview`} target="_blank"
                                                   className="btn btn-sm btn-outline-primary">
                                                    <i className="fas fa-file-video"></i> Watch Video
                                                </a>
                                            </div>
                                        </FormGroup>}</div>
                                </td>
                                <td>
                                    {row.user.name} {row.user.surname}
                                </td>
                                <RestoreableActions
                                    edit={"/submission/" + row.id + "/edit"}
                                    restore_url={"/api/submission/" + row.id + "/restore"}
                                />
                            </tr>;
                        }
                    }
                    </tbody>
                    <>
                        <ExcelExportButton
                            name="Papers"
                            params={{
                                sort: 'id',
                                desc: false
                            }}
                            header={[
                                "ID",
                                "Creation Date",
                                "Sended",
                                "Title",
                                "Topic",
                                "Pap. Type",
                                "Pre. Type",
                                "Creator"
                            ]}
                            map={paper => [
                                paper.id,
                                new Date(paper.created_at),
                                paper.en_title,
                                paper.topic && paper.topic.value,
                                paper.parampap && paper.parampap.value,
                                paper.parampre && paper.parampre.value,
                                paper.user.name + " " + paper.user.surname,
                                paper.authors.map(a => a.first_name + " " + a.last_name + (!!a.correspond ? "*" : "")).join(", ")
                            ]}
                        />
                    </>
                </BootstrapDataTable>
            </CardBody>
        </Card>
    </Breadcrumb>;
}
