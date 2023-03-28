import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { BsPerson, BsChat } from "react-icons/bs";
import { FiSettings } from 'react-icons/fi';
import { Link } from "react-router-dom";
import logo from '../assets/spotlogo.svg'   
import { BsSun, BsMoon } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai';
import {RxCross2} from 'react-icons/rx'
import {BiCheck} from 'react-icons/bi'
import ShareMenu from "../components/ShareMenu";
import {GiSadCrab} from 'react-icons/gi'
import Mode from "../components/Mode";

const Room = () => {

    const [people, setPeople] = useState(true)
    const [connect, setConnect] = useState(false)   
    const [buttonText, setButtonText] = useState("Connect")

    const handleButtonText = () => {
        if(connect==false){
            setButtonText("Withdraw");
        }
        else{
            setButtonText("Connect");
        }
    }

    const navigate = useNavigate();
    const { changeTheme, theme } = useStore((state) => ({changeTheme: state.changeTheme, theme: state.theme}))

    const { socket, name, ip, setPeers, peers, loged, setLoged, messages, setMessages, setRequests, requests } = useStore((state) => ({socket: state.socket, name: state.name, ip: state.ip, setPeers: state.setPeers, peers: state.peers, loged: state.loged, setLoged: state.setLoged, messages: state.messages, setMessages: state.setMessages, requests: state.requests, setRequests: state.setRequests}))

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

    const sendRequest = (data) => {
        const req = {
            type: 'request',
            data: data
        }
        socket.send(JSON.stringify(req))
    }

    socket.onmessage = (data) => {
        const response = JSON.parse(data.data)
        if(response.type === "peerlist"){
            setPeers([...response.peers])
        }
        if(response.type === "message"){
            setMessages([...messages, response])
        }
        if(response.type === "request"){
            setRequests([...requests, response])
        }
    }

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
                
            <div className="flex w-full md:w-1/2 items-center justify-center">
                    <button onClick={()=> setPeople(true)} className={`lg:text-lg p-2 w-full px-8 ${people? 'drop-shadow-xl z-[1]': "opacity-50"} transition-all duration-300 ease-in-out rounded-lg rounded-b-none rounded-tr-none pb-3 backhue`}>People ({peers.length})</button>
                    <button onClick={()=> setPeople(false)} className={`lg:text-lg p-2 w-full px-8 ${people? 'opacity-50': "drop-shadow-xl z-[0]"} transition-all duration-300 ease-in-out rounded-lg rounded-tl-none rounded-b-none pb-3 backhue`}>Requests <span className={`${requests.length==0 ? "bg-none": "bg-red-600 text-xs"} rounded-full text-white p-[3px] px-[7px]`}>{requests.length > 0 && `${requests.length}`}</span></button>
                </div>
                <div className="w-full z-[4] md:w-1/2 h-5/6 backhue rounded-lg rounded-t-none transition-all duration-300 ease-in-out p-4 overflow-scroll overflow-x-hidden">
                    {   
                        
                        people?
                            peers.length !== 0 ?
                                peers.map((peer, index)=> <div key={index} className="w-full mb-4">
                                    <div className="anim m-auto px-6 md:px-12 p-6 bg-blue-500/10 font-semibold rounded-lg mb-2 flex items-center justify-between w-full gap-4">
                                        <div className="flex max-w-[60%] gap-3 shrink-0 items-center ">
                                            <BsPerson className="w-8 shrink-0 h-8 p-2 bg-white border-[1.5px] border-blue-500/50 rounded-full" color="#000" size={"30px"}/> 
                                            <h1 className=" break-all text-sm font-normal">{peer.name}</h1>
                                        </div>
                                        <button onClick={()=> { sendRequest(peer); setConnect(!connect); handleButtonText(); }} className={`${connect ? "bg-gray-500" : ""} font-thin text-white cursor-pointer p-2 px-5 bg-blue-500 rounded-lg flex items-center justify-center`}>
                                            {buttonText}
                                        </button>
                                    </div>

                                </div>)
                            :
                                <div className="w-full scale-[80%] md:scale-[100%] h-5/6 flex flex-col text-center justify-center items-center rale uppercase">
                                    <GiSadCrab className="opacity-20" size="8rem" />
                                    <p className="opacity-20 text-xl">You're the only one here</p>
                                    <p className="text-[0.7rem] opacity-60 tracking-widest mt-2">Try Inviting your friends to your Network</p>
                                    <button><ShareMenu/></button>
                                </div>
                        :
                            requests.length !== 0?
                                requests.map((peer, index)=> <div key={index} className="w-full mb-4">
                                    <div className="anim m-auto px-6 md:px-8 p-6 bg-blue-500/10 font-semibold rounded-lg mb-2 flex items-center justify-between w-full gap-4">
                                        <div className="flex gap-3 items-center ">
                                            <BsPerson className="w-8 h-8 p-2 bg-white border-[1.5px] border-blue-500/50 rounded-full" color="#000" size={"30px"}/> 
                                            <h1>{peer.name}</h1>
                                        </div>
                                        <div className="flex gap-4 md:gap-7">
                                            <div className=" text-white font-thin cursor-pointer p-2 px-5 bg-blue-500 rounded-lg flex gap-2 items-center justify-center">
                                                <h1 className="pclg">Accept</h1><BiCheck/>
                                            </div>
                                            <div className=" text-white font-thin text-sm cursor-pointer gap-2 p-2 px-5 bg-red-500 rounded-lg flex items-center justify-center">
                                                <button className="pclg">Deny</button><RxCross2/>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            :
                                <div className="w-full scale-[80%] md:scale-[100%] h-5/6 flex flex-col text-center justify-center items-center rale uppercase">
                                    <GiSadCrab className="opacity-20" size="8rem" />
                                    <p className="opacity-20 text-xl">You dont have any request</p>
                                </div>
                    }
                </div>
            </div>
            <abbr title="Your Public IP Adress" className=" absolute backd z-[9999]  p-2 rounded centerh bottom-4 flex justify-start gap-4">
                    <h1 className="text-sm shrink-0 uppercase">{name}</h1>
                    <h1 className="text-sm text-blue-500">{ip}</h1>
            </abbr>
            {
                !connect ? ""
            :   
                <Mode/>}
        </div>
    )
}

export default Room;