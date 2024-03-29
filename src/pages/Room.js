import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { BsPerson, BsChat } from "react-icons/bs";
// import { FiSettings } from 'react-icons/fi';
import { Link } from "react-router-dom";
// import logo from '../assets/spotlogo.svg'   
import { BsSun, BsMoon } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai';
import {RxCross2} from 'react-icons/rx'
import {BiCheck} from 'react-icons/bi'
import ShareMenu from "../components/ShareMenu";
import {GiSadCrab} from 'react-icons/gi'
// import Mode from "../components/Mode";
import Load from "../components/Load";
import logob from '../assets/logo-b.svg'
import logow from '../assets/logo-w.svg'

const Room = () => {

    const [people, setPeople] = useState(true)
    const [load, setLoad] = useState(false)
    const [sender, setSender] = useState(false)
    const [closePopup, setClosePopup] = useState(false);

    const handleButtonText = (bool) => {
        if(bool){
            return "Withdraw";
        }
        else{
            return "Connect";
        }
    }

    const navigate = useNavigate();
    const { changeTheme, theme } = useStore((state) => ({changeTheme: state.changeTheme, theme: state.theme}))

    const { peerid, setPeerid, socket, name, disIp, ip, setPeers, peers, loged, setLoged, messages, setMessages, setRequests, requests } = useStore((state) => ({peerid: state.peerid, setPeerid: state.setPeerid, socket: state.socket, name: state.name, disIp: state.disIp, ip:state.ip, setPeers: state.setPeers, peers: state.peers, loged: state.loged, setLoged: state.setLoged, messages: state.messages, setMessages: state.setMessages, requests: state.requests, setRequests: state.setRequests}))

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
        if ( requests.length !== 0){
            setRequestPop(true);
        }
    },[ip, loged, name,navigate,requests.length, setLoged, socket])

    const [requestPop, setRequestPop] = useState(false);
    const handleAccept = (peer) => {
        setPeerid(peer.uid)
        setSender(false)
        setLoad(true)
        const reqObj = {
            type: 'accept',
            uid: peer.uid
        }
        socket.send(JSON.stringify(reqObj))
    }

    const handleDeny = (peer) => {
        const reqObj = {
            type: 'deny',
            uid: peer.uid
        }
        socket.send(JSON.stringify(reqObj))
    }

    const handlePress = (peer, index) => {
        const temp = peers
        if(temp[index].sent) {
            temp[index].sent = false
            withRequest(peer.uid)
        }
        else{
            temp[index].sent = true;
            sendRequest(peer)
        }
        setPeers([...temp])
    }

    const withRequest = (id) => {
        const req = {
            type: "withdraw",
            id: id
        }
        socket.send(JSON.stringify(req))
    }

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
            setRequests([...response.requests])
        }
        if(response.type === "deny"){
            const temp = peers
            temp.forEach(peer => {
                if(peer.uid === response.uid){
                    peer.sent = false
                }
            });
            setPeers([...temp])
        }

        if(response.type === 'accept'){
            setPeerid(response.id)
            setSender(true)
            setLoad(true)
        }
    }

    return(
        <div className="relative w-full backd h-screen">
            <div className="">
            {
            requests.length !== 0 && 
            requests.map((peer, index)=> <div key={index} className={`w-11/12 toppp md:w-1/2 mt-8 absolute anim ${requestPop ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 translate-y-full'} centerh shadow-xl`}>
                <div className="anim m-auto px-6 md:px-8 p-6 backhue font-semibold border-2 border-blue-500 rounded-lg mb-2 flex items-center justify-between w-full gap-4">
                    <div className="flex gap-3 items-center ">
                        <BsPerson className="w-8 h-8 p-2 bg-white border-[1.5px] border-blue-500/50 rounded-full" color="#000" size={"30px"}/> 
                        <h1>{peer.name}</h1>
                    </div>
                    <div className="flex gap-4 md:gap-7">
                        <div onClick={()=> {handleAccept(peer); setRequestPop(false);}} className="text-white font-thin cursor-pointer p-2 px-5 bg-blue-500 rounded-lg flex gap-2 items-center justify-center">
                            <button className="pclg">Accept</button><BiCheck/>
                        </div>
                        <div onClick={()=> {handleDeny(peer);setRequestPop(false);}} className="text-white font-thin text-sm cursor-pointer gap-2 p-2 px-5 bg-red-500 rounded-lg flex items-center justify-center">
                            <button className="pclg">Deny</button><RxCross2/>
                        </div>
                    </div>
                </div>
            </div>)
            }
            </div>
        <button onClick={()=>setClosePopup(true)} className="flex absolute top-24 left-4 pc gap-2 mt-4 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white rounded-full  items-center p-5 py-2">Go Home <AiOutlineHome/></button>
        <div className={`${closePopup ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 translate-y-full scale'} anim fixed toppp top-0 left-0 h-screen w-screen flex justify-center backhue items-center`}>
                
                {
                    theme=== 'light' ? 
                    <img className="w-[6rem] absolute top-6 md:top-8" alt="" src={logob} />
                    :
                    <img className="w-[6rem] absolute top-6 md:top-8" alt="" src={logow} />
                }

            <div className="rounded-xl -mt-8">
                <p>Are you Sure to Disconnect</p>
                <Link to='/' className="flex gap-2 mt-6 transition-all duration-300 ease-in-out bg-blue-500 text-white rounded-full justify-center items-center p-5 py-2">Yes, Go Home <AiOutlineHome/></Link>
                <button onClick={()=>setClosePopup(false)} className="mx-auto block mt-8 opacity-50">nvm, Go back</button>
            </div>
        </div>
            <div className="justify-between px-6 p-2 backhue flex items-center">
                
            {
                theme=== 'light' ? 
                <img className="w-[6rem]" alt="" src={logob} />
                :
                <img className="w-[6rem]" alt="" src={logow} />
            }
                
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
                        <h1>Group Chat</h1>
                    </Link>
                </div>
            </div>
            <div className="w-full h-5/6 flex flex-col items-center justify-center">
                
            <div className="flex w-full md:w-1/2 items-center justify-center">
                    <button onClick={()=> setPeople(true)} className={`lg:text-lg p-2 w-full px-8 ${people? 'drop-shadow-xl z-[1] border-t-2 border-blue-500': "opacity-50 border-blue-500/0"} transition-all duration-300 ease-in-out rounded-lg rounded-b-none rounded-tr-none pb-3 backhue`}>People ({peers.length})</button>
                    <button onClick={()=> setPeople(false)} className={`lg:text-lg p-2 w-full px-8 ${people? 'opacity-50 border-blue-500/0': "drop-shadow-xl z-[0]  border-t-2 border-blue-500"} transition-all duration-300 ease-in-out rounded-lg rounded-tl-none rounded-b-none pb-3 backhue`}>Requests <span className={`${requests.length===0 ? "bg-none": "bg-red-600 text-xs"} rounded-full text-white p-[3px] px-[7px]`}>{requests.length > 0 && `${requests.length}`}</span></button>
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
                                        <button onClick={()=> handlePress(peer, index)} className={`${peer.sent ? "bg-gray-500" : ""} font-thin text-white cursor-pointer p-2 px-5 bg-blue-500 rounded-lg flex items-center justify-center`}>
                                            {handleButtonText(peer.sent)}
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
                                            <div onClick={()=> handleAccept(peer)} className="text-white font-thin cursor-pointer p-2 px-5 bg-blue-500 rounded-lg flex gap-2 items-center justify-center">
                                                <button className="pclg">Accept</button><BiCheck/>
                                            </div>
                                            <div onClick={()=> handleDeny(peer)} className="text-white font-thin text-sm cursor-pointer gap-2 p-2 px-5 bg-red-500 rounded-lg flex items-center justify-center">
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
                    <h1 className="text-sm text-blue-500">{disIp}</h1>
            </abbr>
            {
                load && <Load sender={sender} socket={socket} id={peerid}/>
            }
        </div>
    )
}

export default Room;