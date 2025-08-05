import { io } from "socket.io-client";
const BASE_URL = import.meta.env.VITE_API_URL;
const socket = io(BASE_URL, {
  autoConnect: false,
  withCredentials: true,
});

export { socket };
