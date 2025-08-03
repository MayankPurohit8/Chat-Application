import { Search, X, UserRoundCog, Hourglass, Images, User } from "lucide-react";
import Chatbox from "../components/Chatbox";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { socket } from "../../connectSocket";
import Login from "./Login";
import Profile from "../components/Profile";
import MessageNot from "../components/MessageNot";
import PostLogin from "../components/Postlogin";
function Chat() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [dm_list, set_dm_list] = useState([]);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultvisible, setSearchResultVisible] = useState(false);
  const [chatting, setChatting] = useState(null);
  const [section, setSection] = useState("A");
  const [lastmessages, setlastmessages] = useState([]);
  const [profile, setProfile] = useState(false);
  const lastmessref = useRef(lastmessages);
  const [showPostLogin, setshowPostLogin] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState();
  useEffect(() => {
    console.log(BASE_URL);
    if (verified && !socket.connected) {
      socket.connect();
      socket.emit("join-private-room", user);
    }
    const verifyUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/auth/verify`, {
          withCredentials: true,
        });
        setVerified(true);
        setLoading(false);
        setUser(res.data.id);
      } catch (err) {
        setLoading(false);
      }
    };
    verifyUser();
  }, [verified]);
  useEffect(() => {
    const fetchOnlineUsers = (data) => {
      console.log(data);
      setOnlineUsers([...data]);
    };
    socket.on("online-users", fetchOnlineUsers);
    return () => {
      socket.off("online-users", fetchOnlineUsers);
    };
  }, [user]);
  useEffect(() => {
    const notify = (data, name) => {
      if (user != data.created_by) {
        toast(
          <MessageNot
            user={name}
            message={data.type == "text" ? data.chat : "image"}
          />,
          {
            containerId: "chat",
          }
        );
      }
    };
    socket.off("recieve-message", notify);
    socket.on("recieve-message", notify);
    return () => {
      socket.off("recieve-message", notify);
    };
  }, [user]);
  useEffect(() => {
    const getList = async () => {
      try {
        let res = await axios.get(`${BASE_URL}/user/list`, {
          params: { user: user },
          withCredentials: true,
        });
        set_dm_list(res.data.list);
      } catch (err) {}
    };
    if (user) getList();
  }, [user]);

  useEffect(() => {
    if (!user || !dm_list.length) {
      return;
    }
    dm_list.forEach((reciepent) => {
      const roomid = [user, reciepent._id].sort().join("_");
      socket.emit("connect-to-room", roomid);
    });
    console.log(dm_list);
  }, [dm_list]);

  useEffect(() => {
    const getlastmessages = async () => {
      try {
        let res = await axios.get(`${BASE_URL}/user/getlastmessages`, {
          withCredentials: true,
        });
        console.log(res.data.list);
        setlastmessages(res.data.list);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) getlastmessages();
  }, [user]);
  useEffect(() => {
    lastmessref.current = lastmessages;
  }, [lastmessages]);
  useEffect(() => {
    const handlelist = (data) => {
      if (!dm_list.find((u) => u._id === data._id)) tempAdd(data);
    };
    socket.on("add-to-list", handlelist);
    return () => {
      socket.off("add-to-list", handlelist);
    };
  }, [dm_list]);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const getLastMessageTime = (data) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const mess = new Date(data);

    if (isSameDay(now, mess)) {
      return mess.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (isSameDay(yesterday, mess)) {
      return "yesterday";
    } else {
      return mess.toLocaleDateString([], { month: "short", day: "2-digit" });
    }
  };
  const searchUser = async (search) => {
    try {
      if (search == "") {
        setSearchResult([]);
        return;
      }
      const res = await axios.get(`${BASE_URL}/user/search`, {
        params: { user: user, name: search },
        withCredentials: true,
      });
      setSearchResult(res.data.users);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  useEffect(() => {
    const handlelatestmess = (data) => {
      let ind = lastmessref.current.findIndex((m) => {
        let msg = m.lastmessage;
        return (
          (data.created_by === msg.created_by &&
            data.created_to == msg.created_to) ||
          (data.created_by === msg.created_to &&
            data.created_to === msg.created_by)
        );
      });
      setlastmessages((prev) => {
        const updated = [...prev];
        updated[ind] = { ...updated[ind], lastmessage: data };
        return updated;
      });
    };
    socket.on("recieve-message", handlelatestmess);
    return () => {
      socket.off("recieve-message", handlelatestmess);
    };
  }, []);
  const tempAdd = async (u) => {
    if (user && u._id === user) return;
    set_dm_list((prev) => [...prev, u]);
    setSearchResultVisible(false);
  };
  if (loading) {
    return (
      <>
        <div className="h-screen w-screen bg-[#17191A] flex justify-center items-center gap-3 ">
          <div className="animate-spin w-20 h-20 border-4 border-b-4 rounded-full border-b-[#17191A]  border-sky-500 "></div>
          <div className="font-mono text-5xl font-semibold"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer
        containerId={"chat"}
        toastClassName={() => "bg-transparent p-0 m-0 rounded-lg "}
        bodyClassName={() => "p-0 m-0 bg-transparent"}
        theme="colored"
        position="top-center"
        pauseOnHover
        stacked={true}
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick={true}
      />
      {profile && (
        <Profile
          setProfile={setProfile}
          setVerified={setVerified}
          setAll={setUser}
          setLoading={setLoading}
        />
      )}
      {searchResultvisible && (
        <div className="fixed flex items-center justify-center h-screen w-screen z-10 px-5 py-3 mad:p-0 backdrop-blur-sm">
          <div className="shadow-2xl bg-[#17191A] shadow-black border border-sky-500 py-10 md:px-10 px-5 md:w-1/2 w-full h-3/4  relative rounded-xl   ">
            <div
              onClick={() => {
                setSearchResultVisible(false);
                setSearchResult([]);
              }}
              className="absolute z-2 top-0 left-0 md:p-4 p-3 border rounded-full text-white bg-red-600 -translate-x-5 -translate-y-6"
            >
              <X />
            </div>
            <div className="flex gap-5 px-5 py-3 bg-[#1D2127] w-full  rounded-xl">
              <input
                onChange={(e) => searchUser(e.target.value)}
                type="text"
                className=" placeholder:text-gray-500 text-gray-200 outline-none w-full  "
                placeholder="Search for friends..."
              />
              <div
                className="rounded-full hover:bg-gray-300 p-2"
                onClick={() => searchUser(e.target.value)}
              >
                <Search color="gray" />
              </div>
            </div>
            <div className="overflow-auto flex relative flex-col gap-3 h-full  w-full">
              {searchResult.map((user) => (
                <div
                  className="flex text-gray-500 gap-5 items-center px-5 py-5 item  hover:text-gray-400  active:scale-105 "
                  onClick={() => tempAdd(user)}
                >
                  <div className=" flex items-center justify-center ">
                    <div className="border rounded-full h-20 w-20 relative ">
                      {user.dp != "" ? (
                        <img
                          src={user.dp}
                          className="h-full w-full object-contain rounded-full"
                        />
                      ) : (
                        <div className="absolute h-full w-full flex items-center justify-center">
                          <User size={40} color="gray" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="overflow-hidden font-bold text-2xl">
                    {user.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {!verified && (
        <Login
          setVerified={setVerified}
          setshowPostLogin={setshowPostLogin}
          setLoading={setLoading}
        />
      )}
      {verified && showPostLogin && (
        <PostLogin
          setshowPostLogin={setshowPostLogin}
          userid={user}
          setLoading={setLoading}
        />
      )}
      <div
        className={`font-mono  h-screen w-screen ${
          (searchResultvisible ? "opacity-20" : "", !verified ? "" : "")
        } `}
      >
        <div className="h-full bg-[#1D2127] ">
          <div className="w-full flex   h-full gap-5 relative">
            <div
              className={`md:w-1/4 h-full  flex-col   gap-2 relative  ${
                section === "A" ? "flex w-screen" : "hidden md:flex w-screen"
              }`}
            >
              <div className="flex gap-5 justify-between items-center rounded-b-2xl py-3 px-10 border text-center text-xl font-semibold bg-[#333c43]  ">
                <div className=" text-3xl bg-linear-to-r from-sky-400 to-[#8d92e7] bg-clip-text text-transparent hover:bg-linear-to-l  ">
                  Blab.com
                </div>
                <div className="flex gap-3 items-center">
                  <div
                    className=" p-2 rounded-full hover:bg-gray-400 "
                    onClick={() => setProfile(true)}
                  >
                    <UserRoundCog color="white" />
                  </div>
                </div>
              </div>
              <div className="w-full h-1/5 py-5 px-3 flex flex-col gap-4">
                <div
                  onClick={() => setSearchResultVisible(true)}
                  className="rounded-md py-4 px-3 text-center text-xl text-white font-semibold bg-linear-to-r from-sky-500 to-[#2B32BD] border border-sky-500"
                >
                  Start New Chat
                </div>
                <div className=" py-3 px-3 flex gap-5  w-full bg-[#15191C] rounded-xl">
                  <div className="rounded-full hover:bg-gray-300 p-2">
                    <Search color="gray" />
                  </div>
                  <input
                    type="text"
                    className=" placeholder:text-gray-500 text-gray-200 outline-none w-full "
                    placeholder="Search in chats..."
                  />
                </div>
              </div>
              <div className="h-4/5 overflow-y-auto">
                <div className="px-5 py-3 text-5xl text-slate-600  mt-5 mb-5">
                  Chats
                </div>
                {dm_list.map((reciepent) => (
                  <div
                    className={`transition-all ease-in-out delay-100 grid grid-cols-3 grid-rows-2 px-2 py-3    ${
                      chatting && chatting._id === reciepent._id
                        ? "scale-105 bg-[#15191C] shadow-lg"
                        : ""
                    }`}
                    onClick={() => {
                      setChatting(reciepent);
                      setSection("B");
                    }}
                  >
                    <div
                      className={`row-span-2 flex items-center justify-center `}
                    >
                      <div className="border w-20 h-20  rounded-full bg-white">
                        {reciepent?.dp != "" ? (
                          <img
                            src={reciepent.dp}
                            alt=""
                            className="w-full h-full ovject-contain rounded-full"
                          />
                        ) : (
                          reciepent.name[0]
                        )}
                      </div>
                    </div>
                    <div className="overflow-hidden font-bold text-lg text-gray-200 h-8">
                      {reciepent.name}
                    </div>
                    <div className="overflow-hidden text-gray-600 ml-2 text-md">
                      {getLastMessageTime(
                        lastmessages.find(
                          (msg) =>
                            msg.lastmessage?.created_by === reciepent._id ||
                            msg.lastmessage?.created_to === reciepent._id
                        )?.lastmessage?.created_at
                      )}
                    </div>
                    <div className="overflow-hidden h-5 w-full text-sm text-gray-400 italic mt-2">
                      {(() => {
                        const found = lastmessages.find(
                          (msg) =>
                            msg.lastmessage?.created_by === reciepent._id ||
                            msg.lastmessage?.created_to === reciepent._id
                        );
                        if (!found?.lastmessage) return "----";
                        return found.lastmessage.type === "text"
                          ? found.lastmessage.chat
                          : "image";
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`w-full md:w-3/4 h-full  md:border-2 ${
                section === "B"
                  ? "w-screen h-screen md:h-full"
                  : "hidden md:block"
              } `}
            >
              {chatting ? (
                <Chatbox
                  to={chatting}
                  user={user}
                  setSection={setSection}
                  tempAdd={tempAdd}
                  onlineUsers={onlineUsers}
                />
              ) : (
                <div className=" text-5xl flex items-center justify-center h-full">
                  Nothing to show here...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Chat;
