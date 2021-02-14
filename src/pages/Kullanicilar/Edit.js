import React, {Component} from 'react';
import {
    Badge,
    Card,
    Input,
    CardBody,
    CardHeader,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table,
    InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, Label
} from 'reactstrap';

import CommonForm from '../../common/GenelForm';
import YetkiSelect from '../../common/YetkiSelect';
import TakipciSelect from '../../common/TakipciSelect';
import Validator from '../../common/Validator';

class Edit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CommonForm
                name="Kullanıcılar"
                url="/api/kullanicilar"
                id={this.props.match.params.id}
                {...this.props}
            >
                {
                    controller => <>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Kullanici Adı</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator
                                    name="name"
                                    type="required"
                                    controller={controller}>
                                    <Input type="text" value={controller.state.name}
                                           onChange={a => controller.setState({name: a.currentTarget.value})}/>
                                </Validator>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Mail Adresi *</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator
                                    name="email"
                                    type="required"
                                    controller={controller}>
                                    <Input type="text" value={controller.state.email}
                                           onChange={a => controller.setState({email: a.currentTarget.value})}/>
                                </Validator>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Ünvanı / Görevi *</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator
                                    name="unvan"
                                    type="required"
                                    controller={controller}>
                                    <Input type="text" value={controller.state.unvan}
                                           onChange={a => controller.setState({unvan: a.currentTarget.value})}/>
                                </Validator>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">İletişim No / GSM *</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator
                                    name="iletisim"
                                    type="required"
                                    controller={controller}>
                                    <Input type="text" value={controller.state.iletisim}
                                           onChange={a => controller.setState({iletisim: a.currentTarget.value})}/>
                                </Validator>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Takipçisi</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <TakipciSelect
                                    value={controller.state.id}
                                    cachedValue={controller.state.value}
                                    onChange={value => controller.setState({value: value})}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Yeni Şifre</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator
                                    name="tonaj"
                                    type="required"
                                    controller={controller}>
                                    <Input type="text" value={controller.state.tonaj}
                                           onChange={a => controller.setState({tonaj: a.currentTarget.value})}/>
                                </Validator>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Yetki</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <YetkiSelect
                                    value={controller.state.id}
                                    cachedValue={controller.state.value}
                                    onChange={value => controller.setState({value: value})}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Hakında Açıklama / Not :</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator
                                    name="aciklama"
                                    type="required"
                                    controller={controller}>
                                    <Input type="text" value={controller.state.aciklama}
                                           onChange={a => controller.setState({aciklama: a.currentTarget.value})}/>
                                </Validator>
                            </Col>
                        </FormGroup>
                    </>
                }
            </CommonForm>
        );
    }
}

export default Edit;

