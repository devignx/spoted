import React, { useState } from "react";
import connection from '../webrtc';

const File = () => {

    const dc = connection.getDc()

    const [files, setFiles] = useState([])
    const [file, setFile] = useState()

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
    }

    function base64ToFile(base64String, fileName) {
        return new Promise((resolve, reject) => {
          fetch(`data:application/octet-stream;base64,${base64String}`)
            .then(response => response.blob())
            .then(data => {
              const file = new File([data], fileName, { type: data.type });
              resolve(file);
            })
            .catch(error => {
              reject(error);
            });
        });
      }
    
    const changeHandler = async (file) => {
        console.log(file)
        fileToBase64(file[0])
        .then((data) => {
            const payload = {
                type: 'meta',
                name: file[0].name,
                size: file[0].size,
            }
            dc.send(JSON.stringify(payload))
        })
    }

    dc.onmessage = e => {
        const data = JSON.parse(e.data)
        console.log(e.data)
        if(data){
            if(data.type === "meta"){
                const temp = files
                temp.push(data)
                setFiles([...temp])
            }

            if(data.type === 'EOF'){
                console.log('end')
            }
        }
    };

    return (
        <div className="w-full h-screen">
            <input type="file" onChange={(e) => changeHandler(e.target.files)}/>
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