
import React, { useCallback } from 'react';
import {UploadProvider, useAuth} from "react-admin-base";
import Axios from "axios";

function cozunurluk_bul(blob) {
    return new Promise(function (resolve) {
        var img = document.createElement('img');
        img.onload = function () {
            resolve({width: img.width, height: img.height});
        };
        img.onerror = function () {
            resolve(null);
        };
        img.src = URL.createObjectURL(blob);
    });
}

function abortToAxiosAbort(abort) {
    return null;
    /*
    var cancelToken = Axios.CancelToken.source();
    abort.onabort = function() {
        console.log("iptal et caliti");
        cancelToken.cancel();
    };
    return cancelToken.token;
     */
}

export default function UploadConfig({ children }) {
    const [ api ] = useAuth();

    const uploader = useCallback(async function(name, blob, contentType, abort, progress) {
        abort = abortToAxiosAbort(abort);

        try {
            var form = new FormData();
            form.append("dosya", blob, name);

            if(contentType.indexOf("image/") !== 0) {
                var coz = await cozunurluk_bul(blob);
                if(coz) {
                    form.append("width", coz.width);
                    form.append("height", coz.height);
                }
            }

            var data = await api.tokenized.post('/api/upload', form, {
                onUploadProgress: progress && function(progressEvent) {
                    progress(progressEvent.loaded / progressEvent.total);
                },
                cancelToken: abort
            });

            let file = data.data;

            file.access_url = process.env.REACT_APP_ENDPOINT.replace(/\/$/,'') + data.data.access_url;

            return file;
        } catch(e) {
            if(!Axios.isCancel(e)) {
                console.error('Hata olustu, tekrar deneniyor..', e);

                throw e;
            } else {
                console.log("Iptal edildi");
            }

            throw e;
        }
    }, [ api ]);

    return <UploadProvider uploader={uploader}>
        { children }
    </UploadProvider>
}

