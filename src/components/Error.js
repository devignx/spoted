import React from "react";
import { BiErrorCircle } from 'react-icons/bi';

const Error = ({ retry }) => {
    return(
        <div className="my-4 w-fit m-auto flex gap-6 bg-red-600/30 py-3 px-6 rounded-full items-center justify-evenly">
            <BiErrorCircle size={'25px'} color="red"/>
            <h1>An error occured at our end please try again</h1>
            <button onClick={() => retry()} className="bg-white px-4 py-1 text-black rounded-lg">Retry</button>
        </div>
    )
}

export default Error;