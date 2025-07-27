import { io } from "socket.io-client";

const getCookie = () => {
  let token = document.cookie;
  console.log(token);
  return token;
};
const socket = io("http://localhost:5000", {
  autoConnect: false,
  withCredentials: true,
});

export { socket };
