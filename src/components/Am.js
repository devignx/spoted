import React from "react";

const Away = ({ message, sender }) => {
    return(
        <div className="bg-blue-500/20 text-lg p-4 w-fit my-2 rounded-[1.3rem] max-w-1/2 rounded-bl-none max-w-[70%] md:px-6 ">
            <h1 className="text-xs font-thin opacity-60">•&nbsp; {sender}</h1>
            <h1 className="break-all">{message}</h1>
        </div>
    )
}

export default Away;