import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { BsPerson } from "react-icons/bs";

const Room = () => {

    const navigate = useNavigate();
    const [peers, setPeers] = useState([])

    const { socket, name, ip } = useStore((state) => ({socket: state.socket, name: state.name, ip: state.ip}))

    useEffect(()=> {
        if(socket === null){
            navigate('/');
        }
        const payload = {
            type: "init",
            name: name,
            ip: ip
        }
        socket.send(JSON.stringify(payload))
        socket.onmessage = (data) => {
            const response = JSON.parse(data.data)
            console.log(response)
            if(response.type === "peerlist"){
                setPeers([...response.peers])
            }
        }
    },[])

    return(
        <div className="w-full h-screen">
            <div className="w-full h-1/6 flex items-center justify-center gap-8">
                <h1 className="text-xl font-bold">{name}</h1>
                <h1 className="text-xl font-bold text-blue-500">{ip}</h1>
            </div>
            <div className="w-full h-5/6 flex items-center justify-center">
                <div className="w-3/4 h-5/6 backhue rounded-lg p-2 overflow-scroll overflow-x-hidden">
                    {
                        peers.map((peer, index)=> <div key={index} className="w-full h-40 mb-4">
                            <div className="w-full h-4/6 bg-blue-500 rounded-lg mb-2 flex flex-col items-center justify-center gap-4">
                                <BsPerson size={"30px"}/> 
                                <h1>{peer.name}</h1>
                            </div>
                            <div className="w-full h-2/6 bg-blue-500 rounded-lg flex items-center justify-center">
                                <h1>Connect</h1>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Room;