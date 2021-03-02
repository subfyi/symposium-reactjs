import React, {Component} from 'react';
import GenelForm from '../../common/GenelForm';
import AspectRatio from 'react-aspect-ratio';
import 'react-aspect-ratio/aspect-ratio.css';
import {Card, CardBody, CardHeader} from "reactstrap";



export default class AddPresentation extends Component {
    render() {
        return <>
            <GenelForm
                noCard
                noSave
                key={this.props.match.params.id || 0}
                url="/api/submission"
                id={this.props.match.params.id}
                {...this.props}
            >
                {
                   "sadasd"
                }
            </GenelForm>
        </>;
    }
}
