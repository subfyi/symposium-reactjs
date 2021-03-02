import React from 'react';
import {EntityEditor} from 'react-admin-base-adminkit';
import {Card, CardBody, Col, Input, Label, Row} from "reactstrap";
import {useEntity} from "react-admin-base";
import {Breadcrumb} from 'react-admin-base-adminkit';
import {Redirect} from 'react-router-dom';
import {Validator} from 'react-admin-base-adminkit';
import {useUser} from "../../Components/UserProvider";
import {AuthoritySelect} from "../../common/Selects";


export default function EditCreate({match}) {
    const id = match.params.id;

    const user = useUser();
    const entity = useEntity('/api/user', id, { type: user.type });
    const [data, setData] = entity;

    if (!data) {
        return null;
    }

    return <Breadcrumb
        title="Kullanıcılar"
        data={
            [
                {
                    href: '/user',
                    name: 'Kullanıcılar'
                },
                data.id && {
                    href: '/user/' + data.id,
                    name: data.first_name
                },
                !data.id && {
                    href: '/user/create',
                    name: 'Ekle'
                }
            ]
        }
    >
        { data && data.id && +id !== +data.id && <Redirect to={"/user/" + data.id}/> }
        <EntityEditor entity={entity}>
            <Card>
                <CardBody>
                <Row className="mb-3">
                        <Col md="2">
                            <Label htmlFor="text-input">name</Label>
                        </Col>
                        <Col md="4">
                            <Validator name="name" type="required">
                                <Input
                                    type="text"
                                    value={data.name}
                                    onChange={a => setData({name: a.currentTarget.value})}
                                />
                            </Validator>
                        </Col>
                        <Col md="2">
                            <Label htmlFor="text-input">surname</Label>
                        </Col>
                        <Col md="4">
                            <Validator name="surname" type="required">
                                <Input
                                    type="text"
                                    value={data.surname}
                                    onChange={a => setData({surname: a.currentTarget.value})}
                                />
                            </Validator>
                        </Col>

                </Row>
                    <Row className="mb-3">
                        <Col md="2">
                            <Label htmlFor="text-input">email</Label>
                        </Col>
                        <Col md="10">
                            <Validator name="email" type="required">
                                <Input type="text" value={data.email}
                                       onChange={a => setData({email: a.currentTarget.value})}/>
                            </Validator>
                        </Col>

                    </Row>
                    <Row className="mb-3">
                        <Col md="2">
                            <Label htmlFor="text-input">password</Label>
                        </Col>
                        <Col md="10">
                            <Input
                                type="password"
                                value={data.password}
                                autocomplete="new-password"
                                onChange={a => setData({password: a.currentTarget.value})}
                            />
                        </Col>
                    </Row>

                    { user.yetki > 8 && <Row>
                        <Col md="3">
                            <Label htmlFor="text-input">Role</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="role"
                                type="required"
                            >
                                <AuthoritySelect
                                    url="/api/roles"
                                    value={data.role}
                                    onChange={a => setData({role: a})}
                                />
                            </Validator>
                        </Col>
                    </Row>}


                </CardBody>
            </Card>
        </EntityEditor>
    </Breadcrumb>;
}
