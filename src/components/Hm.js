import React from "react";

const Home = ({ message }) => {
    return(
        <div>
            <h1 className="bg-blue-500 text-white shadow-md mr-0 m-auto text-lg p-3 w-fit my-2 rounded-full max-w-1/2 rounded-br-none px-4">{message}</h1>
        </div>
    )
}

export default Home;