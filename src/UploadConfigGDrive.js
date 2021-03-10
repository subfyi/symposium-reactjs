
import React, { useCallback } from 'react';
import {UploadProvider, useAuth} from "react-admin-base";
import Axios from "axios";
import { v4 as uuidv4 } from 'uuid';

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

var fdosyasira = 0;

export default function UploadConfigGDrive({ children }) {
    const [ api ] = useAuth();

    const uploader = useCallback(async function(name, blob, contentType, abort, progress) {
        abort = abortToAxiosAbort(abort);

        var fsira = ++fdosyasira;

        abort = abortToAxiosAbort(abort);

        try {
            var slug = uuidv4();

            var uploadResponse = await api.tokenized.post('/api/gupload', {
                slug: slug,
                filename: name,
                contentType: contentType
            }, {
                cancelToken: abort
            });

            var data = uploadResponse.data;

            await api.tokenized.put(data.upload_link, blob, {
                onUploadProgress: function(progressEvent) {
                    progress(progressEvent.loaded / progressEvent.total);
                },
                cancelToken: abort
            });

            var size = null;

            if (contentType.indexOf("image/") === 0) {
                size = await cozunurluk_bul(blob);
            }

            var uploadBitirResponse = await api.tokenized.post('/api/guploadbitti', {
                file_id: data.file_id,
                folder_id: data.folder_id,
                realfilename: name,
                filename: data.filename,
                slug: slug,
                width: (size && size.width) || null,
                height: (size && size.height) || null,
                sira: fsira,
            }, {
                cancelToken: abort
            });

            return uploadBitirResponse.data;
        } catch(e) {
            if(!Axios.isCancel(e)) {
                console.error('Hata olustu, tekrar deneniyor..', e);
                //  return uploader(name, blob, contentType, abort, progress);
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

