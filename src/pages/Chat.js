import { Link } from "react-router-dom";
import '../styles/Globals.css';
import useStore from "../store/store";

import { AiOutlineSend, AiOutlineHome } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';

const Chat = () => {

    return(
        <div className="">

            <div className="absolute hidden lg:inline">
                <Link to='/' className="flex gap-2 mt-4 mx-4 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white rounded-full  items-center p-5 py-2">Go Home <AiOutlineHome/></Link>
                <Link to='/room' className=" flex gap-2 mt-2 mx-4 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white rounded-full items-center p-5 py-2">People <BsPeople/></Link>
            </div>

            <section className=" h-screen" id='chat'>
                <div className="w-full lg:w-[50%] h-full backhue shadow-xl p-3 h-full  m-auto overflow-y-scroll">
                    <div className="w-full h-10/12">
                        <div className="flex relative flex-col mb-[6rem]">
                            <p className="bg-white/10 text-lg shadow-md p-3 w-fit my-2 rounded-full max-w-1/2 rounded-bl-none px-4">Recieved</p>
                            <p className="bg-blue-500 text-white shadow-md mr-0 m-auto text-lg p-3 w-fit my-2 rounded-full max-w-1/2 rounded-br-none px-4">Sent</p>
                            <p className="bg-white/10 text-lg shadow-md p-3 w-fit my-2 rounded-full max-w-1/2 rounded-bl-none px-4">Recieved</p>
                            <p className="bg-blue-500 text-white shadow-md mr-0 m-auto text-lg p-3 w-fit my-2 rounded-full max-w-1/2 rounded-br-none px-4">Sent</p>
                            <p className="bg-white/10 text-lg shadow-md p-3 w-fit my-2 rounded-full max-w-1/2 rounded-bl-none px-4">Recieved</p>
                            <p className="bg-blue-500 text-white shadow-md mr-0 m-auto text-lg p-3 w-fit my-2 rounded-full max-w-1/2 rounded-br-none px-4">Sent</p>
                            <p className="bg-white/10 text-lg shadow-md p-3 w-fit my-2 rounded-full max-w-1/2 rounded-bl-none px-4">Recieved</p>
                            <p className="bg-blue-500 text-white shadow-md mr-0 m-auto text-lg p-3 w-fit my-2 rounded-full max-w-1/2 rounded-br-none px-4">Sent</p>
                            <p className="bg-white/10 text-lg shadow-md p-3 w-fit my-2 rounded-full max-w-1/2 rounded-bl-none px-4">Recieved</p>
                            <p className="bg-blue-500 text-white shadow-md mr-0 m-auto text-lg p-3 w-fit my-2 rounded-full max-w-1/2 rounded-br-none px-4">Sent</p>
                            <p className="bg-white/10 text-lg shadow-md p-3 w-fit my-2 rounded-full max-w-1/2 rounded-bl-none px-4">Recieved</p>
                            <p className="bg-blue-500 text-white shadow-md mr-0 m-auto text-lg p-3 w-fit my-2 rounded-full max-w-1/2 rounded-br-none px-4">Sent</p>
                            <p className="bg-white/10 text-lg shadow-md p-3 w-fit my-2 rounded-full max-w-1/2 rounded-bl-none px-4">Recieved</p>
                            <p className="bg-blue-500 text-white shadow-md mr-0 m-auto text-lg p-3 w-fit my-2 rounded-full max-w-1/2 rounded-br-none px-4">Sent</p>
                            <p className="bg-white/10 text-lg shadow-md p-3 w-fit my-2 rounded-full max-w-1/2 rounded-bl-none px-4">Recieved</p>
                            <p className="bg-blue-500 text-white shadow-md mr-0 m-auto text-lg p-3 w-fit my-2 rounded-full max-w-1/2 rounded-br-none px-4">Sent</p>
                            <p className="bg-white/10 text-lg shadow-md p-3 w-fit my-2 rounded-full max-w-1/2 rounded-bl-none px-4">Recieved</p>
                            <p className="bg-blue-500 text-white shadow-md mr-0 m-auto text-lg p-3 w-fit my-2 rounded-full max-w-1/2 rounded-br-none px-4">Sent</p>
                            <p className="bg-white/10 text-lg shadow-md p-3 w-fit my-2 rounded-full max-w-1/2 rounded-bl-none px-4">Recieved</p>
                            <p className="bg-blue-500 text-white shadow-md mr-0 m-auto text-lg p-3 w-fit my-2 rounded-full max-w-1/2 rounded-br-none px-4">Sent</p>
                            <div className="fixed w-full  backdrop-blur-xl lg:w-1/2 -ml-3 bottom-0 h-[5rem] lg:h-[7rem] ">
                                <br></br>
                            </div>
                        </div>
                        <form className='relative m-auto'>
                            <input className='outline-none bg-black/[.05] drop-shadow-xl m-auto text-lg fixed w-[94%] lg:w-[48%] mb-5 border-solid border-[1px] border-white/30 backdrop-blur-xl rounded-full bottom-0 px-5 py-3 md:py-4 ' type="text" placeholder='Ask here'></input>
                            <AiOutlineSend className="fixed bottom-[2.5rem] lg:bottom-[2.7rem] right-[10%] lg:right-[28%] scale-[150%]"/> 
                        </form>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Chat;