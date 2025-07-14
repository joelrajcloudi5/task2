import { FiMenu, FiSearch } from "react-icons/fi";

export default function NavBar() {
  return (
    <div className="fixed items-center gap-3 bg-[#4A154B] p-4 z-5 w-full flex justify-between">
      <div className="relative w-[800px] max-w-sm">
        <input
          type="text"
          placeholder="Search for Orders"
          className="w-full pl-4 pr-10 py-2 rounded-md border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />
        <span className="absolute right-3 top-2.5 text-white">
          <FiSearch />
        </span>
      </div>
    </div>
  );
}
