import React from 'react';

import { hatagoster, tokenized } from '../api';
import { Label, Input, CustomInput, Row, Col } from 'reactstrap';

var cached = {};

const getParameters = (type, filter) => cached[type+":"+(filter && filter.uygrup)] || (cached[type+":"+(filter && filter.uygrup)] = tokenized.get('/api/parameters-nar/' + type, { params: { itemPerPage: -1, ...(filter || {}) }}));

var number = 0;

export default class MultiParameterListSelect extends React.Component {
    state = {};

    componentWillMount() {
      this.number = ++number;
    }
    
    async componentDidMount() {
      var parameters = await getParameters(this.props.type, this.props.filter); //tokenized.get('/api/parameters-nar/' + this.props.type, { params: { itemPerPage: -1, ...(this.props.filter || {}) }});

      this.setState({
        parameters: parameters.data.data
      });
    }

    async componentDidUpdate(prevProps) {
      if(prevProps.type !== this.props.type || (this.props.filter && this.props.filter.uygrup) !== (prevProps.filter && prevProps.filter.uygrup)) {
        await this.componentDidMount();
      }
    }

    click(parameter) {
      var selected = this.props.selected.indexOf(parameter.id) !== -1;

      if(selected) {
        this.props.onChange( this.props.selected.filter(a => a !== parameter.id) );
      } else {
        this.props.onChange( this.props.selected.concat([parameter.id]) );
      }
    }
 
    render() {
        if(!this.state.parameters)
          return null;

        if(this.props.col) {
          return <Row>
            {this.state.parameters.map(param => <Col md={ 12 / this.props.col }>
              <CustomInput
                id={'param_' + this.number + '_' + param.id}
                type="checkbox"
                checked={ this.props.selected.indexOf(param.id) !== -1 }
                onChange={this.click.bind(this, param)}
                label={<>{ param.value }</>}
              />
            </Col>)}
          </Row>;
        }

        return <ul>
          {this.state.parameters.map(param => <li key={param.id}>
            <CustomInput
              id={'param_' + this.number + '_' + param.id}
              type="checkbox"
              checked={ this.props.selected.indexOf(param.id) !== -1 }
              onChange={this.click.bind(this, param)}
              label={<>{ param.value }</>}
            />
          </li>)}
        </ul>;
    }
}
