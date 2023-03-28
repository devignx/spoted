import React, { useState, useEffect } from 'react';

function Ping() {
  const [isEndpointActive, setIsEndpointActive] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('https://spot-socket.onrender.com/')
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);
}

export default Ping;
