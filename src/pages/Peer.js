import React, { useEffect } from "react";
import connection from "../webrtc";

const Peer = () => {

    useEffect(()=> {
        connection()
    }, [])

    return (
        <div>
            <h1>peer to peer</h1>
        </div>
    )
}

export default Peer;