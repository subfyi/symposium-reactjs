import React, {useCallback} from 'react';
import {UploadProvider, useAuth} from "react-admin-base";
import {ArrayBuffer} from 'spark-md5';

function computeChecksumMd5(file) {
    return new Promise<string>((resolve, reject) => {
        const chunkSize = 2097152; // Read in chunks of 2MB
        const spark = new ArrayBuffer();
        const fileReader = new FileReader();

        let cursor = 0; // current cursor in file

        fileReader.onerror = function() {
            reject('MD5 computation failed - error reading the file');
        };

        function processChunk(chunk_start) {
            const chunk_end = Math.min(file.size, chunk_start + chunkSize);
            fileReader.readAsArrayBuffer(file.slice(chunk_start, chunk_end));
        }

        fileReader.onload = function(e) {
            spark.append(e.target.result);
            cursor += chunkSize;

            if (cursor < file.size) {
                processChunk(cursor);
            } else {
                resolve(btoa(spark.end(true)));

                // If you prefer the hexdigest form (looking like
                // '7cf530335b8547945f1a48880bc421b2'), replace the above line with:
                // resolve(spark.end());
            }
        };

        processChunk(0);
    });
}

const fields = ['id', 'access_url', 'name', 'size'];

export default function UploadConfig({ children }) {
    const [ api ] = useAuth();

    const uploader = useCallback(async function(name, blob, contentType, abort, progress) {
        try {
            const hash = await computeChecksumMd5(blob);

            const ticketResponse = await api.tokenized.put('/file/' + encodeURIComponent(name) + '/start?hash=' + encodeURIComponent(hash));
            console.log(ticketResponse);
            if (ticketResponse.status === 201) {
                return ticketResponse.data;
            }

            const ticket = ticketResponse.data;
            await api.free.put(ticket.upload_url, blob, {
                headers: {
                    'Content-Type': contentType,
                    'x-ms-date': (new Date() as any).toGMTString(),
                    'x-ms-version': '2020-04-08',
                    'x-ms-blob-type': 'BlockBlob'
                },
                onUploadProgress: function(progressEvent) {
                    progress(progressEvent.loaded / progressEvent.total);
                },
                signal: abort
            });

            let data = await api.tokenized.delete(ticket.complete_url);

            return data.data;
        } catch (e) {
          //  if (!Axios.isCancel(e)) {
           //     console.error('Hata olustu, tekrar deneniyor..', e);
            //} else {
            console.error(e);
                console.log("Iptal edildi");
           // }

            throw e;
        }
    }, [ api ]);

    return <UploadProvider uploader={uploader} fields={fields}>
        { children }
    </UploadProvider>
}
