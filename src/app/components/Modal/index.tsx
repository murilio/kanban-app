import { ReactNode, useEffect } from "react"
import { AiFillCloseCircle } from "react-icons/ai"

type TModalProps = {
  isOpen: boolean,
  onClose: () => void,
  children: ReactNode
}

export const Modal = ({ isOpen, onClose, children }: TModalProps) => {
  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="py-8 px-4 bg-white rounded-md relative">
        <button onClick={onClose} className="absolute top-1 right-1"><AiFillCloseCircle size={20} /></button>
        {children}
      </div>
    </div>
  )
}