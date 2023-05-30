const openConnection = () => {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket('wss://spot-ws.onrender.com/socket/')

        socket.addEventListener('open', () => {
            resolve(socket);
        });
      
        socket.addEventListener('error', (event) => {
            reject(event);
        });
    })
}

export default openConnection;