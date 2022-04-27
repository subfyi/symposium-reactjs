import React from 'react';
import {Card, CardBody, Col, FormGroup, Input, Label, Row} from "reactstrap";
import {useEntity} from "react-admin-base";
import {EntityEditor,Validator} from 'react-admin-base-bootstrap';
import {Breadcrumb} from "react-admin-base-nazox";
import {AuthoritySelect, ParameterSelect} from "../../common/Selects";

export default function Edit() {
    const entity = useEntity('/api/user', 'me');
    const [data, setData, loading, save] = entity;

    return <>
        <Breadcrumb
            title="Profile"
            data={
                [
                    {
                        href: '/profil',
                        name: 'Profile'
                    }
                ]
            }
        />
        <EntityEditor entity={entity}>
            <Card>
                <CardBody>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Name</Label>
                        </Col>
                        <Col xs="3" md="3">
                            <Validator
                                name="name"
                                type="required"
                            >
                                <Input type="text" value={data.name}
                                       onChange={a => setData({name: a.currentTarget.value})}/>
                            </Validator>
                        </Col>
                        <Col md="3">
                            <Label htmlFor="text-input">Surname</Label>
                        </Col>
                        <Col xs="3" md="3">
                            <Validator
                                name="surname"
                                type="required"
                            >
                                <Input type="text" value={data.surname}
                                       onChange={a => setData({surname: a.currentTarget.value})}/>
                            </Validator>
                        </Col>
                    </FormGroup>


                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">E-Mail Address</Label>
                        </Col>
                        <Col xs="3" md="3">
                            <Validator
                                name="email"
                                type="required"
                            >
                                <Input type="text" value={data.email}
                                       onChange={a => setData({email: a.currentTarget.value})}/>
                            </Validator>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="select">Title</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="u_title"
                                type="required"
                            >
                                <ParameterSelect
                                    type="titlecon"
                                    value={data.utitle}
                                    onChange={a => setData({utitle: a})}/>
                            </Validator>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="select">Type</Label>
                        </Col>
                        <Col xs="12" md="9">

                            <Validator
                                name="u_type"
                                type="required"
                            >
                                <ParameterSelect
                                    type="materialcon"
                                    value={data.utype}
                                    onChange={a => setData({utype: a})}
                                />
                            </Validator>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="select">Gender
                            </Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="gender"
                                type="required"
                            >
                                <ParameterSelect
                                    type="gender"
                                    value={data.ugender}
                                    onChange={a => setData({ugender: a})}/>
                            </Validator>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Institution</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="institution"
                                type="required"
                            >
                                <Input type="text" value={data.institution}
                                       onChange={a => setData({institution: a.currentTarget.value})}/>
                            </Validator>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Faculty</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="faculty"
                                type="required"
                            >
                                <Input type="text" value={data.faculty}
                                       onChange={a => setData({faculty: a.currentTarget.value})}/>
                            </Validator>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Department</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="department"
                                type="required"
                            >
                                <Input type="text" value={data.department}
                                       onChange={a => setData({department: a.currentTarget.value})}/>
                            </Validator>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Mobile / GSM </Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="iletisim"
                                type="required"
                            >
                                <Input type="text" value={data.iletisim}
                                       onChange={a => setData({iletisim: a.currentTarget.value})}/>
                            </Validator>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Password</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Input type="password" value={data.password}
                                   autocomplete="new-password"
                                   onChange={a => setData({password: a.currentTarget.value})}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Address :</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="address"
                                type="required"
                            >
                                <Input type="text" value={data.address}
                                       onChange={a => setData({address: a.currentTarget.value})}/>
                            </Validator>
                        </Col>
                    </FormGroup>

                </CardBody>
            </Card>
        </EntityEditor>
    </>;
}
