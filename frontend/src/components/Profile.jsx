import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { ChevronLeft, ChevronRight, CircleCheck, CircleX } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
function Profile({ setProfile }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [selection, setSelection] = useState(0);
  const [save, setSave] = useState(false);
  const [validusername, setValidusername] = useState(false);
  const getProfile = async () => {
    try {
      let res = await axios.get("http://localhost:5000/user/profile", {
        withCredentials: true,
      });

      setUser(res.data);
      setName(res.data.name);
      setUsername(res.data.username);
      setBio(res.data.bio);
    } catch (err) {}
  };
  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (selection === 1 && name != user?.name) {
      setSave(true);
      return;
    }
    if (selection === 2 && username != user?.username) {
      setSave(true);
      return;
    }
    if (selection === 3 && name != user?.bio) {
      setSave(true);
      return;
    }
    setSave(false);
  }, [name, username, bio]);

  useEffect(() => {
    const checkValid = async (e) => {
      try {
        if (username === "") {
          setValidusername(false);
          return;
        }
        let res = await axios.get(
          "http://localhost:5000/user/checkvalidusername",
          {
            params: {
              username: username,
            },
            withCredentials: true,
          }
        );
        console.log(res.data);
        setValidusername(true);
      } catch (err) {
        setValidusername(false);
      }
    };
    checkValid();
  }, [username]);
  const updateProfile = async () => {
    if (!save) return;
    if (username == "" || name == "") {
      toast.warn("type something!");
      return;
    }
    if (selection == 2 && !validusername) return;
    const tobeupdated = { userid: user.id };
    if (selection == 1) tobeupdated.name = name;
    else if (selection == 2) tobeupdated.username = username;
    else if (selection == 3) tobeupdated.bio = bio;
    try {
      let res = await axios.put(
        "http://localhost:5000/user/updateprofile",
        tobeupdated,
        { withCredentials: true }
      );
      setSelection(0);
      toast.success("updated");
      getProfile();
    } catch (err) {}
  };

  return (
    <>
      <ToastContainer theme="colored" />
      <div className="fixed h-screen w-screen border bg-transparent backdrop-blur-2xl z-10 flex items-center justify-center ">
        <div className="py-5 md:w-1/3 md:h-8/10 w-full h-4/6  bg-[#17191A] shadow-2xl border-2 border-sky-500 rounded-xl flex flex-col gap-20">
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
              <div className="w-full h-1/5 flex flex-col items-center justify-center gap-4">
                <div className="bg-white text-center p-15 rounded-full flex items-center justify-center text-3xl font-bold">
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
                  <div className="text-gray-500 px-2">Username</div>
                  <div className="text-gray-100 bg-[#1d212787] py-3 px-4 rounded-xl flex justify-between">
                    <div className="">{username}</div>
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
                <div
                  className="text-gray-300 cursor-pointer"
                  onClick={() => {
                    setSelection(0);
                    setName(user?.name);
                    setUsername(user?.username);
                    setBio(user?.bio);
                  }}
                >
                  Cancel
                </div>
                <div className="text-gray-200">
                  {selection == 1
                    ? "Name"
                    : selection == 2
                    ? "Username"
                    : "Bio"}
                </div>
                <div
                  onClick={() => {
                    updateProfile();
                  }}
                  className={`${
                    save
                      ? "text-gray-200 cursor-pointer"
                      : "text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Save
                </div>
              </div>
            )}
            {selection === 1 && (
              <div className="px-5 py-10 w-full">
                <div className="text-gray-400 px-2 mb-1">Edit Name</div>

                <div className="text-gray-100 bg-[#1d212787] py-3 px-4 rounded-xl flex justify-between">
                  <input
                    className="text-gray-400 px-2 mb-1 w-full outline-none "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}
            {selection === 2 && (
              <div className="px-5 py-10 w-full">
                <div className="text-gray-400 px-2 mb-1 ">Edit Username</div>
                <div className="flex bg-[#1d212787] rounded-xl items-center ">
                  <input
                    className="w-full  py-5 px-4  text-gray-100   outline-none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {username != "" && (
                    <div className="px-5">
                      {validusername ? (
                        <CircleCheck color="green" />
                      ) : (
                        <CircleX color="red" />
                      )}
                    </div>
                  )}
                </div>
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
