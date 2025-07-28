import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
function Profile({ setProfile }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const [selection, setSelection] = useState(0);
  useEffect(() => {
    const getProfile = async () => {
      try {
        let res = await axios.get("http://localhost:5000/user/profile", {
          withCredentials: true,
        });

        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setBio(res.data.bio);
      } catch (err) {}
    };
    getProfile();
  }, []);
  return (
    <>
      <div className="fixed h-screen w-screen border bg-transparent backdrop-blur-2xl z-10 flex items-center justify-center ">
        <div className="py-5 md:w-1/3 md:h-5/6 w-full h-3/4  bg-[#17191A] shadow-2xl border-2 border-sky-500 rounded-xl">
          {selection == 0 && (
            <div className=" h-1/10">
              <div
                className="fixed ml-5 my-1 p-1 rounded-full hover:bg-gray-500  text-gray-200"
                onClick={() => setProfile(false)}
              >
                <ChevronLeft />
              </div>
              <div className="text-gray-400 text-center text-3xl font-semibold">
                Profile
              </div>
            </div>
          )}
          {selection == 0 && (
            <div className=" flex  flex-col py-5 items-center justify-between h-9/10">
              <div className="w-full h-1/3 flex flex-col items-center justify-center gap-4">
                <div className="bg-white text-center h-4/5 w-1/5 rounded-full flex items-center justify-center text-3xl font-bold">
                  M
                </div>
                <div className="h-1/5 text-sky-500">Edit</div>
              </div>
              <div className="h-2/3  w-full flex flex-col px-5 gap-5">
                <div className="">
                  <div className="text-gray-500 px-2">Name</div>
                  <div className="text-gray-100 bg-[#1d212787] py-3 px-4 rounded-xl flex justify-between">
                    <div className="">{name}</div>
                    <div className="" onClick={() => setSelection(1)}>
                      <ChevronRight />
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="text-gray-500 px-2">Email</div>
                  <div className="text-gray-100 bg-[#1d212787] py-3 px-4 rounded-xl flex justify-between">
                    <div className="">{email}</div>
                    <div className="" onClick={() => setSelection(2)}>
                      <ChevronRight />
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="text-gray-500 px-2">bio</div>
                  <div className="text-gray-100 bg-[#1d212787] py-3 px-4 rounded-xl flex justify-between">
                    <div className="">{bio}</div>
                    <div className="" onClick={() => setSelection(3)}>
                      <ChevronRight />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="w-full ">
            {selection != 0 && (
              <div className="flex justify-around text-xl ">
                <div className="text-gray-300" onClick={() => setSelection(0)}>
                  Cancel
                </div>
                <div className="text-gray-200">
                  {selection == 1 ? "Name" : selection == 2 ? "Email" : "Bio"}
                </div>
                <div className="text-gray-700">Save</div>
              </div>
            )}
            {selection === 1 && (
              <div className="px-5 py-10 w-full">
                <div className="text-gray-400 px-2 mb-1">Edit Name</div>
                <input
                  className="w-full  py-5 px-4 bg-[#1d212787] text-gray-100  rounded-xl outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            {selection === 2 && (
              <div className="px-5 py-10 w-full">
                <div className="text-gray-400 px-2 mb-1">Edit Email</div>
                <input
                  className="w-full  py-5 px-4 bg-[#1d212787] text-gray-100  rounded-xl outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            {selection === 3 && (
              <div className="px-5 py-10 w-full">
                <div className="text-gray-400 px-2 mb-1">Edit Bio</div>
                <input
                  className="w-full  py-5 px-4 bg-[#1d212787] text-gray-100  rounded-xl outline-none"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
