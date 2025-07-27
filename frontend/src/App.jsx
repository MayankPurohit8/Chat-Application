import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Welcome from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router";
import Chat from "./pages/Chat";
import Profile from "./components/Profile";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
