import React, { useEffect } from "react";
import connection from '../webrtc'
import { useNavigate } from "react-router-dom";
import Mode from "../components/Mode";

const Peer = () => {

    const conn = connection.getConn()
    const dc = connection.getDc()
    const navigate = useNavigate()

    return (
        <div>
            <Mode dc={dc}/>
        </div>
    )
}

export default Peer;