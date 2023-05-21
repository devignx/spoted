import React, { useEffect } from "react";
import connection from '../webrtc';
import { useNavigate } from "react-router-dom";

const Video = () => {

    const navigate = useNavigate()

    const dc = connection.getDc()
    const conn = connection.getConn()

    dc.onmessage = e => {
        const data = JSON.parse(e.data)
        if(data.type === "clved"){
            navigate("/peer")
        }
    }

    const handleClose = () => {
        dc.send(JSON.stringify({
            type: "clved"
        }))
        navigate("/peer")
    }

    useEffect(()=> {
        connection.permission(conn)
    }, [conn])

    return(
        <div className="relative w-full h-screen p-2">
            <div className="w-full h-5/6">
                <video className="w-full h-full" id="remote" autoPlay playsInline/>
                <video className="absolute top-2 left-2 w-80 h-80" id="local" autoPlay playsInline/>
            </div>
            <div onClick={handleClose} className="hover:cursor-pointer w-full h-1/6">Close</div>
        </div>
    )
}

export default Video;