import React, { useState } from 'react';
import {BsFillShareFill} from 'react-icons/bs'
import {IoCopy} from 'react-icons/io5'
import { TiTick } from 'react-icons/ti';

const ShareMenu = ({ url }) => {
  // const [showMenu, setShowMenu] = useState(false);
  const [copy, setCopy] = useState(false);
  const [copyText, setCopyText] = useState("Copy Link");

  const shareLink = () => {
      navigator.share({
        title: 'SPOT',
        url: 'https://spoted.online'
      })
  };

  const copyLink = () => {
    navigator.clipboard.writeText('https://spoted.online')
    setCopy(true);
    setCopyText("Copied");
    setTimeout(()=> {
        setCopy(false);
        setCopyText("Copy Link");
    }, 3000)
  };

  return (
    <div className=" flex anim gap-5">
      <button className='backd mt-8 p-3 px-5 rounded-full flex items-center gap-2 hover:text-white anim hover:bg-blue-500' onClick={shareLink}>Share <BsFillShareFill size='13px'/></button>
      <button className={` ${copy ? "bg-green-500/70 text-white" : "backd"} mt-8 p-3 px-5 rounded-full  anim  flex items-center gap-2`} onClick={copyLink}>{copyText} { copy? <TiTick size='16px'/> : <IoCopy size='13px'/>}</button>
    </div>
  );
};

export default ShareMenu;
