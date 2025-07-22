import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
function Chatbox({ to, user }) {
  const bottomref = useRef(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getChats = async () => {
      try {
        let res = await axios.get("http://localhost:5000/user/getChats", {
          params: { user, to },
          withCredentials: true,
        });
        setChats(res.data.chats);
      } catch (err) {}
    };
    getChats();
  }, [message]);
  useEffect(() => {
    bottomref.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [chats]);
  const sendMessage = async () => {
    try {
      if (message == "") {
        toast.warn("type something");
        return;
      }
      let res = await axios.post(
        "http://localhost:5000/user/send",
        { user, to, message },
        { withCredentials: true }
      );
      setMessage("");
    } catch (err) {}
  };
  const [senderId, setsenderId] = useState(user);
  return (
    <>
      <div className="h-full md:py-5 md:px-10  ">
        <div className="flex flex-col gap-5 h-full md:h-9/10 overflow-auto p-2 ">
          {chats.map((chat) => (
            <div
              className={`flex gap-2 items-center w-full  ${
                senderId === chat.created_by
                  ? "justify-end text-right "
                  : "justify-start "
              }`}
            >
              {senderId === chat.created_by ? null : (
                <div className="border px-5 py-3 rounded-full">U</div>
              )}

              <div
                className={`md:w-2/5 w-2/3 px-5 py-3 rounded-3xl ${
                  senderId === chat.created_by
                    ? " bg-[#8FB6F1]"
                    : " bg-[#F47256]"
                }`}
              >
                {chat.chat}
                <div className="text-sm text-white">{chat.created_at}</div>
              </div>
            </div>
          ))}
          <div ref={bottomref}></div>
        </div>
        <div className="w-full flex flex-row-reverse items-center ">
          <div
            onClick={() => {
              sendMessage();
            }}
            className=" bg-[#8FB6F1] px-4 py-3 border-2 flex items-center justify-center border-b-4"
          >
            <Send />
          </div>
          <input
            type="text"
            className="w-full bg-white py-3 px-5 border-2 border-b-4 border-e-4"
            placeholder="Enter Message....."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
        </div>
      </div>
    </>
  );
}
export default Chatbox;
