import React, { useEffect } from "react";
import connection from '../webrtc'
import { useNavigate } from "react-router-dom";

const Peer = () => {

    const conn = connection.getConn()
    const dc = connection.getDc()
    const navigate = useNavigate()

    dc.onclose = e => {
        navigate('/room')
    }

    useEffect(()=> {
        console.log(dc)
    }, [])

    return (
        <div>
            <h1>peer to peer</h1>
        </div>
    )
}

export default Peer;