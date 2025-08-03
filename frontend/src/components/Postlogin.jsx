import axios from "axios";
import { CircleCheck, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const PostLogin = ({ userid, setshowPostLogin }) => {
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [validusername, setValidusername] = useState(false);

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

  const enter = async () => {
    try {
      if (!validusername) return;
      let res = await axios.put(
        `${BASE_URL}/user/updateprofile`,
        {
          userid,
          username,
          bio,
        },
        { withCredentials: true }
      );
      toast.success("Welcome");
      setshowPostLogin(false);
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <>
      <div className="fixed h-screen w-screen border bg-transparent backdrop-blur-2xl z-10 flex items-center justify-center ">
        <div className="py-5 md:w-1/3 md:h-4/6 w-full h-3/6  bg-[#17191A] shadow-2xl border-2 border-sky-500 rounded-xl">
          <div className=" h-1/10">
            <div className="fixed ml-5 my-1 p-1 rounded-full hover:bg-gray-500  text-gray-200"></div>
            <div className="text-gray-400 text-center text-3xl font-semibold">
              Welcome to Blab.com
            </div>
            <div className="text-gray-500 text-center">
              Choose a unique username to continue!
            </div>
          </div>
          <div className="h-9/10 flex flex-col justify-around ">
            <div className="">
              <div className="px-5 py-10 w-full">
                <div className="text-gray-400 px-2 mb-1">Enter Username</div>

                <div className="text-gray-100 bg-[#1d212787] py-3 px-4 rounded-xl flex justify-between">
                  <input
                    className="text-gray-400 px-2 mb-1 w-full outline-none "
                    value={username}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                  {username != "" && (
                    <div className="">
                      {validusername ? (
                        <CircleCheck color="green" />
                      ) : (
                        <CircleX color="red" />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="px-5  w-full">
                <div className="text-gray-400 px-2 mb-1">
                  Tell Something about yourself
                </div>

                <div className="text-gray-100 bg-[#1d212787] py-3 px-4 rounded-xl flex justify-between">
                  <input
                    value={bio}
                    className="text-gray-400 px-2 mb-1 w-full outline-none "
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-700 px-3">
                  Visible to everyone
                </div>
              </div>
            </div>
            <button
              onClick={() => enter()}
              className={` ${
                validusername
                  ? " bg-linear-to-r from-sky-500 to-[#2B32BD]  cursor-pointer"
                  : "bg-gray-600 cursor-not-allowed"
              } mx-10 rounded-md text-white  py-4 px-3 text-center bg-gray-600 text-xl font-semibold transition-all ease-in-out  duration-75 delay-75`}
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLogin;
