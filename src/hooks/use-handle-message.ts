import { useEffect } from "react";
import useSocket from "./use-socket";

export default function useHandleMessage() {
  const socket = useSocket((state) => state.socket);
  useEffect(() => {
    if (!socket) return;

    socket.on("new-message", (data) => {
      console.log("New message received:", data);
    });
  }, [socket]);
}
