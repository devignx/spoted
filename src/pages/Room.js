import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { BsPerson, BsChat } from "react-icons/bs";
import { FiSettings } from 'react-icons/fi';
import { Link } from "react-router-dom";
import logo from '../assets/spotlogo.svg'   
import { BsSun, BsMoon } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai';

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
    const reqs =2;

    return(
        <div className="relative w-full backd h-screen">
        <Link to='/' className="flex absolute top-24 left-4 pc gap-2 mt-4 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white rounded-full  items-center p-5 py-2">Go Home <AiOutlineHome/></Link>
            <div className="justify-between px-6 p-2 backhue flex items-center">
                <img className="w-[6rem] mix-blend-difference" src={logo} />
                
                <div className="flex gap-6 items-center">
                    {/* <Link to='/settings' className="p-4 right-6 md:right-12 m-auto absolute"><FiSettings size='20px'/></Link> */}
                    <div onClick={changeTheme} className="h-12 w-12 hover:cursor-pointer rounded-full flex items-center justify-center">
                            {
                                theme === "light"?
                                    <BsMoon/>
                                :
                                    <BsSun/>
                            }
                    </div>
                    <Link to='/chat' className=" rounded-lg shrink-0 text-white p-3 px-6 bg-blue-500 flex items-center justify-center gap-2">
                        <BsChat size={'20px'}/>
                        <h1>Live Chat</h1>
                    </Link>
                </div>
            </div>
            <div className="w-full h-5/6 flex flex-col items-center justify-center">
                
            <div className="flex w-1/2 items-center justify-center ">
                    <button className="text-lg p-2 w-full px-8 rounded-lg rounded-b-none rounded-tr-none pb-3 backhue ">People</button>
                    <button className="text-lg p-2 w-full px-8 opacity-50 rounded-lg rounded-tl-none rounded-b-none pb-3 backhue">Requests <span className="bg-red-600 rounded-full p-1 px-2 text-xs">{reqs}</span></button>
                </div>
                <div className="w-full md:w-1/2 h-5/6 backhue rounded-lg rounded-t-none p-4 overflow-scroll overflow-x-hidden">
                    {
                        peers.map((peer, index)=> <div key={index} className="w-full mb-4">
                            <div className=" m-auto px-6 md:px-12 p-6 bg-blue-500/10 font-semibold rounded-lg mb-2 flex items-center justify-between w-full gap-4">
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
            <div className=" absolute backd z-[9999] p-2 rounded centerh bottom-4 flex justify-start gap-4">
                    <h1 className="text-sm uppercase">{name}</h1>
                    <h1 className="text-sm text-blue-500">{ip}</h1>
            </div>
        </div>
    )
}

export default Room;