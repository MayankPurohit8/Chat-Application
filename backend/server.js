const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);
app.get("/", (req, res) => {
  res.send("This is backend");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});
app.listen(5000);
