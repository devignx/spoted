import React from "react";
import { FiSettings } from 'react-icons/fi';
import { BsSun, BsMoon } from 'react-icons/bs'
import useStore from "../store/store";

const Settings = () => {

    const { changeTheme, theme } = useStore((state) => ({changeTheme: state.changeTheme, theme: state.theme}))

    return(
        <div className="w-full h-screen flex items-center justify-evenly flex-col gap-6">
            <div className="w-3/4 h-20 rounded-lg shadow-lg flex items-center justify-center gap-6">
                <FiSettings size="35px"/>
                <h1 className="text-xl font-bold">Settings</h1>
            </div>
            <div className="w-3/4 h-3/4 rounded-lg shadow-lg p-2 flex gap-6">
                <div className="w-1/4 h-full p-2 backhue rounded-lg">
                    <div className="w-full h-12 flex items-center justify-center rounded-lg hover:cursor-pointer hover:bg-blue-500 hover:text-white">
                        <h1 className="font-bold">Themes and Appearances</h1>
                    </div>
                </div>
                <div className="w-3/4 h-full flex items-center justify-center gap-6 flex-col p-2 backhue rounded-lg">
                    <h1 className="font-bold">Light theme</h1>
                    <div onClick={changeTheme} className="h-16 w-16 hover:cursor-pointer rounded-full flex items-center justify-center">
                        {
                            theme === "light"?
                                <BsMoon size="30px"/>
                            :
                                <BsSun size="30px"/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;