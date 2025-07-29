function MessageNot({ user, message }) {
  return (
    <div className=" items-center z-50 min-w-[18rem] max-w-md px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-lg font-semibold uppercase">
          {user?.[0] || "?"}
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="font-semibold text-white truncate">{user}</div>
          <div className="text-sm text-white/80 leading-snug truncate">
            {message || "No message provided."}
          </div>
        </div>
      </div>
      <div className="w-2 h-2 rounded-full bg-green-500 fixed top-2 left-2"></div>
    </div>
  );
}

export default MessageNot;
