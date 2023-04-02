let localStream;
let remoteStream;
let peerConnection;
let lc;
let dc;
let rc;
let conn;


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

const createOffer = () => {
    conn = new RTCPeerConnection(servers)
    dc = conn.createDataChannel("channel")
    dc.onmessage = e => console.log(e.data)
    dc.onopen = e => console.log('connection opened');
    dc.onclose = e => console.log('closed')
    conn.createOffer().then((o) => conn.setLocalDescription(o)).then(() => console.log('offer set'))
}

const getLocalsdp = () => {
    return JSON.stringify(conn.localDescription)
}

const remoteDes = (answer) => {
    conn.setRemoteDescription(answer)
}

const createAnswer = (offer) => {
    conn = new RTCPeerConnection(servers)
    conn.ondatachannel = e => {
        conn.dc = e.channel;
        conn.dc.onmessage = e => console.log(e.data);
        conn.dc.onopen = e => console.log('connection opened');
        conn.dc.onclose = e => console.log('closed')
    }
    conn.setRemoteDescription(offer)
    conn.createAnswer().then((o) => conn.setLocalDescription(o)).then(() => console.log('offer set'))
}


export default {
    createOffer,
    createAnswer,
    getLocalsdp,
    remoteDes
};