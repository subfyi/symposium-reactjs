import React, { Component } from 'react';

import { tokenized } from '../api';
import  axios from 'axios';

import AsyncSelect from 'react-select/async-creatable';

export default class MultiParameterSelect extends Component {
  async handleChange(param) {
    this.setState({ selected: param });
    this.props.onChange((param && param.map(a => a.label)) || null);
  }

  async loadData(arama) {
    if(arama.length === 0)
      return [];

    if(this.cancelToken) {
      this.cancelToken.cancel();
    }

    this.cancelToken = axios.CancelToken.source();

    var data = await tokenized.get(`/api/parameters${(this.props.ptur && `-${this.props.ptur}`) || ''}/${this.props.type}`, { params: { query: arama }, cancelToken: this.cancelToken.token });
    return data.data.data
      .map(data => ({ value: data.id, label: data.value }));
  }

  render() {
    return <AsyncSelect isMulti value={this.props.selected} onChange={this.handleChange.bind(this)} cacheOptions defaultOptions isClearable={true} loadOptions={this.loadData.bind(this)} />;
  }
}
