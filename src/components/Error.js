import React from "react";
import { BiErrorCircle } from 'react-icons/bi';

const Error = ({ retry }) => {
    return(
        <div className="absolute bottom-10 w-3/4 lg:w-2/4 h-fit flex flex-col lg:flex-row items-center justify-center gap-6 shadow-lg rounded-lg p-4">
            <BiErrorCircle size={'25px'} color="red"/>
            <h1>An error occured at our end please try again</h1>
            <button onClick={() => retry()} className="bg-blue-500 px-6 py-2 text-white rounded-lg">Retry</button>
        </div>
    )
}

export default Error;