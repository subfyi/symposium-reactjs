import React from 'react';
import {Actions, ActionsColumn, BootstrapDataTable, Breadcrumb, Column, ExcelExportButton, IdColumn} from 'react-admin-base-adminkit';
import {Card, CardBody, FormGroup} from "reactstrap";
import Moment from "react-moment";
import FileDownload from "../../common/FileDownload";
import {useUser} from "../../Components/UserProvider";

export default function List() {
    const user = useUser();

    return <Breadcrumb data={[
        {
            name: "Submission",
            href: '/submission'
        }
    ]}>
        <Card>
            <CardBody>
                <BootstrapDataTable
                    url="/api/submission?year=2021"
                >
                    <thead>
                    <tr>
                        <IdColumn/>
                        {user.role >= 8 && <Column sort="paper_approved">P. Approved</Column>}
                        {user.role >= 8 && <Column sort="video_approved">Approved</Column>}
                        <Column sort="created_at">Sended Date</Column>
                        <Column sort="en_title">Title of Abstract</Column>
                        <Column sort="topic.value">Topic of Article</Column>
                        <Column sort="parampap.value">Pap. Type</Column>
                        <Column sort="parampre.value">Pre. Type</Column>
                        <Column>Authors</Column>
                        <Column>Files</Column>
                        <Column sort="bloglar.updated_at">Creator</Column>
                        <ActionsColumn/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        row => {
                            return <tr>
                                <td>{row.id}</td>
                                {user.role >= 8 &&  <td>{row.paper_approved}</td>}
                                {user.role >= 8 &&  <td>{row.video_approved}</td>}
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
                                <Actions
                                    edit={"/submission/" + row.id + "/edit"}
                                    del={user.role >= 8 && ("/api/submission/" + row.id)}
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
                                "Approved",
                                "Sended",
                                "Title",
                                "Topic",
                                "Pap. Type",
                                "Pre. Type",
                                "Creator",
                                "Mails"
                            ]}
                            map={paper => [
                                paper.id,
                                new Date(paper.created_at),
                                paper.video_approved,
                                paper.en_title,
                                paper.topic && paper.topic.value,
                                paper.parampap && paper.parampap.value,
                                paper.parampre && paper.parampre.value,
                                paper.user.name + " " + paper.user.surname,
                                paper.authors.map(a => a.first_name + " " + a.last_name + (!!a.correspond ? "*" : "")).join(", "),
                                paper.authors.map(a => a.email).join(", ")
                            ]}
                        />
                    </>
                </BootstrapDataTable>
            </CardBody>
        </Card>
    </Breadcrumb>;
}
