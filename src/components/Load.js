import React, { useEffect } from "react";
import connection from '../webrtc'
import { useStore } from "zustand";
import { useNavigate } from "react-router-dom";

const Load = ({sender, socket, id}) => {

    const navigate = useNavigate()

    const error = () => {
        const reqObj = {
            type: "error",
            uid: id
        }
        socket.send(JSON.stringify(reqObj))
    }

    useEffect(()=> {
        if(sender){
            if(connection.createOffer()){
                setTimeout(() => {
                    const reqObj = {
                        type: "offer",
                        sdp: connection.getLocalsdp(),
                        uid: id
                    }
                    socket.send(JSON.stringify(reqObj))
                }, 5000)
            }
            else{
                error()
            }
        }
    },[])

    socket.onmessage = (data) => {
        const response = JSON.parse(data.data)
        if(response.type === "offer"){
            if(connection.createAnswer(JSON.parse(response.sdp))){
                setTimeout(()=> {
                    const reqObj = {
                        type: "answer",
                        sdp: connection.getLocalsdp(),
                        uid: id
                    }
                    socket.send(JSON.stringify(reqObj))
                }, 5000)
            }
            else{
                error()
            }
        }

        if(response.type === "answer"){
            if(connection.remoteDes(JSON.parse(response.sdp))){
                socket.send(JSON.stringify({
                    type: "success",
                    uid: id
                }))
            }
            else{
                error()
            }
        }

        if(response.type === "error"){
            navigate("/room")
        }

        if(response.type === "success"){
            setTimeout(()=> {
                navigate('/peer')
            }, 5000)
        }
    }

    return(
        <div className="absolute top-0 w-full h-full bg-black z-[6]">
            <h1>load</h1>
        </div>
    )
}

export default Load;