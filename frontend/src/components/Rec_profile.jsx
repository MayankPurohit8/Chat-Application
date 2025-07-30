function Rec_profile({ to, online }) {
  return (
    <>
      <div className="border-2 h-full  bg-white ">
        <div className="h-1/2  "></div>
        <div className="bg-[#1D2127] h-1/2 flex flex-col px-7 py-10 gap-2 rounded-t-2xl">
          <div className="text-5xl text-gray-400">{to.name.toUpperCase()}</div>
          {online && (
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div className="text-green-500">online</div>
            </div>
          )}

          <div className="text-gray-500 overflow-y-auto ">{to.bio}</div>
        </div>
      </div>
    </>
  );
}
export default Rec_profile;
