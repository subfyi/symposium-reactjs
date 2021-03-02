
import UploadControllerFactory from 'upload-controller-factory';
import { tokenized } from '../api';
import Axios from 'axios';
import uuid from 'uuid/v1';

function cozunurluk_bul(blob) {
  return new Promise(function (resolve) {
    var img = document.createElement('img');
    img.onload = function () {
        resolve({width: img.width, height: img.height});
    };
    img.onerror = function () {
        resolve({});
    };
    img.src = URL.createObjectURL(blob);
  });
}

function abortToAxiosAbort(abort) {
  var cancelToken = Axios.CancelToken.source();
  abort.onabort = function() {
    console.log("iptal et caliti");
    cancelToken.cancel();
  };
  return cancelToken.token;
}

export default UploadControllerFactory({
  async uploader(name, blob, contentType, abort, progress) {
    abort = abortToAxiosAbort(abort);

    try {
      var form = new FormData();
      form.append("dosya", blob);
      
      var data = await tokenized.post('/upload', form, {
        onUploadProgress: function(progressEvent) {
          progress(progressEvent.loaded / progressEvent.total);
        },
        cancelToken: abort
      });

      return data.data;
    } catch(e) {
      if(!Axios.isCancel(e)) {
        console.error('Hata olustu, tekrar deneniyor..', e);
      } else {
        console.log("Iptal edildi");
      }

      throw e;
    }
  }
});
