import React from "react";

const Away = ({ message, sender }) => {
    return(
        <div className="bg-white/10 text-lg shadow-md p-3 w-fit my-2 rounded-full max-w-1/2 rounded-bl-none max-x-10/12 px-4 md:px-6 ">
            <h1 className="text-xs font-thin opacity-60">{sender}</h1>
            <h1>{message}</h1>
        </div>
    )
}

export default Away;