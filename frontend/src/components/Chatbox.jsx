import { useEffect, useRef, useState } from "react";
import { Send, Ellipsis, X, ArrowLeft, Mic, Images } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { socket } from "../../connectSocket";
import Rec_profile from "./Rec_profile";
function Chatbox({ to, user, setSection, tempAdd, dm_list }) {
  const bottomref = useRef(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(false);
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
    bottomref.current?.scrollIntoView({
      scroll: "smooth",
    });
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
  }, [dm_list]);

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
      <div className="h-full flex bg-[#17191A]">
        <div
          className={`h-full  transition-all ease-linear duration-100  relative ${
            recProfile ? "md:w-2/3 hidden md:block" : "w-full"
          }`}
        >
          <div
            className={` flex md:px-20  py-5 px-5 w-full  justify-between items-center bg-[#1D2127] border-b-2 shadow-2xl ${
              recProfile ? "hidden" : ""
            }`}
          >
            <div
              className="md:hidden block p-2 rounded-full hover:bg-gray-200 "
              onClick={() => setSection("A")}
            >
              <ArrowLeft color="grey" />
            </div>
            <div
              className="flex md:gap-3 gap-2 justify-around items-center    "
              onClick={() => {
                setrecProfile(!recProfile);
              }}
            >
              <div className="border px-4 py-2 rounded-full bg-white">
                {to.name[0].toUpperCase()}
              </div>
              <div className="font-bold text-gray-200 ">{to.name}</div>
            </div>
            {online && (
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-green-500">online</div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 h-13/15 md:px-7 px-2  overflow-auto p-2 ">
            {chats.map((chat) => (
              <div
                className={`flex gap-2 items-center w-full  ${
                  senderId === chat.created_by
                    ? "justify-end text-right "
                    : "justify-start "
                }`}
              >
                {senderId === chat.created_by ? null : (
                  <div className="border px-5 py-3 rounded-full bg-white font-bold">
                    {to.name[0].toUpperCase()}
                  </div>
                )}

                <div
                  className={` md:max-w-2/3 md:min-w-1/2   max-w-4/5 min-w-2/3  py-3 px-5 rounded-xl  text-lg text-gray-100  ${
                    senderId === chat.created_by
                      ? " bg-[#2B32BD]  "
                      : " bg-[#1D2127]  "
                  }`}
                >
                  <div className="px-5 w-full break-words whitespace-normal">
                    {chat.chat}
                  </div>
                  <div className="text-gray-400 text-sm font-sans font-extralight text-shadow-none ">
                    {new Date(chat.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottomref} className="md:mb-20 mb-7"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-full md:px-10 md:py-5  px-1 py-2 ">
            <div className="bg-[#1D2127] rounded-xl md:px-7 px-3 py-2 md:py-5 flex w-full ring-2 shadow-2xl shadow-black md:gap-5 gap-1 items-center ">
              <div className="p-2 rounded-full  hover:bg-gray-200">
                <Mic color="gray" />
              </div>
              <div className="w-full">
                <input
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  value={message}
                  type="text"
                  placeholder="type something... "
                  className="placeholder:text-gray-500 text-gray-200 outline-none w-full"
                />
              </div>
              <div className=" hover:bg-gray-200 rounded-full p-2">
                <Images color="gray" />
              </div>
              <div
                className=" hover:bg-gray-200 rounded-full p-2"
                onClick={() => {
                  sendMessage();
                }}
              >
                <Send color="gray" />
              </div>
            </div>
          </div>
        </div>

        <div className={`h-full md:w-1/3 ${recProfile ? "" : "hidden"}`}>
          <div
            className="fixed mt-5  ml-5 bg-gray-500 text-white  rounded-full p-3 "
            onClick={() => {
              setrecProfile(false);
            }}
          >
            <X />
          </div>
          <Rec_profile to={to} online={online} />
        </div>
      </div>
    </>
  );
}
export default Chatbox;
