import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
function Welcome() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      if (!name || !email || !password) {
        toast.warn("Fill all the fields");
        return;
      }
      let res = await axios.post(
        "http://localhost:5000/auth/register",
        { name, email, password },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setEmail("");
      setName("");
      setPassword("");
      setLogin(true);
      toast("Login to get started");
    } catch (err) {
      toast(err.response.data.message);
    }
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) {
        toast.warn("Fill all the fields");
        return;
      }
      let res = await axios.post(
        "http://localhost:5000/auth/login",
        { email, password },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      navigate("/app");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <div className="font-mono">
        <nav className="w-full bg-[#F9F5EC] h-15 px-5 py-3 flex justify-between md:justify-around items-baseline border-b-2  fixed ">
          <div className=" text-3xl font-bold italic">2dChat</div>
          <div className="flex gap-5 md:gap-10 items-center font-semibold ">
            <div className="">About Us</div>
            <div className="">Contact</div>
          </div>
        </nav>
        <div className="bg-[#F9F5EC]">
          <div className=" flex flex-col justify-center items-center h-screen">
            <div className="text-3xl ">
              Welcome to{" "}
              <span className="text-4xl font-extrabold text-[#F47256] text-shadow-lg">
                2dChat
              </span>
            </div>
            <div className="text-gray-500 mt-3 text-2xl bg-[white] w-full text-center border-2">
              Text all you can!
            </div>
            <a
              className="bg-[#8FB6F1] mt-20 px-5 py-3 rounded border-b-2 border-e-4 border-black shadow-black text-white  active:border-none"
              href="#form"
            >
              Start Texting...
            </a>
          </div>
          <div
            className="flex flex-col  items-center h-screen  justify-center gap-10 "
            id="form"
          >
            <div className="text-2xl md:text-4xl italic">
              {login ? "Welcome back!" : "Fill the form to Register"}
            </div>
            <div className="bg-[#F47256] flex flex-col gap-5 items-center px-5 py-3 rounded-xl  [&>*]:bg-white [&>*]:px-5 [&>*]:py-3 [&>*]:rounded-xl [&>*]:shadow-lg shadow-black ">
              {login ? null : (
                <input
                  type="text"
                  placeholder="Enter Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              )}
              <input
                type="email"
                placeholder="Enter Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <input
              type="button"
              value={login ? "Login" : "Register"}
              onClick={(e) => (login ? handleLogin(e) : handleRegister(e))}
              className="bg-[#8FB6F1] px-5 py-3 rounded border-b-2 border-e-4 border-black text-white active:border-none"
            />
            <div className="">
              {login ? "New Here?" : " Already a user?"}{" "}
              <span className="text-[#8FB6F1]" onClick={() => setLogin(!login)}>
                {login ? "Register instead" : "Sign in instead"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Welcome;
