import React, {Component} from 'react';
import {Input, CustomInput, Button, Col, FormGroup, Label} from 'reactstrap';
import CommonForm from '../../common/GenelForm';
import Validator from '../../common/Validator';
import AuthorSelect from '../../common/AuthorSelect';
import MultiParameterSelect from '../../common/MultiParameterSelect';
import ParameterSelect from '../../common/ParameterSelect';
import {tokenized} from '../../api';
import GDriveSingleFilePicker from '../../upload/GDriveSingleFilePicker';

export default class Edit extends Component {
    state = {};

    async componentWillMount() {
        const user = await tokenized.get('/api/myself');
        this.setState({user: user.data});
    }

    render() {
        if (!this.state.user)
            return null;

        return (
            <CommonForm
                url="/api/article"
                add="/articles/article"
                edit={id => `/article/${id}/edit`}
                key={this.props.match.params.id || 0}
                name="article"
                id={this.props.match.params.id}
                redirect="/article"
                {...this.props}
            >
                {
                    controller => <>

                        {this.state.user && this.state.user.role.id >= 8 && <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Paper Approved</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <CustomInput
                                    id="paper_approved"
                                    type="checkbox"
                                    checked={!!controller.state.paper_approved}
                                    onChange={a => controller.setState({paper_approved: a.currentTarget.checked ? 1 : 0})}
                                />
                            </Col>
                        </FormGroup>}


                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Article Title (ENG) </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator
                                    name="pap_title"
                                    type="required"
                                    controller={controller}>
                                    <Input type="text"
                                           disabled={!!controller.state.paper_approved && !(this.state.user && this.state.user.role.id >= 8)}

                                           value={controller.state.pap_title}
                                           onChange={a => controller.setState({pap_title: a.currentTarget.value})}/>
                                </Validator>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Abstract Text (ENG)</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator
                                    name="pap_abstract"
                                    type="required"
                                    controller={controller}>
                                    <Input type="textarea"
                                           rows="10"
                                           disabled={!!controller.state.paper_approved && !(this.state.user && this.state.user.role.id >= 8)}
                                           value={controller.state.pap_abstract}
                                           onChange={a => controller.setState({pap_abstract: a.currentTarget.value})}/>
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
                                    controller={controller}>
                                    <MultiParameterSelect
                                        type="tagcon"
                                        selected={(controller.state.pap_keyword || "").split('|').filter(a => a.length).map(a => ({
                                            value: a,
                                            label: a
                                        }))}
                                        onChange={a => controller.setState({pap_keyword: (a && a.join('|')) || ""})}
                                    />
                                </Validator>
                            </Col>
                        </FormGroup><FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Subjects</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="pap_topic_p"
                                type="required"
                                controller={controller}>
                                <ParameterSelect
                                    type="keywordcon"
                                    value={controller.state.pap_topic_p}
                                    onChange={a => controller.setState({pap_topic_p: a})}/>
                            </Validator>
                        </Col>
                    </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Source </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator
                                    name="pap_title"
                                    type="required"
                                    controller={controller}>
                                    <Input type="text"
                                           disabled={!!controller.state.paper_approved && !(this.state.user && this.state.user.role.id >= 8)}

                                           value={controller.state.pap_title}
                                           onChange={a => controller.setState({pap_title: a.currentTarget.value})}/>
                                </Validator>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Paper (.doc, .docx)</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <GDriveSingleFilePicker
                                    accepts="application/pdf"
                                    value={controller.state.video}
                                    onChange={a => controller.setState({video: a})}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Copyright File (.pdf)</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <GDriveSingleFilePicker
                                    accepts="application/pdf"
                                    value={controller.state.video}
                                    onChange={a => controller.setState({video: a})}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">References</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator
                                    name="citations"
                                    type="required"
                                    controller={controller}>
                                    <Input type="textarea"
                                           rows="15"
                                           disabled={!!controller.state.paper_approved && !(this.state.user && this.state.user.role.id >= 8)}
                                           value={controller.state.citations}
                                           onChange={a => controller.setState({citations: a.currentTarget.value})}/>
                                </Validator>
                            </Col>
                        </FormGroup>

                        <FormGroup row> <Col md="3">
                        </Col>
                            <Col xs="12" md="9">
                                <h2>Submission Requirements
                                </h2>
                                <p><small>You must read and acknowledge that you've completed the requirements below before proceeding.
                                </small></p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3" className="text-right">
                                <CustomInput
                                    id="paper_approved"
                                    type="checkbox"
                                    checked={!!controller.state.paper_approved}
                                    onChange={a => controller.setState({paper_approved: a.currentTarget.checked ? 1 : 0})}
                                />
                            </Col>
                            <Col xs="12" md="9">
                                <Label htmlFor="text-input">The submission has not been previously published, nor is it before another journal for consideration (or an explanation has been
                                    provided in Comments to the Editor).</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3" className="text-right">
                                <CustomInput
                                    id="paper_approved"
                                    type="checkbox"
                                    checked={!!controller.state.paper_approved}
                                    onChange={a => controller.setState({paper_approved: a.currentTarget.checked ? 1 : 0})}
                                />
                            </Col>
                            <Col xs="12" md="9">
                                <Label htmlFor="text-input">The submission file is in OpenOffice, Microsoft Word, or RTF document file format.

                                </Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3" className="text-right">
                                <CustomInput
                                    id="paper_approved"
                                    type="checkbox"
                                    checked={!!controller.state.paper_approved}
                                    onChange={a => controller.setState({paper_approved: a.currentTarget.checked ? 1 : 0})}
                                />
                            </Col>
                            <Col xs="12" md="9">
                                <Label htmlFor="text-input">Where available, URLs for the references have been provided.

                                </Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3" className="text-right">
                                <CustomInput
                                    id="paper_approved"
                                    type="checkbox"
                                    checked={!!controller.state.paper_approved}
                                    onChange={a => controller.setState({paper_approved: a.currentTarget.checked ? 1 : 0})}
                                />
                            </Col>
                            <Col xs="12" md="9">
                                <Label htmlFor="text-input"> The text is single-spaced; uses a 11-point font; employs italics, rather than underlining (except with URL addresses); and all
                                    illustrations, figures, and tables are placed within the text at the appropriate points, rather than at the end.
                                    This field is required.


                                </Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3" className="text-right">
                                <CustomInput
                                    id="paper_approved"
                                    type="checkbox"
                                    checked={!!controller.state.paper_approved}
                                    onChange={a => controller.setState({paper_approved: a.currentTarget.checked ? 1 : 0})}
                                />
                            </Col>
                            <Col xs="12" md="9">
                                <Label htmlFor="text-input"> The text adheres to the stylistic and bibliographic requirements outlined in the Author Guidelines.
                                    This field is required.
                                </Label>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Comments for the Editor</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="textarea" value={controller.state.mes_congress} rows="3"
                                       onChange={a => controller.setState({mes_congress: a.currentTarget.value})}/>
                            </Col>
                        </FormGroup>

                        <FormGroup row> <Col md="3">
                        </Col>
                            <Col xs="12" md="9">
                                <h2>Acknowledge the copyright statement

                                </h2>
                                <p><strong>Copyright Transfer Statement</strong></p>
                                <p>The Author of the Article as specified herein, hereby transfers copyright and assigns to International Journal of Environmental Pollution and Environmental Modelling
                                    all rights, title and interest that the Author may have, may at any time be found to have in and to the Article and any revisions or versions thereof, including,
                                    but no limited to, the sole right to print, publish, and sell the Article throughout the World in all languages and media.</p>
                                <p>This assignment shall be deemed in effect if and when the Article is accepted for publication.</p>
                                <p>Should the Article contain any material protected by the copyright of others, the author will deliver to International Journal of Environmental Pollution and
                                    Environmental Modelling written permission from the copyright owner to reproduce such material in the Article.</p>
                                <p>The Author represents and warrants that he/she is the author and proprietor of the Article, that he/she has not granted or assigned any rights in the Article to any
                                    other person or entity, that the Article is copyrightable, that it does no infringe upon and copyright, trademark, or patent, that it does not invade the right of
                                    privacy or publicity of any person or entity, that it does not contain any libellous matter, that all statements asserted as facts are true or based upon reasonable
                                    research for accuracy and that, to the best of the Author’s knowledge, no formula, procedure, or prescription contained in the Article would cause injury if used or
                                    followed in accordance with the instructions and/or warnings contained in the Article.</p>
                                <p>The Author will indemnify International Journal of Environmental Pollution and Environmental Modelling (IJEPEM) against and costs, expenses or damages that may incur
                                    or for winch International Journal of Environmental Pollution and Environmental Modelling may become liable as a result of any breach of these warranties. This
                                    representations and warranties may be extended to third parties by International Journal of Environmental Pollution and Environmental Modelling.</p>

                            </Col>

                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3" className="text-right">
                                <CustomInput
                                    id="paper_approved"
                                    type="checkbox"
                                    checked={!!controller.state.paper_approved}
                                    onChange={a => controller.setState({paper_approved: a.currentTarget.checked ? 1 : 0})}
                                />
                            </Col>
                            <Col xs="12" md="9">
                                <Label htmlFor="text-input"> Yes, I agree to abide by the terms of the copyright statement.</Label>
                            </Col>
                        </FormGroup><FormGroup row>
                        <Col xs="12" md="3" className="text-right">
                            <CustomInput
                                id="paper_approved"
                                type="checkbox"
                                checked={!!controller.state.paper_approved}
                                onChange={a => controller.setState({paper_approved: a.currentTarget.checked ? 1 : 0})}
                            />
                        </Col>
                        <Col xs="12" md="9">
                            <Label htmlFor="text-input"> Yes, I agree to have my data collected and stored according to the privacy statement.

                            </Label>
                        </Col>
                    </FormGroup>
                        <Validator name="authors" type="required" value={(controller.state.authors || []).length ? 'a' : ''} controller={controller}>
                            <table className="table table-striped tablo">
                                <thead>
                                <tr>
                                    <th style={{width: '5%'}}>#</th>
                                    <th style={{width: '35%'}}>Mail</th>
                                    <th style={{width: '26%'}}>Name</th>
                                    <th style={{width: '26%'}}>Surname</th>
                                    <th style={{width: '8%'}}>Correspond</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {(controller.state.authors || []).map((author, index) => <>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Validator name="author.p_mail" type="required" value={author.p_mail} controller={controller}>
                                                <AuthorSelect
                                                    selected={author.p_mail}
                                                    onChange={value => {
                                                        if (value && value.name) {
                                                            author.name = value.name;
                                                            author.surname = value.surname;
                                                            author.adress = value.adress;
                                                        }

                                                        author.p_mail = value && (value.p_mail || value.label || value);
                                                        this.forceUpdate();
                                                    }}
                                                />
                                            </Validator>
                                        </td>
                                        <td>
                                            <Validator name="author.name" type="required" value={author.name} controller={controller}>
                                                <Input type="text" value={author.name} onChange={a => {
                                                    author.name = a.currentTarget.value;
                                                    this.forceUpdate();
                                                }}/>
                                            </Validator>
                                        </td>
                                        <td>
                                            <Validator name="author.surname" type="required" value={author.surname} controller={controller}>
                                                <Input type="text" value={author.surname} onChange={a => {
                                                    author.surname = a.currentTarget.value;
                                                    this.forceUpdate();
                                                }}/>
                                            </Validator>
                                        </td>
                                        <td>
                                            <Validator name="correspond" type="required"
                                                       value={(controller.state.authors || []).find(a => a.correspond) ? 'ok' : ''}
                                                       controller={controller}>
                                                <CustomInput
                                                    id={'correspond' + index}
                                                    type="radio"
                                                    checked={!!author.correspond}
                                                    onChange={_ => {
                                                        author.correspond = !author.correspond;

                                                        if (author.correspond) {
                                                            for (let _author of controller.state.authors) {
                                                                if (author !== _author) {
                                                                    _author.correspond = false;
                                                                }
                                                            }
                                                        }

                                                        this.forceUpdate();
                                                    }}
                                                />
                                            </Validator>
                                        </td>
                                        <td>
                                            <Button size="sm" outline color="danger"
                                                    onClick={_ => controller.setState({authors: controller.state.authors.filter(a => a !== author)})}>
                                                <i className="fa fa-trash"/>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="6">
                                            <Validator name="author.adress" type="required" value={author.adress} controller={controller}>
                                                <Input placeholder="Affiliation Adress" type="text" value={author.adress} onChange={a => {
                                                    author.adress = a.currentTarget.value;
                                                    this.forceUpdate();
                                                }}/>
                                            </Validator>
                                        </td>
                                    </tr>
                                </>)}
                                </tbody>
                            </table>
                        </Validator>
                        <Button color="primary" onClick={a => controller.setState({authors: (controller.state.authors || []).concat([{}])})}>Add
                            Author</Button>
                    </>
                }
            </CommonForm>
        );
    }
}
