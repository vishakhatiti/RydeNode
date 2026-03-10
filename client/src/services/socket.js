import { io } from "socket.io-client";

let socket;

export const initSocket = () => {
  if (!socket) {
    socket = io(process.env.REACT_APP_SOCKET_URL || "https://rydenode-api.onrender.com", {
      transports: ["websocket"]
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
