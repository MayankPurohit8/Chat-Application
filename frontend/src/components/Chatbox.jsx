import { useEffect, useRef, useState } from "react";
import { Send, Ellipsis, X, ArrowLeft } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { socket } from "../../connectSocket";
import Rec_profile from "./Rec_profile";
function Chatbox({ to, user, setSection }) {
  const bottomref = useRef(null);
  const bottominitialref = useState(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(true);
  const roomid = [user, to._id].sort().join("_");
  useEffect(() => {
    const getChats = async () => {
      try {
        let res = await axios.get("http://localhost:5000/user/getChats", {
          params: { user, to: to._id },
          withCredentials: true,
        });
        setChats(res.data.chats);
      } catch (err) {}
    };
    getChats();
  }, [user, to]);
  useEffect(() => {
    bottominitialref.current?.scrollIntoView();
  }, [chats]);
  useEffect(() => {
    const addMessage = (data) => {
      if (user != data.created_by) {
        toast(`${data.created_by} : ${data.chat} `);
      }

      setChats((prev) => [...prev, data]);
    };
    socket.on("recieve-message", addMessage);
    return () => {
      socket.off("recieve-message", addMessage);
    };
  }, []);

  const sendMessage = async () => {
    try {
      if (message == "") {
        toast.warn("type something");
        return;
      }
      let res = await axios.post(
        "http://localhost:5000/user/send",
        { user, to: to._id, message },
        { withCredentials: true }
      );
      socket.emit("send-message", res.data.chat, roomid);

      setMessage("");
    } catch (err) {}
  };
  const [senderId, setsenderId] = useState(user);
  const [recProfile, setrecProfile] = useState(false);

  if (loading) {
    return (
      <>
        <div className="h-full w-full bg-[#F9F5EC] flex justify-center items-center gap-3 ">
          <div className="animate-spin w-20 h-20 border-4 border-b-4 rounded-full border-b-white border-[#F47256] "></div>
          <div className="font-mono text-5xl font-semibold"></div>
        </div>
      </>
    );
  }
  return (
    <>
      <ToastContainer />
      <div className="h-full flex">
        <div
          className={`h-full  transition-all ease-linear duration-100  relative ${
            recProfile ? "md:w-2/3 hidden md:block" : "w-full"
          }`}
        >
          <div
            className={`md:h-2/15 border flex md:px-20 py-3 px-5 w-full justify-between items-center ${
              recProfile ? "hidden" : ""
            }`}
          >
            <div className="md:hidden block " onClick={() => setSection("A")}>
              <ArrowLeft />
            </div>
            <div
              className="flex md:gap-3 gap-2 justify-around items-center "
              onClick={() => {
                setrecProfile(!recProfile);
              }}
            >
              <div className="border px-4 py-2 rounded-full">
                {to.name[0].toUpperCase()}
              </div>
              <div className="font-bold">{to.name}</div>
            </div>
          </div>
          <div className="flex flex-col gap-5 h-13/15 md:px-7 px-2  overflow-auto p-2 ">
            {chats.map((chat) => (
              <div
                className={`flex gap-2 items-center w-full  ${
                  senderId === chat.created_by
                    ? "justify-end text-right "
                    : "justify-start "
                }`}
              >
                {senderId === chat.created_by ? null : (
                  <div className="border px-5 py-3 rounded-full">
                    {to.name[0].toUpperCase()}
                  </div>
                )}

                <div
                  className={` md:max-w-2/3 md:min-w-1/2  max-w-4/5 min-w-2/3  shadow-inner shadow-black py-5 px-5 rounded-2xl  text-2xl text-white font-semibold text-shadow-2xs text-shadow-black ${
                    senderId === chat.created_by
                      ? " bg-[#9bc3ff] shadow-[#9bc3ff] "
                      : " bg-[#F47256] shadow-[#F47256] "
                  }`}
                >
                  <div className="px-5 w-full break-words whitespace-normal">
                    {chat.chat}
                  </div>
                  <div className="text-gray-800 text-lg font-sans font-extralight text-shadow-none">
                    {new Date(chat.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottominitialref} className="mb-5 md:mb-12"></div>
          </div>
          <div className="w-full flex flex-row-reverse items-center absolute bottom-0 left-0">
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
              className="w-full bg-white py-3 px-5 border-2 border-b-4 border-e-4 "
              placeholder="Enter Message....."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            />
          </div>
        </div>

        <div className={`h-full md:w-1/3 ${recProfile ? "" : "hidden"}`}>
          <div
            className="fixed mt-5  ml-5 bg-red-400 text-white  rounded-full p-3 "
            onClick={() => {
              setrecProfile(false);
            }}
          >
            <X />
          </div>
          <Rec_profile to={to} />
        </div>
      </div>
    </>
  );
}
export default Chatbox;
