import axios from "axios";
import { CircleCheck, CircleX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
const PostLogin = ({ userid, setshowPostLogin, setLoading }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [bio, setBio] = useState("");
  const [image, setImage] = useState();
  const [imageprev, setImageprev] = useState(false);
  const [imageurl, setImageurl] = useState();
  const imageref = useRef(null);

  const handleimage = (e) => {
    let file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageurl(URL.createObjectURL(file));
      console.log(file);
    }
  };
  const enter = async () => {
    try {
      if (!bio && !image) {
        toast.warn("Enter Something");
        return;
      }
      setLoading(true);
      let res = await axios.put(
        `${BASE_URL}/user/updateprofile`,
        { bio },
        {
          withCredentials: true,
        }
      );

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        let res = await axios.post(`${BASE_URL}/user/editdp`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        });
      }

      toast.success("Welcome");
      setshowPostLogin(false);
      setLoading(false);
    } catch (err) {
      toast.error("something went wrong");
      console.log(err.response);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="fixed h-screen w-screen border bg-transparent backdrop-blur-2xl z-10 flex items-center justify-center ">
        <div className="overflow-hidden py-5 md:w-1/3 md:h-4/6 w-full h-4/6  bg-[#17191A] shadow-2xl border-2 border-sky-500 rounded-xl relative">
          <div
            className={`p-2 transition-all absolute bg-[#1d2127] h-8/10 w-full  bottom-0 left-0 rounded-b-2xl ${
              imageprev ? "translate-y-0 " : "translate-y-full"
            }`}
          >
            <div className="text-center py-3 text-xl text-gray-400">
              Image Preview
            </div>
            <div className=" h-8/10 w-full  my-3 rounded-xl relative ">
              <img
                src={imageurl}
                alt="pic"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 flex w-full justify-around bg-[#1d2127d0] py-3 text-lg">
                <div
                  className="text-red-500"
                  onClick={() => {
                    setImage(null);
                    setImageurl(null);
                    setImageprev(false);
                  }}
                >
                  Remove
                </div>
                <div
                  className="text-gray-400"
                  onClick={() => setImageprev(false)}
                >
                  Ok
                </div>
              </div>
            </div>
          </div>
          <div className=" h-2/10 ">
            <div className="fixed ml-5 my-1 p-1 rounded-full hover:bg-gray-500  text-gray-200"></div>
            <div className="text-gray-400 text-center text-3xl font-semibold">
              Welcome to Blab.com
            </div>
            <div className="text-gray-500 text-center">
              Add following to let your friends find you
            </div>
          </div>
          <div className="h-8/10 w-full flex flex-col md:gap-5 gap-3">
            <div className="flex flex-col gap-5 w-full px-5 ">
              <div className="text-gray-400 px-2 mb-1">
                Enter Profile Picture
              </div>
              <div className="flex justify-around">
                <div
                  className="bg-sky-500 w-1/4 text-center rounded-xl py-2"
                  onClick={() => imageref.current.click()}
                >
                  Choose
                </div>
                {image && (
                  <div
                    className="bg-sky-500 w-1/4 text-center rounded-xl py-2"
                    onClick={() => setImageprev(true)}
                  >
                    View
                  </div>
                )}
              </div>
              <input
                type="file"
                hidden
                ref={imageref}
                onChange={(e) => handleimage(e)}
              />
            </div>
            <div className="px-5   w-full">
              <div className="text-gray-400 px-2 mb-1">
                Write Something about yourself
              </div>

              <div className="text-gray-100 bg-[#1d212787]  px-4 rounded-xl flex justify-between">
                <textarea
                  className="text-gray-400 p-2 mb-1 w-full outline-none min-h-20 max-h-20 "
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <input type="text" />
            </div>
            <div className="flex flex-col items-center w-full gap-4">
              <div
                className="rounded-md py-2 px-9 text-center  text-white  bg-linear-to-r from-sky-500 to-sky-800 border border-sky-500"
                onClick={() => enter()}
              >
                Enter
              </div>
              <div
                className="text-gray-400"
                onClick={() => setshowPostLogin(false)}
              >
                {" "}
                do it later...
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLogin;
