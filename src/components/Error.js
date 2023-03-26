import React from "react";
import { BiErrorCircle } from 'react-icons/bi';

const Error = ({ retry }) => {
    return(
        <div className="my-4 mb-6 w-fit m-auto flex gap-4 bg-red-600/30 py-3 px-6 rounded-full items-center justify-evenly">
            <BiErrorCircle size={'25px'} color="red"/>
            <h1 className=" text-sm">An error occured, Please try again</h1>
            <button onClick={() => retry()} className="bg-red-500 px-4 py-1 text-white text-semibold rounded">Retry</button>
        </div>
    )
}

export default Error;