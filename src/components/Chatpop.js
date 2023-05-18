import React, { useEffect } from "react";

const ChatPop = ({ message, state }) => {

    useEffect(()=> {
        setTimeout(()=> state(false), 15000)
    }, [])

    return(
        <div className="bg-blue-500 text-white shadow-md text-lg p-3 my-2 w-full rounded-[1rem] px-4">
            <h1 className="strict-wrap break-words">{message}</h1>
        </div>
    )
}

export default ChatPop;