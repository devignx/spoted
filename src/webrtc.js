let localStream = null;
let remoteStream = null;
let dc;
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
    conn.ontrack = event => {
        event.streams[0].getTracks().forEach((track)=> {
            remoteStream.addTrack(track)
        })
        console.log('hello')
    }
    conn.onaddstream = event => {
        // event.streams[0].getTracks().forEach((track)=> {
        //     remoteStream.addTrack(track)
        // })
        console.log('hello')
    }
    localStream = await navigator.mediaDevices.getUserMedia({audio: false, video: true})
    remoteStream = new MediaStream()
    localStream.getTracks().forEach((track)=> {
        conn.addTrack(track, localStream)
    })
    console.log(conn.remoteDescription)
    document.getElementById('local').srcObject = localStream
    document.getElementById('remote').srcObject = remoteStream
}

const createOffer = () => {
    try{
        conn = new RTCPeerConnection(servers)
        dc = conn.createDataChannel("channel")
        dc.onopen = e => console.log('connection opened');
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
    getDc,
    permission
};