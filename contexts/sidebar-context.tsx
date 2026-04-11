"use client"

import * as React from "react"

type SidebarContextType = {
  open: boolean
  toggleSidebar: (targetState: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextType | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error("useSidebar must be used within SidebarProvider")
  return context
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const cache = localStorage.getItem("navCollapsed")
    if (cache !== null) {
      setOpen(cache === "false")
    }
    setMounted(true)
  }, [])

  const toggleSidebar = React.useCallback((targetState: boolean) => {
    setOpen(targetState)
    localStorage.setItem("navCollapsed", targetState ? "false" : "true")
  }, [])

  if (!mounted) return null

  return (
    <SidebarContext.Provider value={{ open, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}
