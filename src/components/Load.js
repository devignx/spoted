import React, { useEffect } from "react";
import connection from '../webrtc'
import { useStore } from "zustand";

const Load = ({sender, socket, id}) => {

    useEffect(()=> {
        if(sender){
            connection.createOffer()
            setTimeout(() => {
                const reqObj = {
                    type: "offer",
                    sdp: connection.getLocalsdp(),
                    uid: id
                }
                socket.send(JSON.stringify(reqObj))
            }, 5000)
        }
    },[])

    socket.onmessage = (data) => {
        const response = JSON.parse(data.data)
        if(response.type === "offer"){
            connection.createAnswer(JSON.parse(response.sdp))
            setTimeout(()=> {
                const reqObj = {
                    type: "answer",
                    sdp: connection.getLocalsdp(),
                    uid: id
                }
                socket.send(JSON.stringify(reqObj))
            }, 5000)
        }

        if(response.type === "answer"){
            connection.remoteDes(JSON.parse(response.sdp))
        }
    }

    return(
        <div className="absolute top-0 w-full h-full bg-black z-[6]">
            <h1>load</h1>
        </div>
    )
}

export default Load;