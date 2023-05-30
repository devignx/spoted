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
    // conn.ontrack = event => {
    //     event.streams[0].getTracks().forEach((track)=> {
    //         remoteStream.addTrack(track)
    //     })
    //     console.log('hello')
    // }
    // conn.onaddstream = event => {
    //     event.streams[0].getTracks().forEach((track)=> {
    //         remoteStream.addTrack(track)
    //     })
    //     console.log('hello')
    // }
    // localStream = await navigator.mediaDevices.getUserMedia({audio: false, video: true})
    // remoteStream = new MediaStream()
    // localStream.getTracks().forEach((track)=> {
    //     conn.addTrack(track, localStream)
    // })
    // console.log(conn.remoteDescription)
    // document.getElementById('local').srcObject = localStream
    // document.getElementById('remote').srcObject = remoteStream

    // On this codelab, you will be streaming only video (video: true).
    const mediaStreamConstraints = {
        video: true,
    };
  
    // Video element where stream will be placed.
    const localVideo = document.getElementById('local');
    const remoteVideo = document.getElementById('remote');
    
    // Local stream that will be reproduced on the video.
    let localStream;
    let remoteStream

    conn.addEventListener('track', async ev => {
        remoteStream = ev.streams
        remoteVideo.srcObject = ev.streams
    })
  
    // Handles success by adding the MediaStream to the video element.
    function gotLocalMediaStream(mediaStream) {
        localStream = mediaStream;
        localVideo.srcObject = mediaStream;
        for (const track of localStream.getTracks()){
            conn.addTrack(track, localStream)
        }
    }
  
    // Handles error by logging a message to the console with the error message.
    function handleLocalMediaStreamError(error) {
        console.log('navigator.getUserMedia error: ', error);
    }
  
    // Initializes media stream.
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
        .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
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