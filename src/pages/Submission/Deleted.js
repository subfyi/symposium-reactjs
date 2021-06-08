import React from 'react';
import {Actions, ActionsColumn, BootstrapDataTable, Breadcrumb, Column, ExcelExportButton, IdColumn} from 'react-admin-base-adminkit';
import {Button, Card, CardBody, FormGroup} from "reactstrap";
import Moment from "react-moment";
import FileDownload from "../../common/FileDownload";
import {useUser} from "../../Components/UserProvider";

export function RestoreButton({id}) {
    return <td>
        <a href={process.env.REACT_APP_ENDPOINT + "api/submission/" + id + "/restore"}><Button outline color="primary"> <i className="fa fa-recycle"/></Button></a>
    </td>;
}

export default function List() {
    const user = useUser();

    return <Breadcrumb data={[
        {
            name: "Submission Deleted",
            href: '/submission/deleted'
        }
    ]}>
        <Card>
            <CardBody>
                <BootstrapDataTable
                    url="/api/submission?year=2021&pap_status=3"
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
                        <Column></Column>
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
                                <RestoreButton id={row.id}/>
                                <Actions
                                    edit={"/submission/" + row.id + "/edit"}
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
