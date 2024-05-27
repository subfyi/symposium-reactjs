import React from 'react';
import {Card, CardBody, Col, FormGroup, Input, Label, ModalBody} from "reactstrap";
import {useEntity} from "react-admin-base";
import {ModalEntityEditor, Validator} from 'react-admin-base-bootstrap';
import {FormattedMessage} from 'react-intl';

export default function RoleEntity({url, onReload, id}) {
    const entity = useEntity('/api/roles', id, {});
    const [data, setData] = entity;

    if (!data) {
        return null;
    }

    return <ModalEntityEditor size="xl" title="Role Management" url={url} onReload={onReload} entity={entity}>
        <ModalBody>
            <Card>
                <CardBody>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="text-input"><FormattedMessage id="role.role"/></Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Validator
                                name="name"
                                type="required"
                            >
                                <Input type="text" value={data.name}
                                       onChange={a => setData({name: a.currentTarget.value})}/>
                            </Validator>
                        </Col>
                    </FormGroup>
                </CardBody>
            </Card>
        </ModalBody>
    </ModalEntityEditor>;
}

