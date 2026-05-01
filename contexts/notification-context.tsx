"use client"

import { createContext, useContext } from "react"
import type { ContentItem } from "@/lib/types/content"
import { useCreateNotification } from "@/hooks/use-notifications"
import { ideaStatus } from "@/lib/data/generate"

type NotificationContextValue = {
  notifyContentGenerated: (item: ContentItem) => void
  notifyContentCreated: (item: ContentItem) => void
  notifyContentEdited: (item: ContentItem) => void
  notifyContentDeleted: (item: ContentItem) => void
  notifyContentStatusChanged: (item: ContentItem) => void
  notifyContentFailedGenerated: (item: ContentItem) => void
}

const NotificationContext = createContext<NotificationContextValue | null>(null)

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { mutate: createNotification } = useCreateNotification()

  const notifyContentGenerated = (item: ContentItem) => {
    createNotification({
      type: "content_generated",
      title: "Content generated",
      message: `"${item.title}" has been generated successfully.`,
      contentId: item.id,
      avatar: 'CG'
    })
  }

  const notifyContentFailedGenerated = (item: ContentItem) => {
    createNotification({
      type: "content_failed_generated",
      title: "Failed generate content",
      message: `"${item.title}" failed to generate.`,
      contentId: item.id,
      avatar: 'CF'
    })
  }

  const notifyContentCreated = (item: ContentItem) => {
    createNotification({
      type: item.status === "ready" ? "content_ready" : "content_saved_draft",
      title: "Content created",
      message: `"${item.title}" has been created as "${ideaStatus[item.status]} content".`,
      contentId: item.id,
      avatar: 'CC'
    })
  }

  const notifyContentEdited = (item: ContentItem) => {
    createNotification({
      type: "content_edited",
      title: "Content updated",
      message: `"${item.title}" has been updated.`,
      contentId: item.id,
      avatar: 'CU'
    })
  }

  const notifyContentDeleted = (item: ContentItem) => {
    createNotification({
      type: "content_deleted",
      title: "Content deleted",
      message: `"${item.title}" has been deleted.`,
      contentId: item.id,
      avatar: 'CD'
    })
  }

  const notifyContentStatusChanged = (item: ContentItem) => {
    createNotification({
      type: "content_status_changed",
      title: "Status updated",
      message: `"${item.title}" was moved to ${item.status}.`,
      contentId: item.id,
      avatar: 'SU'
    })
  }

  return (
    <NotificationContext.Provider
      value={{
        notifyContentGenerated,
        notifyContentFailedGenerated,
        notifyContentCreated,
        notifyContentEdited,
        notifyContentDeleted,
        notifyContentStatusChanged,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider")
  }

  return context
}
