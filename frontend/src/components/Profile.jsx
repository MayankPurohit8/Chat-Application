import { useEffect, useRef, useState } from "react";
import { socket } from "../../connectSocket";
import axios from "axios";
import {
  Binary,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleX,
  Image,
  LogOut,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

function Profile({ setProfile, setVerified, setAll }) {
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [selection, setSelection] = useState(0);
  const [save, setSave] = useState(false);
  const [validusername, setValidusername] = useState(false);
  const [editpic, seteditpic] = useState(false);
  const [image, setImage] = useState(null);
  const imageref = useRef(null);
  const [imageprev, setImageprev] = useState(false);
  const [prevURL, setprevURL] = useState(null);
  const [dp, setDp] = useState("");

  const getProfile = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/user/profile`, {
        withCredentials: true,
      });

      setUser(res.data);
      setName(res.data.name);
      setUsername(res.data.username);
      setBio(res.data.bio);
      setDp(res.data.dp);
    } catch (err) {}
  };
  useEffect(() => {
    getProfile();
  }, [image]);

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
        let res = await axios.get(`${BASE_URL}/user/checkvalidusername`, {
          params: {
            username: username,
          },
          withCredentials: true,
        });
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
      let res = await axios.put(`${BASE_URL}/user/updateprofile`, tobeupdated, {
        withCredentials: true,
      });
      setSelection(0);
      toast.success("updated");
      getProfile();
    } catch (err) {}
  };

  const logout = async (req, res) => {
    try {
      let res = await axios.post(
        `${BASE_URL}/user/logout`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      toast.success("Logged Out");
      setVerified(false);
      setUser(null);
      setProfile(false);
      socket.disconnect();
      setAll(null);
    } catch (err) {
      console.log(err);
    }
  };
  const handlefile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      setprevURL(URL.createObjectURL(file));
      setImageprev(true);
    }
  };
  const handleUpload = async () => {
    try {
      let formData = new FormData();
      formData.append("image", image);
      let res = await axios.post(`${BASE_URL}/user/editdp`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success("Profile Picture Changed");
      setImageprev(false);
      setImage(null);
      console.log(res);

      seteditpic(false);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteDp = async () => {
    let res = axios.post(
      `${BASE_URL}/user/deletedp`,
      {},
      { withCredentials: true }
    );
    toast.success("Profile Picture deleted");
    setImageprev(false);
    setImage(null);
    seteditpic(false);
    setDp("");
  };
  return (
    <>
      <ToastContainer theme="colored" />
      <div className="fixed h-screen w-screen border bg-transparent backdrop-blur-2xl z-10 flex items-center justify-center ">
        <div className="overflow-hidden relative py-5  md:w-1/3 md:h-8/10 w-full h-4/6  bg-[#17191A] shadow-2xl border-2 border-sky-500 rounded-xl flex flex-col gap-20">
          <div
            className={`p-2 transition-all absolute bg-[#1d2127] h-4/10 w-full bottom-0 left-0 rounded-b-2xl ${
              editpic ? "translate-y-0 " : "translate-y-full"
            }`}
          >
            <div className=" text-2xl text-gray-400 text-center h-2/10">
              Edit Profile Picture
              <div
                className="absolute right-5 top-4  "
                onClick={() => seteditpic(false)}
              >
                <X />
              </div>
            </div>

            <div className="flex flex-col  px-5  py-6 items-center h-8/10 justify-around text-lg cursor-pointer">
              <div
                className="text-gray-500 flex justify-around w-full bg-[#2a3038] py-3 rounded-xl active:scale-105"
                onClick={() => imageref.current.click()}
              >
                Choose Photo <Image />
                <input
                  type="file"
                  className="hidden"
                  ref={imageref}
                  onChange={(e) => handlefile(e)}
                />
              </div>
              <div
                onClick={() => deleteDp()}
                className="text-red-500 flex justify-around w-full bg-[#2a3038] py-3 rounded-xl  active:scale-105"
              >
                Delete Photo <Trash2 />
              </div>
            </div>
          </div>
          <div
            className={`p-2 transition-all absolute bg-[#1d2127] h-8/10 w-full bottom-0 left-0 rounded-b-2xl ${
              imageprev ? "translate-y-0 " : "translate-y-full"
            }`}
          >
            <div className="text-center py-3 text-xl text-gray-400">
              Image Preview
            </div>
            <div className=" h-8/10 w-full mx-5 my-3 rounded-xl relative ">
              <img
                src={prevURL}
                alt="pic"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 flex w-full justify-around bg- bg-[#1d2127d0] py-3 text-lg">
                <div
                  className="text-red-500"
                  onClick={() => {
                    setImageprev(null);
                    setImage(null);
                  }}
                >
                  Cancel
                </div>
                <div className="text-gray-400" onClick={() => handleUpload()}>
                  Choose
                </div>
              </div>
            </div>
          </div>
          {selection == 0 && (
            <div className=" h-1/10 flex justify-around items-center">
              <div
                className=" rounded-full hover:bg-gray-500  text-gray-200"
                onClick={() => setProfile(false)}
              >
                <ChevronLeft />
              </div>
              <div className="text-gray-400 text-center text-3xl font-semibold">
                Profile
              </div>
              <div
                className="flex   group relative rounded-xl text-gray-400 hover:text-red-500 "
                onClick={() => logout()}
              >
                <LogOut size={25} />
                <div className="group-hover:opacity-100 opacity-0 absolute text-sm -bottom-10 -left-5 rounded-3xl bg-gray-300 px-2 py-1 text-black transition-all  ">
                  logout
                </div>
              </div>
            </div>
          )}
          {selection == 0 && (
            <div className=" flex  flex-col items-center justify-between h-9/10">
              <div className="w-full h-2/5 flex flex-col items-center justify-center gap-4">
                <div className=" w-30 h-30 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  {dp ? (
                    <img
                      src={dp}
                      className="w-full h-full object-cover"
                      alt="dp"
                    />
                  ) : (
                    <span className="text-3xl font-bold">
                      {name[0]?.toUpperCase()}
                    </span>
                  )}
                </div>

                <div
                  className="h-1/5 text-sky-500"
                  onClick={() => {
                    seteditpic(true);
                  }}
                >
                  Edit
                </div>
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
