import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { BsPerson, BsChat } from "react-icons/bs";
import { FiSettings } from 'react-icons/fi';
import { Link } from "react-router-dom";

const Room = () => {

    const navigate = useNavigate();

    const { socket, name, ip, setPeers, peers, loged, setLoged, messages, setMessages } = useStore((state) => ({socket: state.socket, name: state.name, ip: state.ip, setPeers: state.setPeers, peers: state.peers, loged: state.loged, setLoged: state.setLoged, messages: state.messages, setMessages: state.setMessages}))

    useEffect(()=> {
        if(socket === null){
            navigate('/');
        }
        if(!loged){
            const payload = {
                type: "init",
                name: name,
                ip: ip
            }
            socket.send(JSON.stringify(payload))
            setLoged(true)
        }
    },[])

    socket.onmessage = (data) => {
        const response = JSON.parse(data.data)
        if(response.type === "peerlist"){
            setPeers([...response.peers])
        }
        if(response.type === "message"){
            setMessages([...messages, response])
        }
    }

    return(
        <div className="relative w-full h-screen">
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
            <Link to="/chat"><div className="absolute rounded-lg top-4 right-4 w-1/6 h-16 bg-blue-500 flex items-center justify-center gap-6">
                <BsChat size={'30px'}/>
                <h1>Live Chat</h1>
            </div></Link>
            <Link to="/settings">
                <div className="absolute rounded-lg bottom-4 right-4 h-10 w-10 flex items-center justify-center shadow-lg">
                    <FiSettings/>
                </div>
            </Link>
        </div>
    )
}

export default Room;