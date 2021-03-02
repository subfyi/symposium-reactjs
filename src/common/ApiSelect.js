import axios from 'axios';
import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import { tokenized } from '../api';

export default class ApiSelect extends Component {
  handleChange(param) {
    this.props.onChange(param);
  }

  async loadData(arama) {
    if(this.cancelToken) {
      this.cancelToken.cancel();
    }

    this.cancelToken = axios.CancelToken.source();

    var data = await tokenized.get(this.props.url, { params: { query: arama }, cancelToken: this.cancelToken.token });
    return data.data.data
        .map(data => ({ id: data.id, value: data.id, label: data.name, ...data }));
  }

  render() {
    return <AsyncSelect placeholder={this.props.placeholder} value={this.props.selected && !this.props.selected.label ? ({id: this.props.selected.id, value: this.props.selected.id, label: this.props.selected.name}) : this.props.selected} onChange={this.handleChange.bind(this)} cacheOptions defaultOptions isClearable={true} loadOptions={this.loadData.bind(this)} />;
  }
}
