import React, { useEffect } from "react";
import connection from '../webrtc'
// import { useStore } from "zustand";
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
    })

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
        <div className="absolute top-0 w-full topppp backhue">
            <div className="w-full h-screen flex flex-col gap-12 justify-center items-center">
                <div className="lds-ripple block scale-150"></div>
                <p className="opacity-70 mt-6 text-sm text-center">Hang on!</p>
                <p className="-mt-10 opacity-50 text-xs">Fun Fact: Your Peer is also staring at the screen like you</p>
            </div>
        </div>
    )
}

export default Load;