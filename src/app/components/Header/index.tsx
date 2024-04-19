import Image from "next/image";
import { FiSearch } from "react-icons/fi";

export const Header = () => {
  return (
    <header className="flex items-center h-20 gap-5 w-full px-4 border border-b-gray-300">
      <div className="flex items-center gap-2 w-60">
        <Image
          src='/images/logo.png'
          width={30}
          height={30}
          alt="Logo"
        />
        <p className="text-sm font-bold">Kanban App</p>
      </div>

      <div className="hidden md:flex relative">
        <FiSearch className="text-xl text-slate-500 absolute left-2 top-1/2 -translate-y-1/2" />

        <input
          type="text"
          placeholder="Search for anything..."
          className="min-w-96 h-11 text-sm pl-10 bg-gray-100 text-slate-500 outline-none rounded" />
      </div>

      <Image
        src='/images/profile.png'
        width={40}
        height={40}
        alt="Profile"
        className="rounded-full ml-auto"
      />
    </header>
  )
}