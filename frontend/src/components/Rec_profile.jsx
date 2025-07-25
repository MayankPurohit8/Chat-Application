function Rec_profile({ to }) {
  return (
    <>
      <div className="border-2  h-full  ">
        <div className="fixed"></div>
        <div className="h-1/2 "></div>
        <div className="bg-[#C5C6FF] h-1/2 rounded-t-3xl flex flex-col px-7 py-10 gap-2">
          <div className="text-5xl">{to.name.toUpperCase()}</div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-green-600 rounded-full"></div>
            <div className="">online</div>
          </div>
          <div className="text-gray-500 overflow-y-auto ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quis
            tempore maxime rem, commodi aperiam voluptates ratione et
            laboriosam! Iusto ipsum reprehenderit quibusdam laboriosam nesciunt.
          </div>
        </div>
      </div>
    </>
  );
}
export default Rec_profile;
