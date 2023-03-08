import React from "react";
import '../styles/Loader.css';
import { TiTickOutline } from 'react-icons/ti';

const Loader = ({ state }) => {

    return(
        <div className="absolute bottom-10 left-10 px-8 py-2 flex items-center justify-center gap-6 shadow-lg rounded-lg">
            {
                state? <div className="w-full h-full flex items-center justify-evenly">
                        <TiTickOutline size={'25px'} color="green"/>
                        <h1>Connection established</h1>
                    </div> 
                :
                    <div className="w-full h-full flex items-center justify-evenly">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                        <h1>Establishing Connection...</h1>
                    </div>
            }
        </div>
    )
}

export default Loader;