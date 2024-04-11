import Image from "next/image";
import { FiSearch } from "react-icons/fi";

export const Header = () => {
  return (
    <header className="flex items-center h-20 gap-10 w-full px-4 border border-b-gray-300">
      <div className="flex items-center gap-2">
        <Image
          src='/images/logo.png'
          width={30}
          height={30}
          alt="Logo"
        />
        <p className="text-sm font-bold">Kanban App</p>
      </div>

      <div className="flex items-center bg-gray-100 rounded-md px-4">
        <FiSearch className="text-xl text-slate-500" />

        <input
          type="text"
          placeholder="Search for anything..."
          className="min-w-96 h-11 text-sm bg-transparent px-2 text-slate-500 outline-none" />
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