import { useState } from "react";
import { Send } from "lucide-react";
const sampleChats = [
  {
    chat: "Hey, how are you?",
    created_at: new Date(Date.now() - 10 * 60 * 1000),
    created_by: "1001",
    created_to: "64a123456789abcd12340002",
  },
  {
    chat: "I'm doing well, you?",
    created_at: new Date(Date.now() - 9 * 60 * 1000),
    created_by: "64a123456789abcd12340002",
    created_to: "1001",
  },
  {
    chat: "All good. Working on a new project!",
    created_at: new Date(Date.now() - 8 * 60 * 1000),
    created_by: "1001",
    created_to: "64a123456789abcd12340002",
  },
  {
    chat: "Oh nice! What's it about?",
    created_at: new Date(Date.now() - 7 * 60 * 1000),
    created_by: "64a123456789abcd12340002",
    created_to: "1001",
  },
  {
    chat: "A chat app with MERN stack. This one!",
    created_at: new Date(Date.now() - 6 * 60 * 1000),
    created_by: "1001",
    created_to: "64a123456789abcd12340002",
  },
  {
    chat: "That's awesome bro!",
    created_at: new Date(Date.now() - 5 * 60 * 1000),
    created_by: "64a123456789abcd12340002",
    created_to: "1001",
  },
  {
    chat: "Thanks! Deploying it next week.",
    created_at: new Date(Date.now() - 4 * 60 * 1000),
    created_by: "1001",
    created_to: "64a123456789abcd12340002",
  },
  {
    chat: "Let me know if you need help testing.",
    created_at: new Date(Date.now() - 3 * 60 * 1000),
    created_by: "64a123456789abcd12340002",
    created_to: "1001",
  },
  {
    chat: "Sure, I’ll ping you!",
    created_at: new Date(Date.now() - 2 * 60 * 1000),
    created_by: "1001",
    created_to: "64a123456789abcd12340002",
  },
  {
    chat: "Cool 😎",
    created_at: new Date(Date.now() - 1 * 60 * 1000),
    created_by: "64a123456789abcd12340002",
    created_to: "1001",
  },
];

function Chatbox() {
  const [chats, setChats] = useState(sampleChats);
  const [senderId, setsenderId] = useState("1001");
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
                <div className="text-sm text-white">
                  {chat.created_at.getHours()}:{chat.created_at.getUTCMinutes()}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-row-reverse items-center ">
          <div className=" bg-[#8FB6F1] px-4 py-3 border-2 flex items-center justify-center border-b-4">
            <Send />
          </div>
          <input
            type="text"
            className="w-full bg-white py-3 px-5 border-2 border-b-4 border-e-4"
            placeholder="Enter Message....."
          />
        </div>
      </div>
    </>
  );
}
export default Chatbox;
