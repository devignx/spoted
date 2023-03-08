import { create } from "zustand";

const useStore = create((set) => ({
    theme: 'dark',
    socket: null,
    ip: null,
    name: null,
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