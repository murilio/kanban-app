import { FiPlus } from "react-icons/fi";

export const HeaderPage = () => {
  return (
    <div className="flex justify-between my-6">
      <h2 className="text-4xl font-bold">Project X</h2>

      <button className="flex items-center gap-2 h-9 bg-indigo-100 px-2 rounded border-indigo-500 border text-sm transition hover:bg-indigo-500 hover:text-slate-50"><FiPlus />To Do</button>
    </div>
  )
}