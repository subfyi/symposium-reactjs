import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Actions, ActionsColumn, BootstrapDataTable, Column, ExcelExportButton, IdColumn, useDataTableContext} from 'react-admin-base-bootstrap';
import {Breadcrumb} from "react-admin-base-falcon";
import {Col} from "reactstrap";
import FileDownload from "../../components/FileDownload";
import {useUser} from "../../components/UserProvider";
import {YearSelect} from "../../components/Selects";
import PostEntity from "./Edit";
import {FormattedDate} from "react-intl";

const params = {
    itemPerPage: 50,
    year: 2023,
    sort: 'id',
    desc: true
};

function YearFilter() {
    const [params, setParams] = useDataTableContext();

    return <Col>
        <YearSelect
            value={params.year && {title_year: params.year}}
            onChange={a => setParams({year: a.title_year})}
        />
    </Col>
}

export default function Posts() {
    const user = useUser();
    return <Routes>
        <Route path=":id/edit" element={<PostEntity/>}/>
        <Route path="create" element={<PostEntity/>}/>
        <Route path="*" element={<Breadcrumb
            title="Submission"
            data={
                [
                    {
                        href: '/submission',
                        name: 'Submission'
                    }
                ]
            }
        >
            <BootstrapDataTable
                url="/api/submission"
                defaultParams={params}
            >
                <thead>
                <tr>
                    <IdColumn/>
                    {user.role >= 8 && <Column sort="paper_approved">P. App.</Column>}
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
                            {user.role >= 8 && <td>{row.paper_approved == 1 ? "yes" : "no"}</td>}
                            <td><FormattedDate value={row.created_at}/></td>
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
                                </div>
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
                    {user.role >= 8 && <YearFilter/>}
                </>
            </BootstrapDataTable>
        </Breadcrumb>}/>
    </Routes>;
}

