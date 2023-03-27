import React, { useEffect, useState } from "react";
import '../styles/Globals.css';
import Error from "../components/Error";
import { FiSettings } from 'react-icons/fi';
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import openConnection from "../websocket";
import axios from "axios";
import useStore from "../store/store";
import logo from '../assets/spotlogo.svg'
import { BsSun, BsMoon } from 'react-icons/bs'
import BrowserChecker from "../components/BrowserChecker";

const Auth = () => {

    
    const [error, setError] = useState(false)
    const [load, setLoad] = useState(false)
    const [na, setNa] = useState("")
    const [suc, setSuc] = useState(false)
    const navigate = useNavigate()
    const { changeTheme, theme } = useStore((state) => ({changeTheme: state.changeTheme, theme: state.theme}))

    const { setSocket, socket, setIp, setName } = useStore((state) => ({setSocket: state.setSocket, socket: state.socket, ip: state.ip, setIp: state.setIp, setName: state.setName}))

    const establishConnection = () => {
        setError(false)
        setLoad(true)
        const socket = openConnection();
        socket.then((sock) => {
            axios.get("https://api.ipify.org/?format=json")
            .then(res => {
                if(res.status === 200){
                    setSuc(true)
                    setTimeout(()=> {
                        setLoad(false)
                    }, 3000)
                    const arr = res.data.ip.split('.')
                    setIp(`${arr[0]}.${arr[1]}.${arr[2]}`)
                    setSocket(sock)
                }
                else{
                    setError(true)
                }
            })
            .catch(()=> {
                setLoad(false)
                setError(true)
            })
        })
        .catch(()=> {
            setLoad(false)
            setError(true)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setName(na)
        navigate('/room')
    }

    useEffect(()=> {
        if(socket === null){
            establishConnection();
        }
        else{
            navigate('/room')
        }
    }, [])

    return(
        <div>
            <div className="relative w-full h-screen flex items-center justify-center">
                <div className="absolute top-10 right-10 scale-[120%] flex flex-col gap-6 items-center justify-center">
                    {/* <Link to="/settings"><div className="">
                        <FiSettings/>
                    </div></Link> */}
                    <div onClick={changeTheme} className="h-12 pc w-12 hover:cursor-pointer rounded-full flex items-center justify-center">
                            {
                                theme === "light"?
                                    <BsMoon/>
                                :
                                    <BsSun/>
                            }
                    </div>
                </div>
                <img className="w-[8rem] absolute top-4 mix-blend-difference" src={logo} />
                <div className="w-11/12 lg:w-1/3 h-1/2 rounded-2xl">
                    <form className="w-full h-full flex items-center flex-col gap-6 justify-center">
                        <input required value={na} onChange={(event)=> setNa(event.target.value)}  name="name" autoComplete="true" className="w-3/4 p-3 px-4 md:p-4 text-lg backhue transition-all duration-300 ease-in-out focus:drop-shadow-xl rounded-lg outline-0" autoFocus placeholder="Enter your username"/>
                        <button disabled={load} onClick={handleSubmit} className="bg-blue-500 opacity-50 w-3/4 uppercase tracking-widest p-3 md:p-4 text-white text-lg rounded-lg">Enter</button>
                    </form>
                </div>
            </div>
            <div className="m-auto backhue absolute bottom-0 w-full text-sm py-6 text-center">
                {
                    error && <Error retry={establishConnection}/>
                }
                {
                    load && <Loader close={setLoad} state={suc}/>
                }
                <h3 className="tracking-widest">FUN TIPS</h3>
                <p className="mt-2 w-10/12 m-auto opacity-60">Use usernames that are funny to make chats funnier, like Naai Sekar, Pattaasu Balu, Maatu ravi etc..</p>
            </div>    
            {/* <div className="m-auto flex flex-wrap w-full font-semibold justify-center items-center p-3 gap-4 mt-3">
                    <a href="" className="p-2 px-4 rounded-lg text-sm uppercase">Project Details</a>
                    <Link to='/why' className="p-2 px-4 rounded-lg text-sm uppercase">About</Link>
                    <a href="" className="p-2 px-4 rounded-lg text-sm uppercase">Developer Contact</a>
                </div> */}
        </div>
    )
}

export default Auth;