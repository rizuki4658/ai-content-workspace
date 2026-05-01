"use client"

import * as React from "react"

import type { ContentItem, ContentTone, ContentType } from "@/lib/types/content"

type ContentItemContext = {
  data: ContentItem | null,
  form?: {
    uniqueId?: string | number;
    title: string;
    tone?: ContentTone;
    type: ContentType;
    prompt: string;
    targetAudience?: string;
    keywords?: string;
  },
  isLoading: Boolean
}

type GenerateContentContextType = {
  content: ContentItemContext
  setContent: (targetState: ContentItemContext) => void
}

const GenerateContentContext = React.createContext<GenerateContentContextType | null>(null)

export function useGenerateContent() {
  const context = React.useContext(GenerateContentContext)
  if (!context) throw new Error("useSidebar must be used within GenerateContentProvider")
  return context
}

export function GenerateContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = React.useState<ContentItemContext>({
    data: null,
    isLoading: false,
    form: {
      uniqueId: '',
      title: '',
      tone: "professional",
      type: "blog_idea",
      prompt: ''
    }
  })

  return (
    <GenerateContentContext.Provider value={{ content, setContent }}>
      {children}
    </GenerateContentContext.Provider>
  )
}
