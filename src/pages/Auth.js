import React, { useEffect, useState } from "react";
import '../styles/Globals.css';
import Error from "../components/Error";
import { FiSettings } from 'react-icons/fi';
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import openConnection from "../websocket";
import axios from "axios";
import useStore from "../store/store";

const Auth = () => {

    const [error, setError] = useState(false)
    const [load, setLoad] = useState(false)
    const [na, setNa] = useState("")
    const [suc, setSuc] = useState(false)
    const navigate = useNavigate()

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
        <div className="relative w-full h-screen flex items-center justify-center">
            <Link to="/settings"><div className="absolute top-10 right-10 h-10 w-10 flex items-center justify-center shadow-lg rounded-lg">
                <FiSettings/>
            </div></Link>
            <div className="w-11/12 lg:w-1/3 h-1/2 shadow-xl backhue rounded-2xl">
                <form className="w-full h-full flex items-center flex-col gap-6 justify-center">
                    <input value={na} onChange={(event)=> setNa(event.target.value)} type="text" className="w-3/4 p-4 text-lg border border-gray-200 text-black rounded-lg outline-0" placeholder="Enter your username"/>
                    <button disabled={load} onClick={handleSubmit} className="bg-blue-500 w-3/4 py-4 text-white text-lg rounded-lg">Enter</button>
                </form>
            </div>
            {
                error && <Error retry={establishConnection}/>
            }
            {
                load && <Loader close={setLoad} state={suc}/>
            }
        </div>
    )
}

export default Auth;