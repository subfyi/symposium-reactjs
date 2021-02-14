import React, {Component} from 'react';
import {Col,  FormGroup, Input, Label} from 'reactstrap';
import CommonForm from '../../common/GenelForm';
import {Validator} from 'react-admin-base-adminkit';
class Add extends Component {
    render() {
        return (
            <CommonForm
                name="menu.Providers"
                nameKey="name"
                nameSave="general.add_new"

                url="/api/keywords"
                redirect="/keywords"
                id={this.props.match.params.id}
                {...this.props}
            >
                {
                    controller => <>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Type</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator
                                    name="name"
                                    type="required"
                                    controller={controller}>
                                    <Input type="text"
                                           value={controller.state.type}
                                           onChange={a => controller.setState({type: a.currentTarget.value})}
                                    />
                                </Validator>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Name</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator
                                    name="name"
                                    type="required"
                                    controller={controller}>
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


