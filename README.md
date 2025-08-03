# 🔨 Blab — Real-Time Chat Application

**Blab** is a modern, full-stack real-time chat application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO**. It offers seamless communication between users, allowing them to send instant messages, share media, and view live online statuses — all in a responsive and visually appealing interface.

---

## 🌟 Key Features

### 🔐 Secure Authentication

* User registration and login with **JWT-based authentication**
* Passwords encrypted using **bcrypt**
* Authenticated routes with session persistence via **cookies**

### 💬 Real-Time Chat

* One-on-one messaging using **Socket.IO**
* Real-time **typing indicators**
* **Online/offline** presence detection
* Message delivery status (seen, delivered)

### 🖼️ Media Sharing

* Upload and send images with live preview
* Backend file handling using **Multer**
* Cloud image storage via **Cloudinary**

### 🎨 Clean UI/UX

* Responsive design built with **Tailwind CSS**
* Smooth animations and dark mode support
* Intuitive chat bubble layout and user interface

### 🔍 User Search & Chat Management

* Instant user search using **regex filtering**
* Start new conversations or continue old ones
* Maintain DM list and manage existing chats

### 📡 Real-Time Events

* Instant updates for messages, typing status, and online users
* Efficient broadcasting via **Socket.IO channels**

---

## 🪨 Tech Stack

| Frontend     | Backend     | Real-Time  | Storage/Hosting     |
| ------------ | ----------- | ---------- | ------------------- |
| React.js     | Node.js     | Socket.IO  | MongoDB (Mongoose)  |
| Tailwind CSS | Express.js  | WebSockets | Cloudinary (Images) |
| Axios        | JWT, bcrypt |            | Multer (Uploads)    |

---

## 🗂️ Folder Structure (Simplified)

```
blab/
├── client/         # React frontend
│   └── components/
│   └── pages/
│   └── sockets/
├── server/         # Express backend
│   └── controllers/
│   └── routes/
│   └── models/
│   └── sockets/
```

---

## 🌐 Live Demo

> If deployed, add your live demo link here:
> [🔗 Visit Live Demo](https://yourprojectdemo.com)

---

## 🛠️ How It Works

1. User signs up or logs in using a secure authentication system.
2. A Socket.IO connection is established after login.
3. Users can search for others and start chats.
4. Messages are sent/received in real-time and stored in MongoDB.
5. Images are uploaded to Cloudinary, and links are displayed in-chat.
6. Live events like typing, online status, and message delivery are reflected on the UI instantly.

---

## 🚀 Future Enhancements

* 📅 Group chats with admin controls
* 🔔 Push notifications
* 🧠 AI-powered reply suggestions
* 🌐 Multi-language support
* 📊 Chat analytics and usage insights

---

## 👤 Developed By

**Mayank Purohit**
MERN Stack Developer | Machine Learning Enthusiast
[GitHub](https://github.com/MayankPurohit8) • [LinkedIn](www.linkedin.com/in/mayank-purohit-)

---

> Feel free to fork, contribute, or raise issues. Feedback is welcome!
