import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { BsPerson, BsChat } from "react-icons/bs";
import { FiSettings } from 'react-icons/fi';
import { Link } from "react-router-dom";
import logo from '../assets/spotlogo.svg'   
import { BsSun, BsMoon } from 'react-icons/bs'

const Room = () => {

    const navigate = useNavigate();
    const { changeTheme, theme } = useStore((state) => ({changeTheme: state.changeTheme, theme: state.theme}))

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
            <div className="justify-center flex backhue items-center">
                <div className="w-full p-6 flex  items-center justify-center gap-4">
                <img className="w-[6rem] absolute left-4 top-0 pc mix-blend-difference" src={logo} />
                    <h1 className="text-xl font-bold">{name}</h1>
                    <h1 className="text-xl font-bold text-blue-500">{ip}</h1>
                </div>
                <Link to='/settings' className="p-4 right-6 md:right-12 m-auto absolute"><FiSettings size='20px'/></Link>
                <div onClick={changeTheme} className="h-12 w-12 hover:cursor-pointer rounded-full flex items-center justify-center">
                        {
                            theme === "light"?
                                <BsMoon/>
                            :
                                <BsSun/>
                        }
                </div>
            </div>
            <Link to='/chat' className="mt-6 rounded-lg m-auto top-12 right-24 text-white w-11/12 md:w-fit p-4 px-6 bg-blue-500 flex items-center justify-center gap-3">
                <BsChat size={'20px'}/>
                <h1>Live Chat</h1>
            </Link>
            <div className="w-full h-5/6 flex items-center justify-center">
                <div className="w-full md:w-1/2 h-5/6 backhue rounded-lg p-4 overflow-scroll overflow-x-hidden">
                    {
                        peers.map((peer, index)=> <div key={index} className="w-full mb-4">
                            <div className=" m-auto px-6 md:px-12 p-6 bg-blue-500/20 font-semibold rounded-lg mb-2 flex items-center justify-between w-full gap-4">
                                <div className="flex gap-3 items-center ">
                                    <BsPerson className="w-8 h-8 p-2 bg-white border-[1.5px] border-blue-500/50 rounded-full" color="#000" size={"30px"}/> 
                                    <h1>{peer.name}</h1>
                                </div>
                                <div className=" text-white cursor-pointer p-3 px-5 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <h1>Connect</h1>
                                </div>
                            </div>
                            
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Room;