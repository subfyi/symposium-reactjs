import React from 'react';
import {EntityEditor, SingleFilePicker} from 'react-admin-base-adminkit';
import {Card, CustomInput, CardBody, Col, FormGroup, Input, Label, Row} from "reactstrap";
import {useEntity} from "react-admin-base";
import {Breadcrumb} from 'react-admin-base-adminkit';
import {Redirect} from 'react-router-dom';
import {Validator} from 'react-admin-base-adminkit';
import {useUser} from "../../Components/UserProvider";
import {ParameterSelect} from "../../common/Selects";
import UploadConfigGDrive from "../../UploadConfigGDrive";
import AuthorSelector from "./AuthorSelector";

export default function EditCreate({match}) {
    const id = match.params.id;

    const user = useUser();
    const entity = useEntity('/api/submission', id);
    const [data, setData] = entity;

    return <Breadcrumb
        title={data.en_title}
        data={
            [
                {
                    href: '/submissions',
                    name: 'Submission'
                },
                data.id && {
                    href: '/submission/' + data.id,
                    name: data.id
                },
                !data.id && {
                    href: '/submission/create',
                    name: 'Create'
                }
            ]
        }
    >
        {data && data.id && +id !== +data.id && <Redirect to={"/submission/" + data.id + "/edit" }/>}
        <EntityEditor entity={entity}>
            <Card>
                <CardBody>

                    {data.video && user && user.role >= 8 && <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Video Approved</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <CustomInput
                                id="video_approved"
                                type="checkbox"
                                checked={!!data.video_approved}
                                onChange={a => setData({video_approved: a.currentTarget.checked ? 1 : 0})}
                            />
                            <a href={`https://drive.google.com/file/d/${data.video.g_dosyaismi}/preview`} target="_blank"
                               className="mt-2 btn btn-sm btn-outline-primary">
                                Watch Video
                            </a>
                        </Col>
                    </FormGroup>}

                    {user.role >= 8 && <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Paper Approved</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <CustomInput
                                id="paper_approved"
                                type="checkbox"
                                checked={!!data.paper_approved}
                                onChange={a => setData({paper_approved: a.currentTarget.checked ? 1 : 0})}
                            />
                        </Col>
                    </FormGroup>}

                    {user.role >= 8 && <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">title_year</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Input type="text" value={data.title_year}
                                   onChange={a => setData({title_year: a.currentTarget.value})}/>
                        </Col>
                    </FormGroup>}

                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Article Title (ENG) </Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="en_title"
                                type="required"
                                >
                                <Input type="text"
                                       disabled={!!data.paper_approved && !(user.role >= 8)}
                                       value={data.en_title}
                                       onChange={a => setData({
                                           en_title: a.currentTarget.value
                                       })}/>
                            </Validator>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Abstract Text (ENG)</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="en_abstract"
                                type="required"
                                >
                                <Input type="textarea"
                                       rows="10"
                                       disabled={!!data.paper_approved && !(user.role >= 8)}
                                       value={data.en_abstract}
                                       onChange={a => setData({en_abstract: a.currentTarget.value})}/>
                            </Validator>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Keywords</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="pap_keyword"
                                type="required"
                                >
                                <ParameterSelect
                                    isMulti
                                    type="tagcon"
                                    value={(data.pap_keyword || "").split('|').filter(a => a.length).map(a => ({
                                        value: a,
                                        label: a
                                    }))}
                                    onChange={a => setData({pap_keyword: (a && a.join('|')) || ""})}
                                />
                            </Validator>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Topic</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="pap_topic_p"
                                type="required"
                                >
                                <ParameterSelect
                                    type="keywordcon"
                                    value={data.topic}
                                    onChange={a => setData({topic: a})}/>
                            </Validator>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Presentation Type</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator type="required" name="lang" >
                                <ParameterSelect
                                    type="uygulamacon"
                                    value={data.parampre}
                                    onChange={a => setData({parampre: a})}
                                />
                            </Validator>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Abstract (.doc, .docx)</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <SingleFilePicker
                                disabled={!(user.role >= 8)}
                                value={data.abstract_dosya}
                                onChange={a => setData({abstract_dosya: a})}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Full Paper (.doc, .docx)</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="full_paper_dosya"
                                value={data.abstract_dosya || data.full_paper_dosya || data.poster_presentation_dosya}
                                type="file"
                                >
                                <SingleFilePicker
                                    disabled={!(user.role >= 8)}
                                    value={data.full_paper_dosya}
                                    onChange={a => setData({full_paper_dosya: a})}
                                />
                            </Validator>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Poster Presentation (.pdf)</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="poster_presentation_dosya"
                                value={data.abstract_dosya || data.full_paper_dosya || data.poster_presentation_dosya}

                                type="file"
                                >
                                <SingleFilePicker
                                    disabled={!(user.role >= 8)}
                                    value={data.poster_presentation_dosya}
                                    onChange={a => setData({poster_presentation_dosya: a})}
                                />
                            </Validator>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Presentation File (.mp4)</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <UploadConfigGDrive>
                                <SingleFilePicker
                                    disabled={!(user.role >= 8)}
                                    accepts="video/mp4,application/pdf"
                                    value={data.video}
                                    onChange={a => setData({video: a})}
                                />
                            </UploadConfigGDrive>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Prefered Publish Type</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="pap_type"
                                type="required"
                                >
                                <ParameterSelect
                                    type="birimcon"
                                    value={data.parampap}
                                    onChange={a => setData({parampap: a})}/>
                            </Validator>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Message to Congress</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Input type="textarea" value={data.mes_congress} rows="3"
                                   onChange={a => setData({mes_congress: a.currentTarget.value})}/>
                        </Col>
                    </FormGroup>

                </CardBody>
            </Card>
            <Card>
                <AuthorSelector
                    value={data.authors}
                    onChange={a => setData({ authors: a })}
                />
            </Card>
        </EntityEditor>
    </Breadcrumb>;
}