'use client'

import { ModalProvider } from "@/app/context/ModalContext"
import { ReactNode } from "react"
import { Header } from "../components/Header"

export const LayoutWidget = ({ children }: { children: ReactNode }) => {
  return (
    <ModalProvider>
      <Header />
      <div className="flex p-4">
        {/* <nav>Menu</nav> */}
        <main className="grow pb-2 overflow-x-scroll">
          {children}
        </main>
      </div>
    </ModalProvider>
  )
}