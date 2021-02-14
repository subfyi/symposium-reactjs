import React from 'react';
import {Card, CardBody, Col, Input, Label, Row} from "reactstrap";
import {useEntity} from "react-admin-base";
import {Breadcrumb, EntityEditor, Validator} from 'react-admin-base-adminkit';
import {FormattedMessage} from "react-intl";

export default function Edit() {
    const entity = useEntity('/api/user', 'me');
    const [data, setData] = entity;

    return <>
        <Breadcrumb
            title=<FormattedMessage id="menu.Profile"/>
        data={
        [
            {
                href: '/api/profil',
                name: <FormattedMessage id="menu.Profile"/>
            }
        ]
    }
        />
        <EntityEditor entity={entity}>
            <Card>
                <CardBody>
                    <Row className="mb-3">
                        <Col md="2">
                            <Label htmlFor="text-input"><FormattedMessage id="users.Name"/></Label>
                        </Col>
                        <Col md="10">
                            <Validator name="name" type="required">
                                <Input
                                    type="text"
                                    value={data.name}
                                    onChange={a => setData({name: a.currentTarget.value})}
                                />
                            </Validator>
                        </Col>

                    </Row>
                    <Row className="mb-3">
                        <Col md="2">
                            <Label htmlFor="text-input"><FormattedMessage id="users.Mail"/></Label>
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
                            <Label htmlFor="text-input"><FormattedMessage id="users.password"/></Label>
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
                </CardBody>
            </Card>
        </EntityEditor>
    </>;
}
