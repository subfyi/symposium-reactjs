import React from 'react';
import {CheckBox, EntityEditor, SingleFilePicker, Validator} from 'react-admin-base-bootstrap';
import {Card, CardBody, Col, FormGroup, Input, Label} from "reactstrap";
import {useEntity} from "react-admin-base";
import {Breadcrumb} from "react-admin-base-falcon";
import {Navigate, useParams} from 'react-router-dom';
import {useUser} from "../../components/UserProvider";
import {ParameterSelect, UserSelect} from "../../components/Selects";
import AuthorSelector from "./AuthorSelector";


export default function PostEntity() {
    const {id} = useParams();
    const entity = useEntity('/api/submission', id, {values: {}});
    const [data, setData] = entity;
    const user = useUser();

    return <Breadcrumb
        data={
            [
                {
                    href: '/submission',
                    name: 'Submission'
                },
                {
                    href: id ? '/submissions/' + data.id + '/edit' : '/submissions/create',
                    name: id ? 'Edit' : 'Create'
                }
            ]
        }
    >
        {!id && data.id && <Navigate to={"/submission/" + data.id + "/edit"} replace/>}
        <EntityEditor entity={entity}>
            <Card>
                <CardBody>
                    {user.role >= 8 && <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Paper Approved</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <CheckBox
                                type="checkbox"
                                id="paper_approved"
                                label="paper_approved"
                                className="mb-3"
                                checked={data.paper_approved}
                                onChange={a => setData({paper_approved: a.currentTarget.checked ? 1 : 0})}
                            />
                        </Col>
                    </FormGroup>}

                    <hr/>

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
                                    onCreateOption={row => ({
                                        id: row,
                                        value: row
                                    })}
                                    value={(data.pap_keyword || "").split('|').filter(a => a.length).map(a => ({
                                        id: a,
                                        value: a
                                    }))}
                                    onChange={a => setData({pap_keyword: (a && a.map(b => b.value).join('|')) || ""})}
                                    disabled={!(user.role >= 8)}
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
                                    disabled={!(user.role >= 8)}
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
                            <Validator type="required" name="lang">
                                <ParameterSelect
                                    type="uygulamacon"
                                    value={data.parampre}
                                    disabled={!(user.role >= 8)}
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
                                accepts=".doc,.docx"
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
                                    accepts=".doc,.docx"
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
                                    accepts=".pdf"
                                    disabled={!(user.role >= 8)}
                                    value={data.poster_presentation_dosya}
                                    onChange={a => setData({poster_presentation_dosya: a})}
                                />
                            </Validator>
                        </Col>
                    </FormGroup>
                    {user.role >= 8 && <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Creator</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <UserSelect
                                value={data.user}
                                onChange={a => setData({user: a})}
                            />
                        </Col>
                    </FormGroup>}
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
                                    disabled={!(user.role >= 8)}
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
                    onChange={a => setData({authors: a})}
                />
            </Card>
        </EntityEditor>
    </Breadcrumb>;
}
