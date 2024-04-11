import { ReactNode, createContext, useContext, useState } from "react";

export interface IModalContext {
  isModalOpen: boolean
  handleModal: () => void
}

const ModalContext = createContext<IModalContext>({ isModalOpen: false, handleModal: () => { } })

export const useModal = (): IModalContext => useContext(ModalContext)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <ModalContext.Provider value={{ isModalOpen, handleModal }}>
      {children}
    </ModalContext.Provider>
  )
}