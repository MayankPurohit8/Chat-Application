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
console.log(process.env.NODE_ENV);
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://chat-application-psi-vert.vercel.app"
    : "http://localhost:5173";
console.log(BASE_URL);
app.use(
  cors({
    origin: BASE_URL,
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
const PORT = process.env.PORT || 5000;
server.listen(PORT);
