import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://chat-application-psi-vert.vercel.app"],
    credentials: true,
  },
});

const onlineusers = new Map();
const getOnlineUserList = () => {
  return Array.from(onlineusers.keys());
};
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  let token = socket.request.headers.cookie?.split("token=")[1];
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (decoded) {
    if (!onlineusers.has(decoded.id)) {
      onlineusers.set(decoded.id, socket.id);
    }
    socket.join(decoded.id);
    console.log(onlineusers);
  }
  io.emit("online-users", getOnlineUserList());
  socket.on("connect-to-room", (data) => {
    console.log(`socket-${socket.id} connected to room-${data}`);
    socket.join(data);
  });

  socket.on("send-message", async (message, roomid) => {
    console.log(`message-${message} sent in room-${roomid}`);

    const user = await User.findById(decoded.id);
    let recid =
      decoded.id != roomid.split("_")[0]
        ? roomid.split("_")[0]
        : roomid.split("_")[1];
    if (onlineusers.has(recid)) {
      console.log(user);
      io.to(recid).emit("add-to-list", user);
    }
    io.to(roomid).emit("recieve-message", message, user.name);
  });

  socket.on("typing", (roomid, id) => {
    io.to(roomid).emit("user-typing", id);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected / loggged out");

    onlineusers.delete(decoded.id);
    io.emit("online-users", getOnlineUserList());
  });
});

export { io, app, server };
