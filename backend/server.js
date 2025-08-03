const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");

const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./utils/connectDB");
const { Server } = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();
const { app, server } = require("./utils/connectSocket");
app.use(express.json());
app.use(cookieParser());
const multer = require("multer");
app.use(
  cors({
    origin: "https://chat-application-psi-vert.vercel.app",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("This is backend");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
const PORT = process.env.PORT;
server.listen(PORT);
