import { Search } from "lucide-react";
import Chatbox from "../components/Chatbox";
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
  return (
    <>
      <div className="font-mono bg-[#F9F5EC] h-screen ">
        <nav className="w-full bg-[#F9F5EC] h-15 px-5 py-3 flex justify-between md:justify-around items-baseline border-b-2  f">
          <div className=" text-3xl font-bold italic">2dChat</div>
          <div className="flex gap-4 md:gap-10 items-center md:font-semibold  text-sm md:text-lg">
            <div className="">About Us</div>
            <div className="">Contact</div>
            <div className="">Profile</div>
          </div>
        </nav>
        <div className="w-full flex items-center justify-center md:justify-start px-10 py-5">
          <div className=" bg-[#C3BBF0] px-4 py-3 border-2 flex items-center justify-center border-b-4">
            <Search />
          </div>
          <input
            type="text"
            className="bg-white py-3 px-5 md:w-1/2 border-2 border-b-4 border-e-4"
            placeholder="Search for friends..."
          />
        </div>
        <div className="w-full flex h-3/4 gap-5 px-3">
          <div className="md:w-1/4 w-full h-full  overflow-auto flex flex-col  py-2 gap-2 ">
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
