import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Edit } from "lucide-react";
function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getProfile = async () => {
      try {
        let res = await axios.get("http://localhost:5000/user/profile", {
          withCredentials: true,
        });

        setUser(res.data);
      } catch (err) {}
    };
    getProfile();
  }, []);
  return (
    <>
      <div className="h-screen bg-[#F9F5EC] ">
        <Navbar />
        {user && (
          <div className="h-9/10 flex flex-col md:flex-row py-5 gap-5 p-2 [&>*]:border">
            <div className="border-2 border-white md:w-1/3 h-1/2 md:h-full  flex items-center justify-center  bg-[#C5C6FF] rounded-r-2xl ">
              <div className="border-b-10  rounded-full md:w-100 md:h-100 w-50 h-50 bg-gray-100 flex items-center justify-center md:text-9xl text-5xl font-bold">
                {user.name[0].toUpperCase()}
              </div>
            </div>
            <div className="md:w-2/3 md:h-full h-1/2 border-2 flex flex-col  px-3 py-10 gap-5 [&>*]:border-2">
              <div className="flex justify-between items-center py-5 px-10 border-none">
                <div className=" px-5 py-3 bg-[#FD5A47] text-white text-xl rounded-xl border border-black border-e-4 ">
                  Logout
                </div>
                <div className="">
                  <Edit />
                </div>
              </div>
              <div className="flex gap-3 items-baseline  px-7 py-5 rounded-xl">
                <div className="text-3xl font-semibold">Name: </div>
                <div className="text-xl">{user.name}</div>
              </div>
              <div className="flex gap-3 items-baseline px-7 py-5 rounded-xl">
                <div className="text-3xl font-semibold">Email: </div>
                <div className="text-xl">{user.email}</div>
              </div>
              <div className="flex gap-3   px-7 py-5 rounded-xl ">
                <div className="text-3xl font-semibold">Bio: </div>
                <div className="text-xl overflow-auto h-20 ">{user.bio}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Profile;
