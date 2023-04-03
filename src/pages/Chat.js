import { Link } from "react-router-dom";
import '../styles/Globals.css';
import useStore from "../store/store";
import { useNavigate } from "react-router-dom";
import { AiOutlineSend, AiOutlineHome } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { useEffect, useState } from "react";
import Home from "../components/Hm";
import Away from "../components/Am";
import logo from '../assets/spotlogo.svg'
import { FiSettings } from 'react-icons/fi';
import { BsSun, BsMoon } from 'react-icons/bs'

const Chat = () => {
    const navigate = useNavigate();
    const { socket, name, ip, setPeers, peers, loged, setLoged, messages, setMessages } = useStore((state) => ({socket: state.socket, name: state.name, ip: state.ip, setPeers: state.setPeers, peers: state.peers, loged: state.loged, setLoged: state.setLoged, messages: state.messages, setMessages: state.setMessages}))

    const [arrmsg, setArrmsg] = useState(messages)
    const [mess, setMess] = useState("")
    const { changeTheme, theme } = useStore((state) => ({changeTheme: state.changeTheme, theme: state.theme}))

    const handleSubmit = (event) => {
        event.preventDefault();
        const msg= {
            type: "message",
            from: "hm",
            message: mess
        }
        setMessages([...messages, msg])
        socket.send(JSON.stringify({
            type: "message",
            from: "am",
            name: name,
            message: mess
        }))
        setMess("")
    }

    socket.onmessage = (data) => {
        const response = JSON.parse(data.data)
        if(response.type === "peerlist"){
            setPeers([...response.peers])
        }
        if(response.type === "message"){
            setMessages([...messages, response])
            console.log(response)
            console.log('i am running')
            console.log(messages)
        }
    }

    useEffect(()=> {
        if(socket === null){
            navigate('/');
        }
    }, [])

    return(
        <div className="">

            <div className="absolute hidden lg:inline">
                <img className="w-[8rem] ml-8 m-4 mix-blend-difference" src={logo} />
                <Link to='/' className="flex gap-2 mt-4 mx-4 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white rounded-full  items-center p-5 py-2">Go Home <AiOutlineHome/></Link>
                <Link to='/room' className=" flex gap-2 mt-2 mx-4 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white rounded-full items-center p-5 py-2">People <BsPeople/></Link>
            </div>
            
            <Link to='/' className="flex fixed top-0 z-[99999] centerh mob shrink-0 gap-2 mt-4 transition-all duration-300 ease-in-out bg-blue-500 hover:text-white rounded-full  items-center p-5 py-2">Go Home <AiOutlineHome/></Link>
            
            <div className="absolute top-10 right-10 scale-[120%] flex flex-col gap-6 items-center justify-center">
                {/* <Link to="/settings"><div className="">
                    <FiSettings/>
                </div></Link> */}
                <div onClick={changeTheme} className="h-12 w-12 pc hover:cursor-pointer rounded-full flex items-center justify-center">
                        {
                            theme === "light"?
                                <BsMoon/>
                            :
                                <BsSun/>
                        }
                </div>
            </div>

            <section className=" h-screen" id='chat'>
                <div className="w-full lg:w-[50%] h-full backhue shadow-xl p-3 m-auto overflow-y-scroll">
                    <div className="w-full h-10/12">
                        <div className="flex relative flex-col mb-[6rem]">
                            {

                                messages.map((message, index) => 
                                    message.from === "am"?<Away key={index} message={message.message} sender={message.name}/>
                                :
                                    <Home key={index} message={message.message}/>    
                                )
                            }
                        </div>
                        <form className='relative m-auto' onSubmit={handleSubmit}>
                            <input onChange={(event)=> setMess(event.target.value)} value={mess} className='outline-none bg-black/[.05] drop-shadow-xl m-auto text-lg fixed w-[94%] lg:w-[48%] mb-5 border-solid border-[1px] border-white/30 backdrop-blur-xl rounded-full bottom-0 px-5 py-3 md:py-4 ' type="text" placeholder='Ask here'></input>
                            <AiOutlineSend className="fixed bottom-[2.5rem] lg:bottom-[2.7rem] right-[10%] lg:right-[28%] scale-[150%]"/> 
                        </form>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Chat;