import React, { useState } from 'react';
import {BsCameraVideoFill,BsFillMicFill, BsChatSquareTextFill} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSend } from 'react-icons/ai';
import ChatPop from './Chatpop';

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
        <div id='popup' className='fixed anim top-0 text-black w-full z-[99999]'> 
            <div className='relative flex w-full h-screen backd anim items-center justify-center'>
                <p className=' font-semibold absolute text-center text-sm top-12'>Welcome to <br/><span className='text-blue-500 text-lg'>SPOT P2P Chat</span></p>
                <div className='px-8 py-12 md:p-12 anim text-center w-full md:w-1/2 rounded-lg backhue relative drop-shadow-xl'>
                    <p className='font-semibold '>Choose your Mode</p>
                    <div className='flex flex-wrap gap-8 mt-8'>
                        <Link to = '/private' className='min-w-[7rem] md:min-w-[10rem] grow  basis-1  flex flex-col gap-3 justify-center items-center min-h-[7rem] md:min-h-[10rem] text-xs rounded-2xl backd m-auto uppercase font-semibold'><BsFillMicFill size='25px'/><p className='opacity-50'> Audio chat</p></Link>
                        <div onClick={handleVedeo} className='min-w-[7rem] md:min-w-[10rem] basis-1 grow flex flex-col gap-3 justify-center items-center min-h-[7rem] md:min-h-[10rem] text-xs rounded-2xl backd m-auto uppercase font-semibold'><BsCameraVideoFill size='25px'/><p className='opacity-50'> Video Call</p></div>
                        <div onClick={handleFile} className='min-w-[7rem] md:min-w-[10rem] basis-1 grow w-full flex flex-col gap-3 justify-center items-center min-h-[7rem] md:min-h-[10rem] text-xs rounded-2xl backd m-auto uppercase font-semibold'><BsChatSquareTextFill size='25px'/><p className='opacity-50'> Texting</p></div>
                        <button className='w-10 h-10 backd absolute border-2 border-red-600 centerh rounded-full font-semibold -bottom-5'>X</button>
                    </div>
                </div>
                {
                    ismsg && <ChatPop message={msg} state={setImsg}/>
                }
                <div className="absolute bottom-0 w-full h-20">
                    <form onClick={handleMessage} className='w-full h-full flex items-center justify-center gap-4'>
                        <input value={message} onChange={(event) => setMessage(event.target.value)} type='text' className='w-5/6 h-3/4 outline-0 bg-gray-500 rounded-lg p-4' placeholder='Type message'/>
                        <button type='submit' className='p-4 rounded-full bg-blue-500'><AiOutlineSend/></button>
                    </form>
                </div>
                <button onClick={close} className='absolute bottom-20 right-10'>
                    Close connection
                </button>
            </div>
        </div>
    );
};

export default Mode;
