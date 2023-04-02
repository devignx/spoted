const openConnection = () => {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket('ws://localhost:5000/socket/')

        socket.addEventListener('open', () => {
            resolve(socket);
        });
      
        socket.addEventListener('error', (event) => {
            reject(event);
        });
    })
}

export default openConnection;