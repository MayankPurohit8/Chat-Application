import { Link } from "react-router";
function Navbar({ section = "A" }) {
  return (
    <nav
      className={`w-full bg-[#F9F5EC] h-1/10 px-5 py-3  justify-between md:justify-around items-baseline border-b-2  ${
        section == "B" ? "hidden md:flex" : "flex"
      }`}
    >
      <Link to="/app" className=" text-3xl font-bold italic">
        2dChat
      </Link>
      <div className="flex gap-4 md:gap-10 items-center md:font-semibold  text-sm md:text-lg">
        <div className="">About Us</div>
        <div className="">Contact</div>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}
export default Navbar;
