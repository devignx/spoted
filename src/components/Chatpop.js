import React, { useEffect } from "react";

const ChatPop = ({ message, state }) => {

    useEffect(()=> {
        setTimeout(()=> state(false), 5000)
    }, [])

    return(
        <div className="absolute right-10 bottom-24 w-1/4 h-fit p-2 bg-gray-500 rounded-lg">
            <h1>{message}</h1>
        </div>
    )
}

export default ChatPop;