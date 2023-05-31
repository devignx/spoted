import React, { useState } from "react";
import connection from '../webrtc';

const File = () => {

    const dc = connection.getDc()

    const [files, setFiles] = useState([])
    const [file, setFile] = useState()
    let is_file = true
    let storedArrayBuffer = [];

    function mergeArrayBuffers() {
        const totalLength = storedArrayBuffer.reduce((acc, arrayBuffer) => acc + arrayBuffer.byteLength, 0);
        const mergedArrayBuffer = new Uint8Array(totalLength);
        let offset = 0;
      
        for (const arrayBuffer of storedArrayBuffer) {
          const chunk = new Uint8Array(arrayBuffer);
          mergedArrayBuffer.set(chunk, offset);
          offset += chunk.byteLength;
        }
      
        return mergedArrayBuffer.buffer;
      }

    function convertArrayBufferToBlob(mimeType, merged) {
        const blob = new Blob([merged], { type: mimeType });
        return blob;
    }

    function saveBlob(blob, fileName) {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        link.click();
    }

    function sendFile(file) {
        const chunkSize = 16384;
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileData = event.target.result;
          let offset = 0;
          function sendChunk() {
            const chunk = fileData.slice(offset, offset + chunkSize);
            if (chunk.byteLength === 0) {
              console.log('File sent successfully');
              dc.send('EOF')
              return;
            }
            dc.send(chunk);
            offset += chunkSize;
            setTimeout(sendChunk, 100);
          }
          sendChunk()
        };
        reader.readAsArrayBuffer(file);
      }
    
    const changeHandler = (file) => {
        console.log(file.type)
        dc.send(JSON.stringify({
            type: 'meta',
            name: file.name,
            size: file.size,
            type: file.type
        }))
        if (file) {
            sendFile(file);
        }
    }

    dc.onmessage = e => {
        if(e.data === 'EOF'){
            console.log('file recieved successfully')
            let data = storedArrayBuffer.splice(0,1)
            console.log(storedArrayBuffer)
            data = JSON.parse(data[0])
            console.log(data)
            const merged = mergeArrayBuffers()
            const blob = convertArrayBufferToBlob(data.type, merged)
            saveBlob(blob, data.name)
            storedArrayBuffer = []
        }
        else{
            console.log(e.data)
            storedArrayBuffer.push(e.data)
        }
    };

    return (
        <div className="w-full h-screen">
            <input type="file" onChange={(e) => changeHandler(e.target.files[0])}/>
            <div>
                {
                    files.map((file, index) => <div key={index} className="w-full h-20 flex items-center justify-start gap-8">
                        <h1>{file.name}</h1>
                        <h1>{file.size}</h1>
                    </div>)
                }
            </div>
        </div>
    )
}

export default File;