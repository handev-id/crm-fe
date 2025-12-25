import { Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketType {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
}

const useSocket = create<SocketType>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set({ socket: socket }),
}));

export default useSocket;
