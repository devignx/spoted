import React, { useEffect, useState } from 'react';

function BrowserChecker() {
  const [browserName, setBrowserName] = useState('unknown');
  const [shield, setShield] = useState('unknown');

  useEffect(() => {
    
    const userAgent = navigator.userAgent;
    if (typeof window.chrome === "object" && navigator.brave) {
      setBrowserName('Brave');
      setShield('Brave Shields')
    }   else if (typeof window.opr !== "undefined") {
        setBrowserName('Opera');
        setShield('Opera Adblocker');
    }   else if (typeof InstallTrigger !== 'undefined') {
        setBrowserName('Mozilla Firefox');
        setShield('Firefox Adblockers')
    }   else {  
        setBrowserName('Adblockers');
        setShield('Adblockers')
    }
  }, []);

  let url = ('https://www.google.com/search?q=disable+'+shield+'+in+'+browserName+'+my browser')

  return (
    <div className='fixed text-black w-full z-[9999]'> 
        <div className='flex w-full h-screen backdrop-blur-2xl items-center justify-center'>
            <div className='px-6 py-12 md:p-12 text-center w-11/12 md:w-fit rounded-lg bg-white relative drop-shadow-xl'>
                <p className='absolute -top-4 centerh text-xs font-semibold bg-red-500 w-full text-white p-3 '>IMPORTANT NOTICE</p>
                <div className=' text-xl '>
                    You're using <span className='font-semibold '>{browserName}</span>
                </div>
                <p className='text-sm w-11/12 m-auto mt-4 mb-8 font-semibold'>Please disable your <span className='text-red-600 font-semibold tracking-wide mx-1 uppercase'>{shield}</span> for this site</p>
                <a href='/why' className='text-blue-500 underline hover:text-blue-700 font-semibold mx-4'>See Why?</a>
                <a href={url} target='_blank' rel="noreferrer"  className='underline font-semibold mx-4'>See how?</a>
                <button className='w-10 text-red-600 h-10 bg-white absolute border-2 border-red-600 centerh rounded-full font-semibold -bottom-5'>X</button>
            </div>
        </div>
    </div>
  );
}

export default BrowserChecker;

