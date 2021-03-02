import React, { Component } from 'react';
import { free, tokenized } from '../api';
import  axios from 'axios';
import AsyncSelect from 'react-select/async';

export default class ParameterSelect extends Component {
  constructor(props) {
    super(props);

    this.http = props.free ? free : tokenized;

    this.state = {

    };
  }

  async componentDidMount() {
    if(this.props.value) {
      var data;

      if(this.props.cachedValue && this.props.value == this.props.cachedValue.id) {
        data = this.props.cachedValue;
      } else {
        data = (await this.http.get(`/api/parameters${(this.props.ptur && `-${this.props.ptur}`) || ''}/${this.props.type}/${this.props.value}`)).data;
      }

      this.setState({ selected: ({ value: data.id, label: data.value }) });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if((prevProps.value !== this.props.value) && (!this.state.selected || this.props.value !== this.state.selected.value) && this.props.value) {
      var data;

      if(this.props.cachedValue && this.props.value == this.props.cachedValue.id) {
        data = this.props.cachedValue;
      } else {
        data = (await this.http.get(`/api/parameters${(this.props.ptur && `-${this.props.ptur}`) || ''}/${this.props.type}/${this.props.value}`)).data;
      }

      this.setState({ selected: ({ value: data.id, label: data.value }) });
    }
  }

  handleChange(param) {
    this.setState({ selected: param });
    this.props.onChange((param && param.value) || null);
  }

  async loadData(arama) {
    if(this.cancelToken) {
      this.cancelToken.cancel();
    }

    this.cancelToken = axios.CancelToken.source();

    var data = await this.http.get(`/api/parameters${(this.props.ptur && `-${this.props.ptur}`) || ''}/${this.props.type}`, { params: { query: arama }, cancelToken: this.cancelToken.token });
    return data.data.data
      .map(data => ({ value: data.id, label: data.value }));
  }

  render() {
    return <AsyncSelect  isDisabled={this.props.disabled} value={this.state.selected} onChange={this.handleChange.bind(this)} cacheOptions defaultOptions isClearable={true} loadOptions={this.loadData.bind(this)} />;
  }
}
