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

const getConn = () => {
    return conn;
}

const getDc = () => {
    return dc;
}

const permission = async () =>  {
    navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then((stream)=> {
        localStream = stream
    })
    .catch(()=> console.log('denied'))
}

const createOffer = () => {
    try{
        conn = new RTCPeerConnection(servers)
        dc = conn.createDataChannel("channel")
        dc.onopen = e => console.log('connection opened');
        dc.onclose = e => console.log('closed')
        conn.createOffer().then((o) => conn.setLocalDescription(o)).then(() => console.log('offer set'))
        return true
    }
    catch {
        return false
    }
}

const getLocalsdp = () => {
    return JSON.stringify(conn.localDescription)
}

const remoteDes = (answer) => {
    try{
        conn.setRemoteDescription(answer)
        return true
    }
    catch(err) {
        return false
    }
}

const createAnswer = (offer) => {
    try {
        conn = new RTCPeerConnection(servers)
        conn.ondatachannel = e => {
            dc = e.channel;
            dc.onopen = e => console.log('connection opened');
            dc.onclose = e => console.log('closed')
        }
        conn.setRemoteDescription(offer)
        conn.createAnswer().then((o) => conn.setLocalDescription(o)).then(() => console.log('offer set'))
        return true
    }
    catch {
        return false
    }
}


export default {
    createOffer,
    createAnswer,
    getLocalsdp,
    remoteDes,
    getConn,
    getDc
};