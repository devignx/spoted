import React from 'react';
import {BsCameraVideoFill,BsFillMicFill, BsChatSquareTextFill} from 'react-icons/bs'
import { Link } from 'react-router-dom';
const Mode = () => {

    const handlePopup = () => {
        document.getElementById('popup').classList.toggle('hidden');
    }
  return (
    <div id='popup' className='fixed anim top-0 text-black w-full z-[99999]'> 
        <div className='flex w-full h-screen backd anim items-center justify-center'>
            <p className=' font-semibold absolute text-center text-sm top-12'>Welcome to <br/><span className='text-blue-500 text-lg'>SPOT P2P Chat</span></p>
            <div className='px-8 py-12 md:p-12 anim text-center w-full md:w-1/2 rounded-lg backhue relative drop-shadow-xl'>
                <p className='font-semibold '>Choose your Mode</p>
                <div className='flex flex-wrap gap-8 mt-8'>
                    <Link to = '/private' className='min-w-[7rem] md:min-w-[10rem] grow  basis-1  flex flex-col gap-3 justify-center items-center min-h-[7rem] md:min-h-[10rem] text-xs rounded-2xl backd m-auto uppercase font-semibold'><BsFillMicFill size='25px'/><p className='opacity-50'> Audio chat</p></Link>
                    <Link to = '/private' className='min-w-[7rem] md:min-w-[10rem] basis-1 grow flex flex-col gap-3 justify-center items-center min-h-[7rem] md:min-h-[10rem] text-xs rounded-2xl backd m-auto uppercase font-semibold'><BsCameraVideoFill size='25px'/><p className='opacity-50'> Video Call</p></Link>
                    <Link to = '/private' className='min-w-[7rem] md:min-w-[10rem] basis-1 grow w-full flex flex-col gap-3 justify-center items-center min-h-[7rem] md:min-h-[10rem] text-xs rounded-2xl backd m-auto uppercase font-semibold'><BsChatSquareTextFill size='25px'/><p className='opacity-50'> Texting</p></Link>
                    <button className='w-10 h-10 backd absolute border-2 border-red-600 centerh rounded-full font-semibold -bottom-5'>X</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Mode;
