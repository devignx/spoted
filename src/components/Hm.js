import React from "react";

const Home = ({ message }) => {
    return(
        
        <div className="bg-blue-500 text-lg p-4 w-fit my-2 mr-0 m-auto  rounded-[1.3rem] max-w-1/2 rounded-bl-none max-w-[70%] md:px-6 ">
            {/* <h1 className="text-xs mr-0 text-right w-full font-thin opacity-60">You •</h1> */}
            <h1 className="break-all">{message}</h1>
        </div>
    )
}

export default Home;