'use client'

import { ModalProvider } from "@/app/context/ModalContext"
import { ReactNode } from "react"
import { Header } from "../Header"

export const LayoutWidget = ({ children }: { children: ReactNode }) => {
  return (
    <ModalProvider>
      <Header />
      <div className="flex p-4">
        {/* <nav>Menu</nav> */}
        <main className="grow">
          {children}
        </main>
      </div>
    </ModalProvider>
  )
}