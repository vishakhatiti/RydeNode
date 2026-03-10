import { useEffect, useState } from "react";
import { disconnectSocket, initSocket } from "../services/socket";

export default function useSocket(eventHandlers = {}) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = initSocket();
    setSocket(s);

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      if (handler) s.on(event, handler);
    });

    return () => {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        if (handler) s.off(event, handler);
      });
      disconnectSocket();
    };
  }, []);

  return socket;
}
