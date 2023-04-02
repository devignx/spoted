let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
}

const permission = async () =>  {
    navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then((stream)=> {
        localStream = stream
    })
    .catch(()=> console.log('denied'))
}

const connection = async () => {
    peerConnection = new RTCPeerConnection(servers)
    let offer = await peerConnection.createOffer()
    console.log(offer)
}

export default connection;