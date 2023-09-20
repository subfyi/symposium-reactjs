import React, {Component} from 'react';
import {Col, FormGroup, Input, Label} from 'reactstrap';
import CommonForm from '../../components/GenelForm';
import {Validator} from 'react-admin-base-bootstrap';
import Switch from "@material-ui/core/Switch";
import {ParameterSelect} from "../../components/Selects";

class Add extends Component {
    render() {
        return (
            <CommonForm
                name="menu.shipping"
                nameKey="name"
                nameSave="general.add_new"

                url="/api/typepresentation"
                redirect="/typepresentation"
                id={this.props.match.params.id}
                {...this.props}
            >
                {
                    controller => <>
                        <FormGroup row>
                            <Col md="3" className="align-self-center">
                                <Label htmlFor="text-input">Active</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Switch
                                    checked={!!controller.state.active}
                                    onChange={a => controller.setState({active: !controller.state.active})}
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Type</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Validator type="required" name="lang" controller={controller}>
                                    <ParameterSelect
                                        type="uygulamacon"
                                        value={controller.state.lang}
                                        onChange={a => controller.setState({lang: a})}
                                    />
                                </Validator>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Value</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text"
                                       value={controller.state.name}
                                       onChange={a => controller.setState({name: a.currentTarget.value})}
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

