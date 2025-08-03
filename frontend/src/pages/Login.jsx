import { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { socket } from "../../connectSocket";
import { Eye, EyeOff } from "lucide-react";
function Login({ setVerified, setshowPostLogin }) {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [match, setmatch] = useState(true);
  const [showpassword, setShowpasword] = useState(false);
  useEffect(() => {
    if (confirmpassword != "") {
      setmatch(password === confirmpassword);
    } else {
      setmatch(true);
    }
  }, [password, confirmpassword]);
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      if (!name || !email || !password || !confirmpassword) {
        toast.warn("Fill all the fields");
        return;
      }
      if (!match) {
        toast.error("pssword does not match!");
        return;
      }

      let res = await axios.post(
        `${BASE_URL}/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setEmail("");
      setName("");
      setPassword("");
      setVerified(true);
      setshowPostLogin(true);
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.data.message);
    }
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password || !confirmpassword) {
        toast.warn("Fill all the fields");
        return;
      }
      if (!match) {
        toast.error("pssword does not match!");
        return;
      }
      let res = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(res);
      toast.success(res.data.message);

      socket.connect();
      setVerified(true);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer
        position={login ? "top-right" : "top-left"}
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        theme="colored"
        limit={5}
      />
      <div className="w-screen h-screen backdrop-blur-2xl  select-none flex flex-col absolute z-10">
        <div className="h-full flex">
          <div
            className={` text-gray-300 flex transition-all delay-200 ease-in-out  shadow-2xl items-center justify-center h-full w-full md:w-1/2   ${
              login ? "md:opacity-100 " : "md:opacity-0 hidden md:block "
            } `}
          >
            <div className="md:px-40 px-5 h-full w-full flex flex-col justify-center rounded text-lg  bg-[#1d212787] ">
              <div className="text-center text-4xl text-gray-400 font-semibold">
                Welcome Back
              </div>
              <div className="text-center text-gray-600 mt-2 mb-5 text-md font-mono">
                enter your credentials to start
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <label htmlFor="" className="font-mono text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="abc@xyz.com"
                    className="px-3 py-3 outline-none border border-sky-500 rounded-lg placeholder:text-gray-600 "
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-mono text-gray-700">
                    Password
                  </label>
                  <div className="flex relative flex-col">
                    <input
                      type={showpassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="••••••••"
                      className="px-3 py-3 outline-none border border-sky-500 placeholder:text-gray-600"
                    />
                    <div
                      className="absolute  h-full px-5  flex items-center right-0"
                      onClick={() => setShowpasword(!showpassword)}
                    >
                      {showpassword ? <Eye /> : <EyeOff />}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-mono text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type={showpassword ? "text" : "password"}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                    value={confirmpassword}
                    placeholder="••••••••"
                    className={`px-3 py-3 outline-none border ${
                      match ? "border-sky-500" : "border-red-500"
                    }  placeholder:text-gray-600`}
                  />
                </div>
                <div
                  className="text-center bg-gradient-to-r from-blue-900 to-sky-500 py-3 mt-2 hover:from-sky-500 hover:to-blue-900 transition-colors duration-400 ease-out"
                  onClick={(e) => handleLogin(e)}
                >
                  Login
                </div>
                <div className="text-center text-gray-500 font-mono">
                  New Here ?{" "}
                  <span
                    className="text-blue-400"
                    onClick={() => {
                      setLogin(false);
                      setPassword("");
                      setEmail("");
                      setName("");
                      setconfirmpassword("");
                    }}
                  >
                    signup instead
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={` text-gray-300 flex transition-all delay-200 ease-in-out   shadow-2xl items-center justify-center h-full md:w-1/2 w-full ${
              login ? "md:opacity-0 hidden md:block" : "md:opacity-100"
            } `}
          >
            <div className="md:px-40 px-5 h-full w-full flex flex-col justify-center rounded text-lg  bg-[#1d212787] ">
              <div className="text-center text-4xl text-gray-400 font-semibold">
                Register
              </div>
              <div className="text-center text-gray-600 mt-2 mb-5 text-md font-mono">
                enter your credentials to create account
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <label htmlFor="" className="font-mono text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="abc@xyz.com"
                    className="px-3 py-3 outline-none border border-sky-500 rounded-lg placeholder:text-gray-600 "
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-mono text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="John Smith"
                    className="px-3 py-3 outline-none border border-sky-500 rounded-lg placeholder:text-gray-600 "
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-mono text-gray-700">
                    Password
                  </label>
                  <div className="flex relative flex-col">
                    <input
                      type={showpassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="••••••••"
                      className="px-3 py-3 outline-none border border-sky-500 placeholder:text-gray-600"
                    />
                    <div
                      className="absolute  h-full px-5  flex items-center right-0"
                      onClick={() => setShowpasword(!showpassword)}
                    >
                      {showpassword ? <Eye /> : <EyeOff />}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-mono text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type={showpassword ? "text" : "password"}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                    value={confirmpassword}
                    placeholder="••••••••"
                    className={`px-3 py-3 outline-none border ${
                      match ? "border-sky-500" : "border-red-500"
                    }  placeholder:text-gray-600`}
                  />
                </div>
                <div
                  className="text-center bg-gradient-to-r from-blue-900 to-sky-500 py-3 mt-2 hover:from-sky-500 hover:to-blue-900 transition-colors duration-400 ease-out"
                  onClick={(e) => handleRegister(e)}
                >
                  Register
                </div>
                <div className="text-center text-gray-500 font-mono">
                  Already a user ?{" "}
                  <span
                    className="text-blue-400"
                    onClick={() => {
                      setLogin(true);
                    }}
                  >
                    Login instead
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
