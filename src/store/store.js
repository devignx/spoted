import { create } from "zustand";

const useStore = create((set) => ({
    theme: 'dark',
    socket: null,
    ip: null,
    name: null,
    peers: [],
    loged: false,
    messages: [],
    requests: [],
    peerid: null,
    setPeerid: (peerid) => set(()=> ({peerid})),
    setRequests: (requests) => set(()=> ({requests})),
    setMessages: (messages) => set(()=> ({messages})),
    setLoged: (loged) => set(()=> ({loged})),
    setPeers: (peers) => set(()=> ({peers})),
    setName: (name) => set(()=> ({name})),
    setIp : (ip) => set(()=> ({ip})),
    setSocket: (socket) => set(() => ({socket})),
    changeTheme : () => {
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light'  
        }))
    }
}))

export default useStore;