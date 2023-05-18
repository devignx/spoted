import React, { useState } from 'react';
import {BsCameraVideoFill,BsFillMicFill, BsChatSquareTextFill} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSend } from 'react-icons/ai';
import ChatPop from './Chatpop';
import {IoMdNotifications} from 'react-icons/io'

const Mode = ({ dc }) => {

    const navigator = useNavigate()
    
    const [message, setMessage] = useState("")
    const [msg, setMsg] = useState("")
    const [ismsg, setImsg] = useState(false)

    dc.onmessage = e => {
        const data = JSON.parse(e.data)
        if(data){
            if(data.type === "message"){
                setMsg(data.message)
                setImsg(true)
            }

            if(data.type === "goved"){
                navigator('/private')
            }

            if(data.type === "gofile"){
                navigator('/file')
            }
        }
    };

    dc.onclose = e => {
        navigator('/room')
    }

    const handleVedeo = () => {
        dc.send(JSON.stringify({
            type: "goved"
        }))
        navigator('/private')
    }

    const handleFile = () => {
        dc.send(JSON.stringify({
            type: "gofile"
        }))
        navigator('/file')
    }

    const handleMessage = (event) => {
        event.preventDefault()
        dc.send(JSON.stringify({
            type: "message",
            message: message
        }))
        setMessage("")
    }

    const close = () => {
        dc.close()
    }

    return (
        <div id='popup' className='anim text-black z-[99999]'> 
            <div className='relative backd '>
                <p className=' font-semibold text-center  text-sm mt-6 md:mt-16'>Welcome to <br/><span className='text-blue-500 text-lg'>SPOT P2P Chat</span></p>
                <div className='p-12 pb-16 anim mx-auto mt-4 md:mt-12 mb-36 text-center w-full md:w-1/2 rounded-lg backhue relative drop-shadow-xl'>
                    <div className='rale relative mx-auto w-fit'>
                        { ismsg ? 
                        
                        <div className='flex flex-col justify-center items-center gap-3'>
                            <div className='relative'>
                                <IoMdNotifications size='25px' />
                                <div className='w-2 h-2 rounded-full bg-red-500 absolute top-0 -right-0' ><br/></div>
                            </div>
                            Yay New message from your peer
                        </div>
                        : 
                        'Choose your Mode'}
                    </div>
                    <div className={`${ismsg ? 'hidden' : ''} anim flex flex-wrap gap-8 mt-8`}>
                        <Link to = '/private' className='min-w-[7rem] grow  basis-1  flex flex-col gap-3 justify-center items-center h-[7rem] text-xs rounded-2xl backd m-auto uppercase font-semibold'><BsFillMicFill size='25px'/><p className='opacity-50'> Audio chat</p></Link>
                        <div onClick={handleVedeo} className='min-w-[7rem] basis-1 grow flex flex-col gap-3 justify-center items-center h-[7rem] text-xs rounded-2xl backd m-auto uppercase font-semibold'><BsCameraVideoFill size='25px'/><p className='opacity-50'> Video Call</p></div>
                        <div onClick={handleFile} className='min-w-[7rem] basis-1 grow w-full flex flex-col gap-3 justify-center items-center h-[7rem] text-xs rounded-2xl backd m-auto uppercase font-semibold'><BsChatSquareTextFill size='25px'/><p className='opacity-50'> Texting</p></div>
                        <button onClick={close} className='p-2 px-4 md:px-6 shrink-0 whitespace-nowrap absolute border-2 bg-red-500/10 border-red-600 backdrop-blur-lg topppp centerh rounded-full font-semibold -bottom-5'>Close connection &nbsp; X</button>
                    </div>
                    <br/>
                    <div className={`${ismsg ? 'p-0' : 'p-3'} md:mt-6 anim relative w-full md:min-w-1/2  mx-auto backd rounded-full`}>
                    {
                        ismsg ? 
                        <ChatPop  message={msg} state={setImsg}/>
                        :
                        <div className='flex gap-5 justify-center'>
                            <p className='opacity-40 rale'>send / wait for a msg</p>
                            <div className="lds-ripple block scale-50"></div>
                        </div>
                        
                    }
                    </div>
                </div>
                <div className="absolute bottom-0 w-full h-20">
                    <form onClick={handleMessage} className='w-full h-full flex items-center justify-center gap-4'>
                        <input value={message} onChange={(event) => setMessage(event.target.value)} type='text' className='outline-none bg-black/[.05] drop-shadow-xl m-auto text-lg fixed w-[94%] lg:w-[48%] mb-5 border-solid border-[1px] border-white/30 backdrop-blur-xl rounded-full bottom-0 px-5 py-3 md:py-4 ' placeholder='Type message'/>
                        <button type='submit' className='fixed bottom-[2.5rem] lg:bottom-[2.7rem] right-[10%] lg:right-[28%] scale-[150%]'><AiOutlineSend/></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Mode;
