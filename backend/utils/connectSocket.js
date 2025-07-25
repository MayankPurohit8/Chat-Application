import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("connect-to-room", (data) => {
    console.log(`socket-${socket.id} connected to room-${data}`);
    socket.join(data);
  });
  socket.on("send-message", (message, roomid) => {
    console.log(`message-${message} sent in room-${roomid}`);
    io.to(roomid).emit("recieve-message", message);
  });
});

export { io, app, server };
