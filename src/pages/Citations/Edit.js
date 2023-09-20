import React, {Component} from 'react';
import {Col, FormGroup, Input, Label} from 'reactstrap';
import CommonForm from '../../components/GenelForm';

class Add extends Component {
    render() {
        return (
            <CommonForm
                name="menu.Providers"
                nameKey="name"
                nameSave="general.add_new"

                url="/api/citation"
                redirect="/citation"
                id={this.props.match.params.id}
                {...this.props}
            >
                {
                    controller => <>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">raw</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text"
                                       value={controller.state.raw}
                                       onChange={a => controller.setState({raw: a.currentTarget.value})}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Type</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text"
                                       value={controller.state.type}
                                       onChange={a => controller.setState({type: a.currentTarget.value})}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">order</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text"
                                       value={controller.state.order}
                                       onChange={a => controller.setState({order: a.currentTarget.value})}
                                />
                            </Col>
                        </FormGroup>
                    </>
                }
            </CommonForm>
        );
    }
}

export default Add;


