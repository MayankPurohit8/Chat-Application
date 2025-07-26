import { Search, ToolCase, X } from "lucide-react";
import Chatbox from "../components/Chatbox";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { socket } from "../../connectSocket";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
function Chat() {
  const [dm_list, set_dm_list] = useState([]);
  const [verified, setVerifired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultvisible, setSearchResultVisible] = useState(false);
  const [chatting, setChatting] = useState(null);
  const [section, setSection] = useState("A");

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    const verifyUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/auth/verify", {
          withCredentials: true,
        });
        setVerifired(true);
        setLoading(false);
        setUser(res.data.id);
      } catch (err) {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  useEffect(() => {
    const getList = async () => {
      try {
        let res = await axios.get("http://localhost:5000/user/list", {
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
  }, [dm_list]);
  const searchUser = async () => {
    try {
      if (!search) {
        toast.warn("Search for something");
        return;
      }
      const res = await axios.get("http://localhost:5000/user/search", {
        params: { user: user, name: search },
        withCredentials: true,
      });
      setSearchResult(res.data.users);
      setSearchResultVisible(true);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const tempAdd = async (user) => {
    set_dm_list((prev) => [...prev, user]);
    setSearchResultVisible(false);
  };
  if (loading) {
    return (
      <>
        <div className="h-screen w-screen bg-[#F9F5EC] flex justify-center items-center gap-3 ">
          <div className="animate-spin w-20 h-20 border-4 border-b-4 rounded-full border-b-white border-[#F47256] "></div>
          <div className="font-mono text-5xl font-semibold"></div>
        </div>
      </>
    );
  }
  if (!verified) {
    return (
      <>
        <div className="h-screen w-screen flex items-center justify-center bg-[#F9F5EC] flex-col gap-5">
          <div className="text-2xl font-semibold font-mono text-[#F47256]">
            Cannot Verify the user!
          </div>
          <a
            className="bg-[#8FB6F1]  px-5 py-3 rounded border-b-2 border-e-4 border-black shadow-black text-white  active:border-none"
            href="/"
          >
            Home page
          </a>
        </div>
      </>
    );
  }
  return (
    <>
      {searchResultvisible && (
        <div className="fixed flex items-center justify-center h-screen w-screen z-10 px-5 py-3 mad:p-0">
          <div className="bg-white py-3 px-5 md:w-1/3 w-full h-1/2 border-2 border-b-4 border-e-4 relative ">
            <div
              onClick={() => {
                setSearchResultVisible(false);
                setSearchResult([]);
              }}
              className="absolute z-2 top-0 left-0 md:p-4 p-3 border rounded-full text-white bg-red-600 -translate-x-5 -translate-y-6"
            >
              <X />
            </div>
            <div className="overflow-auto flex relative flex-col gap-3 h-full    w-full">
              {searchResult.map((user) => (
                <div
                  className="flex  gap-5 items-center px-5 py-5 item bg-white shadow-xl border-e-2 active:scale-105 hover:bg-purple-50"
                  onClick={() => tempAdd(user)}
                >
                  <div className=" flex items-center justify-center ">
                    <div className="border md:px-5 md:py-3 px-3 py-2 rounded-full">
                      U
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

      <div
        className={`font-mono bg-[#F9F5EC] h-screen w-screen ${
          searchResultvisible ? "opacity-20" : ""
        } `}
      >
        <Navbar section={section} />
        <div className="h-9/10 ">
          <div
            className={` ${
              section === "A" ? "flex" : "hidden md:flex"
            } w-full  items-center justify-center md:justify-start px-10  relative  h-2/15`}
          >
            <div
              className=" bg-[#C3BBF0] px-4 py-3 border-2 flex items-center justify-center border-b-4"
              onClick={() => searchUser()}
            >
              <Search />
            </div>
            <input
              type="text"
              className="bg-white py-3 px-5 md:w-1/2 border-2 border-b-4 border-e-4"
              placeholder="Search for friends..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full flex md:h-13/15  h-full gap-5 relative">
            <div
              className={`md:w-1/4 h-full  overflow-auto  flex-col  py-2 gap-2 relative  ${
                section === "A" ? "flex w-screen" : "hidden md:flex w-screen"
              }`}
            >
              <div className="px-5 py-3 text-5xl text-slate-600">Chats</div>

              {dm_list.map((reciepent) => (
                <div
                  className={`transition-all ease-in-out delay-100 grid grid-cols-3 grid-rows-2 px-3 py-5  shadow-xl  hover:bg-purple-50 ${
                    chatting == reciepent._id
                      ? "scale-105 bg-purple-200 hover:bg-purple-200"
                      : "bg-white"
                  }`}
                  onClick={() => {
                    setChatting(reciepent);
                    setSection("B");
                  }}
                >
                  <div
                    className={`row-span-2 flex items-center justify-center `}
                  >
                    <div className="border px-5 py-3 rounded-full">
                      {reciepent.name[0]}
                    </div>
                  </div>
                  <div className="overflow-hidden font-bold text-2xl h-8">
                    {reciepent.name}
                  </div>
                  <div className="overflow-hidden text-gray-600 ml-2">
                    yesterday
                  </div>
                  <div className="overflow-hidden text-sm italic mt-2">
                    hello!
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`w-full md:w-3/4 h-full  md:border-2 ${
                section === "B"
                  ? "w-screen h-screen md:h-full"
                  : "hidden md:block"
              } `}
            >
              {chatting ? (
                <Chatbox to={chatting} user={user} setSection={setSection} />
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
