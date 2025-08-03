import { io } from "socket.io-client";

const getCookie = () => {
  let token = document.cookie;
  console.log(token);
  return token;
};
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export { socket };
