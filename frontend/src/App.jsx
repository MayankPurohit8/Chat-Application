import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Chatbox from "./Chatbox";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Chatbox />
    </>
  );
}

export default App;
