"use client"

import * as React from "react"

import type { ContentItem } from "@/lib/types/content"

type GenerateContentContextType = {
  content: ContentItem | null
  setContent: (targetState: ContentItem | null) => void
}

const GenerateContentContext = React.createContext<GenerateContentContextType | null>(null)

export function useGenerateContent() {
  const context = React.useContext(GenerateContentContext)
  if (!context) throw new Error("useSidebar must be used within GenerateContentProvider")
  return context
}

export function GenerateContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = React.useState<ContentItem | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <GenerateContentContext.Provider value={{ content, setContent }}>
      {children}
    </GenerateContentContext.Provider>
  )
}
