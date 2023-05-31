import { Link } from "react-router-dom";
import '../styles/Globals.css';
import useStore from "../store/store";
import { useNavigate } from "react-router-dom";
import { AiOutlineSend } from 'react-icons/ai';
import { useEffect, useState } from "react";
import Home from "../components/Hm";
import Away from "../components/Am";
import { BsSun, BsMoon } from 'react-icons/bs'
import logob from '../assets/logo-b.svg'
import logow from '../assets/logo-w.svg'
import { RiHome3Fill } from 'react-icons/ri';
import {IoMdPeople} from 'react-icons/io'

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
    
    const [closePopup, setClosePopup] = useState(false);

    useEffect(()=> {
        if(socket === null){
            navigate('/');
        }
    }, [])

    return(
        <div className="">

            <div className="absolute hidden lg:inline">
                
                {
                    theme=== 'light' ? 
                    <img className="w-[6rem] ml-8 m-4 " alt='' src={logob} />
                    :
                    <img className="w-[6rem] ml-8 m-4 " alt='' src={logow} />
                }
                <button onClick={()=> setClosePopup(true)} className="flex gap-2 mt-4 mx-4 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white rounded-full  items-center p-5 py-2">←  Exit </button>
            </div>
            
            <Link to='/' className="flex fixed top-0 z-[99999] centerh mob shrink-0 gap-2 mt-4 transition-all duration-300 ease-in-out bg-blue-500 hover:text-white rounded-full  items-center p-5 py-2">Go Home <RiHome3Fill/></Link>
            
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

            <div className={`${closePopup ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 translate-y-full scale'} anim fixed toppp top-0 left-0 h-screen w-screen flex justify-center backhue items-center`}>
                
                {
                    theme=== 'light' ? 
                    <img className="w-[6rem] absolute top-6 md:top-8" alt='' src={logob} />
                    :
                    <img className="w-[6rem] absolute top-6 md:top-8" alt='' src={logow} />
                }

            <div className="rounded-xl text-center -mt-8">
                <p>Are you Sure to Leave?</p>
                <div className='flex gap-5 mt-4'>
                    <Link to='/' className="flex gap-2 mt-6 transition-all duration-300 ease-in-out bg-blue-500 text-white rounded-full justify-center items-center p-5 py-2">Yes, Go Home <RiHome3Fill/></Link>
                    <Link to='/room' className="flex gap-2 mt-6 transition-all duration-300 ease-in-out bg-blue-500 text-white rounded-full justify-center items-center p-5 py-2"> Find People <IoMdPeople/></Link>
                </div>
                <button onClick={()=>setClosePopup(false)} className="mx-auto block mt-8 opacity-50">nvm, Go back</button>
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
                            <AiOutlineSend onClick={handleSubmit} className="fixed cursor-pointer bottom-[2.5rem] lg:bottom-[2.7rem] right-[10%] lg:right-[28%] scale-[150%]"/> 
                        </form>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Chat;