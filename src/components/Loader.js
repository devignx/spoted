import React from "react";
import '../styles/Loader.css';
import { TiTick } from 'react-icons/ti';

const Loader = ({ state }) => {

    return(
        <div className="my-6 mt-3 flex items-center w-fit m-auto justify-center gap-6">
            {
                state? <div className="w-full h-full transition-all duration-300 ease-in-out flex gap-2 bg-green-600/20 py-2 px-4 rounded-full items-center justify-evenly">
                        <TiTick size={'25px'} color="green"/>
                        <h1>Connection established</h1>
                    </div> 
                :
                    <div className="w-full h-full flex flex-col gap-6 m-auto py-2 px-4 rounded-full items-center justify-evenly">
                        <div className="lds-ripple block"></div>
                        <h1 className="opacity-60 text-xs">Establishing Connection</h1>
                    </div>
            }
        </div>
    )
}

export default Loader;