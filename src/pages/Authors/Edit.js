import React from 'react';
import {Card, CardBody, Col, FormGroup, Input, Label} from "reactstrap";
import {useEntity} from "react-admin-base";
import {EntityEditor} from 'react-admin-base-bootstrap';
import {Breadcrumb} from "react-admin-base-front";
import {Validator} from 'react-admin-base-bootstrap';
import {useUser} from "../../Components/UserProvider";

export default function EditCreate({match}) {
    const id = match.params.id;

    const user = useUser();
    const entity = useEntity('/api/author', id, { role: user.role });
    const [data, setData] = entity;

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
                                <Input type="text" value={data.first_name}
                                       onChange={a => setData({first_name: a.currentTarget.value})}/>
                            </Validator>
                        </Col>
                    </FormGroup>


                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input">Surname</Label>
                        </Col>
                        <Col xs="3" md="3">
                            <Validator
                                name="surname"
                                type="required"
                            >
                                <Input type="text" value={data.last_name}
                                       onChange={a => setData({last_name: a.currentTarget.value})}/>
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
                </CardBody>
            </Card>
        </EntityEditor>
    </>;
}
