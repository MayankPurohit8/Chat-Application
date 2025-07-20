import { Search, ToolCase, X } from "lucide-react";
import Chatbox from "../components/Chatbox";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const users = [
  { userId: "user001", time: "2025-07-19T21:00:00.000Z" },
  { userId: "user002", time: "2025-07-19T20:59:00.000Z" },
  { userId: "user003", time: "2025-07-19T20:58:00.000Z" },
  { userId: "user004", time: "2025-07-19T20:57:00.000Z" },
  { userId: "user005", time: "2025-07-19T20:56:00.000Z" },
  { userId: "user006", time: "2025-07-19T20:55:00.000Z" },
  { userId: "user007", time: "2025-07-19T20:54:00.000Z" },
  { userId: "user008", time: "2025-07-19T20:53:00.000Z" },
  { userId: "user009", time: "2025-07-19T20:52:00.000Z" },
  { userId: "user010", time: "2025-07-19T20:51:00.000Z" },
];
function Chat() {
  const [verified, setVerifired] = useState(false);
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultvisible, setSearchResultVisible] = useState(false);
  useEffect(() => {
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
  }, [count]);
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
                <div className="flex  gap-5 items-center px-5 py-5 item bg-white shadow-xl border-e-2 active:scale-105 hover:bg-purple-50">
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
        className={`font-mono bg-[#F9F5EC] h-screen ${
          searchResultvisible ? "opacity-20" : ""
        } `}
      >
        <nav className="w-full bg-[#F9F5EC] h-15 px-5 py-3 flex justify-between md:justify-around items-baseline border-b-2  f">
          <div className=" text-3xl font-bold italic">2dChat</div>
          <div className="flex gap-4 md:gap-10 items-center md:font-semibold  text-sm md:text-lg">
            <div className="">About Us</div>
            <div className="">Contact</div>
            <div className="">Profile</div>
          </div>
        </nav>
        <div className="w-full flex items-center justify-center md:justify-start px-10 py-5 relative ">
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

        <div className="w-full flex h-3/4 gap-5 relative">
          <div className="md:w-1/4 w-full h-full  overflow-auto flex flex-col  py-2 gap-2 relative">
            <div className="px-5 py-3 text-5xl text-slate-600">Chats</div>

            {users.map((user) => (
              <div className="grid grid-cols-3 grid-rows-2 px-3 py-5 bg-white shadow-xl border-e-2 active:scale-105 hover:bg-purple-50">
                <div className="row-span-2 flex items-center justify-center">
                  <div className="border px-5 py-3 rounded-full">U</div>
                </div>
                <div className="overflow-hidden font-bold text-2xl">
                  {user.userId}
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
          <div className="w-full md:w-3/4 h-full  md:block md:border-2 ">
            <Chatbox />
          </div>
        </div>
      </div>
    </>
  );
}
export default Chat;
