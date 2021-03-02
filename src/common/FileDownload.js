import React, { Component } from 'react';

export default class FileDownload extends Component {
  render() {
    return this.props.value && <div className={this.props.className + " my-1"} >
      <a href={"https://api.iseser.com/uploads/dosya/" + this.props.value.f_klasorismi + "/" + this.props.value.f_dosyaisimi} target="_blank" className="btn btn-sm btn-outline-primary"><i className="fa fa-download" /> {this.props.label}</a>
    </div>;
  }
}
