import React, { Component } from 'react';

import prettysize from 'prettysize';
import fileDialog from 'file-dialog';

var photo_ext = ["pdf", "doc", "docx", "docx"];

function uzanti(isim) {
  var bol = isim.split('.');
  return isim[bol.length - 1];
}

function is_photo(uzanti) {
  return photo_ext.indexOf(uzanti);
}

export default class FilePickerCore extends Component {
  constructor(props) {
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    this.changing = true;
    this.props.controller.addListener(this.onUpdate);
    this.changing = false;
  }

  componentWillUnmount() {
    this.changing = true;
    this.props.controller.removeListener(this.onUpdate);
    this.changing = false;
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.controller !== this.props.controller) {
      this.changing = true;
      prevProps.controller.removeListener(this.onUpdate);
      this.props.controller.addListener(this.onUpdate);
      this.changing = false;

      this.forceUpdate();
    }
  }

  onUpdate() {
    if(this.changing)
      return;

    this.props.onNotify();
    this.forceUpdate();
  }

  async dosyaSec(e) {
    e.preventDefault();

    var dosyalar = await fileDialog({
      accept: this.props.accepts || 'application/msword,.docx,.pdf'
    });

    var dosya = dosyalar[0];

    if(dosya) {
      this.props.controller.upload(dosya.name, dosya.type, dosya);
    }
  }

  iptalEt(e) {
    e.preventDefault();

    this.props.controller.cancel();
  }

  sil(e) {
    e.preventDefault();

    this.props.controller.remove();
  }

  render() {
    var controller = this.props.controller;

    if(controller.$state === 1 && !this.props.disabled) { // dosya sec
      return <div className={this.props.className}>
        <a href="#" className="btn btn-primary btn-sm" onClick={this.dosyaSec.bind(this)}><i className="fa fa-upload" /> Choose File</a>
      </div>;
    } else if(controller.$state === 2 && !this.props.disabled) { // yukleniyor
      return <div className={this.props.className}>
        <a href="#" className="btn btn-outline-danger btn-sm" onClick={this.iptalEt.bind(this)}><i className="fa fa-times-circle" /></a>
        &nbsp;<a href="#" onClick={a => a.preventDefault()} className="btn btn-sm btn-outline-dark disabled">
        <i className="fa fa-spinner fa-spin" />
        <span style={{ width: '35px', display: 'inline-block' }}>{ Math.round(controller.$pr * 1000) / 10 }%</span>
        { controller.name }
      </a>
      </div>;
    } else if(controller.$state === 3) { // yuklendi
      console.log(controller);
      return <div className={this.props.className}>
        {!this.props.disabled && <a href="#" className="btn btn-outline-danger btn-sm" onClick={this.sil.bind(this)}><i className="fa fa-trash" /></a>}
        &nbsp;<a href={"https://api.iseser.com" + controller.$src} target="_blank" className="btn btn-sm btn-outline-primary"><i className="fa fa-download" /> { controller.name }</a>
        <span>&nbsp;({ prettysize(controller.$size) })</span>
      </div>;
    }

    if (this.props.disabled)
      return <div className={this.props.className}>
        Disabled
      </div>;

    return <div>Hata olustu</div>;
  }
}
