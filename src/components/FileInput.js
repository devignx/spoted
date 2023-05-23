import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import useStore from "../store/store";

const FileInput = () => {
  const [dragging, setDragging] = useState(false);
  const [fileDrop, setFileDrop] = useState(false);
  const { theme } = useStore((state) => ({changeTheme: state.changeTheme, theme: state.theme}))

  const fileInputRef = useRef(null);
  const [mediaPopup, setMediaPopup] = useState();

  const handleAddButtonClick = () => {
      fileInputRef.current.click();
  };

  const handleFileSelected = (e) => {
      // const selectedFile = e.target.files[0];
      console.log('Selected image files:',e.target.files[0]);
      setFileDrop(true);
  };

  useEffect(() => {
    const handleDragEnter = (e) => {
      e.preventDefault();
      setDragging(true);
    };

    // const handleDragLeave = () => {
    //   setDragging(true);
    // };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setFileDrop(true);
      setDragging(false);
      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter((file) => file.type.startsWith('image/'));
      console.log('Dropped image files:', imageFiles);
      // Perform your logic with the dropped image files here
    };

    document.addEventListener('dragenter', handleDragEnter);
    // document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      // document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    
    <>
      <div className={`p-8 ${mediaPopup ? 'opacity-100 translate-y-0 scale-y-100' : 'opacity-0 translate-y-full scale-y-0'} top-0 left-0 fixed anim w-screen h-screen flex toppp justify-center items-center backdrop-blur-xl backdrop-opacity-90 ${theme === 'light' ? 'backdrop-brightness-105' : 'backdrop-brightness-50'}`}>
          <div className={`w-11/12 relative md:w-1/2 topppp border-2 ${dragging ? 'border-blue-500 border-dashed' : 'border-blue-500/0 '} py-16 backd anim -mt-12 rounded-xl  p-8 text-center shadow-xl`}>
          <p>{ !fileDrop ? `${dragging ? 'Drop the image here' : 'Drag and drop an image file'}` : 'Oh you dropped something :)' }</p>
          <input
              type="file"
              className='mt-8 bg-white p-4 px-8'
              style={{ display: 'none' }}
              id='img'
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/webp, image/heic, image/jpg"
              onChange={handleFileSelected}
          />
          <button className='mt-8 flex items-center justify-center gap-2 mx-auto rounded-xl backhue bg-white p-4 px-8' 
            onClick={!fileDrop ? handleAddButtonClick : ()=> setMediaPopup(false)}>
            { fileDrop ? 'Remove' : 'Add' }
            { !fileDrop ?
              <button><AiOutlinePlus className='text-blue-500' size='22px'/></button> 
            : 
              <button><AiOutlineMinus className='text-blue-500' size='22px'/></button> 
            }
          </button>
          { !dragging && <button onClick={()=>{setMediaPopup(false)}} className='mt-6 text-xs p-2 px-3 rounded-full absolute topppp -top-10 centerh text-white bg-red-500/50 backdrop-blur-lg border-2 border-red-500' >X</button>}
        </div>
        <div onClick={()=> setMediaPopup(false)} className='w-screen h-screen toppp absolute' ></div>
      </div>
      <button onClick={()=>{setMediaPopup(true); setFileDrop(false) }}><AiOutlinePlus size='22px'/></button>
    </>
  );
};

export default FileInput;
