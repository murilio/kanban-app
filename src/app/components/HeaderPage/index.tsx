import { FiPlus } from "react-icons/fi";

interface IHeaderPageProps {
  onClick: () => void
}

export const HeaderPage = ({ onClick }: IHeaderPageProps) => {
  return (
    <div className="flex items-center my-6">
      <h2 className="text-4xl font-bold">Project X</h2>
      <span className="block mx-8 min-h-10 w-[1px] bg-slate-200" />
      <button onClick={onClick} className="flex items-center gap-2 h-9 bg-indigo-100 px-2 rounded border-indigo-500 border text-sm transition hover:bg-indigo-500 hover:text-slate-50"><FiPlus />To Do</button>
    </div>
  )
}