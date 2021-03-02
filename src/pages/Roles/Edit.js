import React, {Component} from 'react';
import {FormattedMessage} from "react-intl";
import {Col, FormGroup, Input, Label} from 'reactstrap';
import CommonForm from '../../common/GenelForm';
import {Validator} from 'react-admin-base-adminkit';

class Add extends Component {
    render() {
        return (
            <CommonForm
                name="menu.Roles"
                nameKey="name"

                url="/api/roles"
                redirect="/roles"
                id={this.props.match.params.id}
                {...this.props}
            >
                {
                    controller => <>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input"><FormattedMessage id="role.role"/></Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator
                                    name="name"
                                    type="required"
                                >
                                    <Input type="text"
                                           value={controller.state.name}
                                           onChange={a => controller.setState({name: a.currentTarget.value})}
                                    />
                                </Validator>
                            </Col>
                        </FormGroup>
                    </>
                }
            </CommonForm>
        );
    }
}

export default Add;

