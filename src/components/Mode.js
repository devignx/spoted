import React, { useState, useRef } from 'react';
import {BsCameraVideoFill,BsFillMicFill} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSend,AiOutlinePlus } from 'react-icons/ai';
import ChatPop from './Chatpop';
import {IoMdNotifications} from 'react-icons/io'
import useStore from "../store/store";
import { BsSun, BsMoon } from 'react-icons/bs'
import {BiTransferAlt} from 'react-icons/bi'
import logob from '../assets/logo-b.svg'
import logow from '../assets/logo-w.svg'
import { RiHome3Fill } from 'react-icons/ri';
import {IoMdPeople} from 'react-icons/io'

const Mode = ({ dc }) => {

    const navigator = useNavigate();
    const { changeTheme, theme } = useStore((state) => ({changeTheme: state.changeTheme, theme: state.theme}))
    
    const [message, setMessage] = useState("")
    const [msg, setMsg] = useState("")
    const [ismsg, setImsg] = useState(false)
    const [mediaPopup, setMediaPopup] = useState(false)
    const [closePopup, setClosePopup] = useState(false);

    dc.onmessage = e => {
        const data = JSON.parse(e.data)
        if(data){
            if(data.type === "message"){
                setMsg(data.message)
                setImsg(true)
            }

            if(data.type === "govid"){
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

    const handleVideo = () => {
        dc.send(JSON.stringify({
            type: "govid"
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

    const fileInputRef = useRef(null);

    const handleAddButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileSelected = (e) => {
        // const selectedFile = e.target.files[0];
    };

    return (
        <div id='popup' className='anim z-[99999]'> 
        <div onClick={changeTheme} className="h-12 toppp w-12 hover:cursor-pointer fixed top-2 md:top-4 right-4 rounded-full flex items-center justify-center">
                {
                    theme === "light"?
                        <BsMoon/>
                    :
                        <BsSun/>
                }
        </div>
        <div className={`${closePopup ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 translate-y-full scale'} anim fixed toppp top-0 left-0 h-screen w-screen flex justify-center backhue items-center`}>
                
                {
                    theme=== 'light' ? 
                    <img className="w-[6rem] absolute top-6 md:top-8" alt='' src={logob} />
                    :
                    <img className="w-[6rem] absolute top-6 md:top-8" alt='' src={logow} />
                }

            <div className="rounded-xl text-center -mt-8">
                <p>Are you Sure to Disconnect?</p>
                <div className='flex gap-5 mt-4'>
                    <Link to='/' className="flex gap-2 mt-6 transition-all duration-300 ease-in-out bg-blue-500 text-white rounded-full justify-center items-center p-5 py-2">Yes, Go Home <RiHome3Fill/></Link>
                    <button onClick={close} className="flex gap-2 mt-6 transition-all duration-300 ease-in-out bg-blue-500 text-white rounded-full justify-center items-center p-5 py-2"> Find Others <IoMdPeople/></button>
                </div>
                <button onClick={()=>setClosePopup(false)} className="mx-auto block mt-8 opacity-50">nvm, Go back</button>
            </div>
        </div>

            <div className='relative backd '>
                <p className=' font-semibold text-center  text-sm mt-6 md:mt-16'>SPOT P2P Chat</p>
                <div className='p-12 anim mx-auto mt-4 md:mt-12 mb-36 text-center w-full md:w-1/2 rounded-lg backhue relative drop-shadow-xl'>
                    <div className='rale relative mx-auto w-fit'>
                        { ismsg ? 
                        
                        <div className='flex flex-col justify-center items-center gap-3'>
                            <div className='relative'>
                                <IoMdNotifications size='25px' />
                                <div className='w-2 h-2 rounded-full bg-red-500 absolute top-0 -right-0' ><br/></div>
                            </div>
                            Yay! New message from your peer
                        </div>
                        : 
                        ''}
                    </div>
                    <div className={`${ismsg ? 'hidden' : ''} anim flex flex-wrap gap-8`}>
                        <Link to = '/private' className='min-w-[7rem] grow  basis-1  flex flex-col gap-3 justify-center items-center h-[7rem] shadow-xl hover:bg-white anim hover:text-black text-xs rounded-2xl backd m-auto uppercase font-semibold'><BsFillMicFill color='#3b82f6' size='25px'/><p className='opacity-50'> Audio chat</p></Link>
                        <button onClick={handleVideo} className='min-w-[7rem] basis-1 grow flex flex-col gap-3 justify-center items-center h-[7rem] shadow-xl hover:bg-white anim hover:text-black text-xs rounded-2xl backd m-auto uppercase font-semibold'><BsCameraVideoFill color='#3b82f6' size='25px'/><p className='opacity-50'> Video Call</p></button>
                        <button onClick={handleFile} className='min-w-[7rem] basis-1 grow w-full flex flex-col gap-3 justify-center items-center h-[7rem] shadow-xl hover:bg-white anim hover:text-black text-xs rounded-2xl backd m-auto uppercase font-semibold'><BiTransferAlt color='#3b82f6' size='25px'/><p className='opacity-50'> File Transfer</p></button>
                        <button onClick={()=> setClosePopup(true)} className='p-2 px-4 md:px-6 whitespace-nowrap absolute border-2 bg-red-500 text-white scale-75 border-red-600 topppp backdrop-blur-xl text-xs centerh rounded-full -bottom-4'>Close connection</button>
                    </div>
                    <br/>
                    <div className={`${ismsg ? 'p-0' : 'p-5 '} md:mt-3 anim relative w-full md:min-w-1/2  mx-auto backd rounded-lg`}>
                    {
                        ismsg ? 
                        <ChatPop  message={msg} state={setImsg}/>
                        :
                        <div className='flex gap-1 opacity-40 justify-center items-center'>
                            {/* <RiMessage3Fill/>
                            <p className='opacity rale'>Inbox</p> */}
                            <div className="lds-ripple ml-3 block scale-50"></div>
                        </div>
                        
                    }
                    </div>
                </div>
                <div className="absolute bottom-0 w-full">
                    <div className='w-full flex items-center justify-center gap-4'>
                        <input value={message} onChange={(event) => setMessage(event.target.value)} type='text' className='outline-none bg-black/[.05] drop-shadow-xl m-auto text-lg fixed w-[94%] lg:w-[48%] mb-5 border-solid border-[1px] border-white/30 backdrop-blur-xl rounded-full bottom-0 px-5 py-3 md:py-4 ' placeholder='Type message'/>
                        <div className='fixed bottom-[2.2rem] md:bottom-[2.6rem] flex gap-4 md:gap-6 right-[10%] lg:right-[28%] '>
                            <button onClick={()=>{setMediaPopup(true); }}><AiOutlinePlus size='22px'/></button>
                            <button onClick={handleMessage} type='submit'><AiOutlineSend size='22px'/></button>
                        </div>
                    </div>
                </div>
                {
                    mediaPopup && 
                    <div className='p-8 top-0 fixed anim w-screen h-screen flex toppp justify-center items-center mx-auto  backdrop-blur-xl'>
                        <div className='w-11/12 relative md:w-1/2 topppp py-16 -mt-12 rounded-xl backd p-8 text-center shadow-xl'>
                            <p>Choose Files / drag & drop here</p>
                            <input
                                type="file"
                                className='mt-8 bg-white p-4 px-8'
                                style={{ display: 'none' }}
                                id='img'
                                ref={fileInputRef}
                                accept="image/png, image/jpeg, image/webp, image/heic, image/jpg"
                                onChange={handleFileSelected}
                            />
                            <button className='mt-8 flex items-center justify-center gap-2 mx-auto rounded-xl backhue bg-white p-4 px-8' onClick={handleAddButtonClick}>Add <button><AiOutlinePlus className='text-blue-500' size='22px'/></button></button>
                            <button onClick={()=>{setMediaPopup(false)}} className='mt-6 text-xs p-2 px-3 rounded-full absolute topppp -top-10 centerh text-white bg-red-500/50  border-2 border-red-500' >X</button>
                        </div>
                        <div onClick={()=> setMediaPopup(false)} className='w-screen cursor-context-menu h-screen toppp absolute' ></div>
                    </div>
                }

            </div>
        </div>
    );
};

export default Mode;
