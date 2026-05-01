// lib/api/notification.ts

import type {
  CreateNotificationPayload,
  NotificationItem,
  NotificationsPaginatedResponse
} from "@/lib/types/notifications"
import { generateId } from "@/lib/utils/generator-id"

const STORAGE_KEY = process.env.NOTIFICATIONS_STORAGE_KEY || 'ai-content-workspace-notifications'

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

function getStoredNotifications(): NotificationItem[] {
  if (typeof window === "undefined") return []

  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) return []

  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function setStoredNotifications(notifications: NotificationItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
}

export async function getNotifications(): Promise<NotificationItem[]> {
  await wait(300)

  return getStoredNotifications().sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 50)
}

export async function getNotificationsPaginated({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number
  limit?: number
  search?: string
}): Promise<NotificationsPaginatedResponse> {
  await wait(300)

  const normalizedSearch = search.trim().toLowerCase()

  const notifications = getStoredNotifications()
    .filter((notification) => {
      if (!normalizedSearch) return true

      return (
        notification.title.toLowerCase().includes(normalizedSearch) ||
        notification.message.toLowerCase().includes(normalizedSearch) ||
        notification.type.toLowerCase().includes(normalizedSearch)
      )
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

  const total = notifications.length
  const totalPages = Math.ceil(total / limit) || 1

  const safePage = Math.min(Math.max(page, 1), totalPages)

  const start = (safePage - 1) * limit
  const end = start + limit

  const data = notifications.slice(start, end)

  return {
    data,
    meta: {
      page: safePage,
      limit,
      total,
      totalPages,
      from: total === 0 ? 0 : start + 1,
      to: Math.min(end, total),
      hasPrev: safePage > 1,
      hasNext: safePage < totalPages,
    },
  }
}

export async function createNotification(
  payload: CreateNotificationPayload
): Promise<NotificationItem> {
  await wait(300)

  const notifications = getStoredNotifications()

  const notification: NotificationItem = {
    id: generateId(),
    ...payload,
    isRead: false,
    createdAt: new Date().toISOString(),
  }

  setStoredNotifications([notification, ...notifications])

  return notification
}

export async function markNotificationAsRead(
  id: NotificationItem["id"]
): Promise<NotificationItem | undefined> {
  await wait(300)

  const notifications = getStoredNotifications()

  const updatedNotifications = notifications.map((notification) =>
    notification.id === id
      ? {
          ...notification,
          isRead: true,
        }
      : notification
  )

  setStoredNotifications(updatedNotifications)

  return updatedNotifications.find((notification) => notification.id === id)
}

export async function markAllNotificationsAsRead(): Promise<NotificationItem[]> {
  await wait(300)

  const notifications = getStoredNotifications()

  const updatedNotifications = notifications.map((notification) => ({
    ...notification,
    isRead: true,
  }))

  setStoredNotifications(updatedNotifications)

  return updatedNotifications
}

export async function markNotificationAsUnread(
  id: NotificationItem["id"]
): Promise<NotificationItem | undefined> {
  await wait(300)

  const notifications = getStoredNotifications()

  const updatedNotifications = notifications.map((notification) =>
    notification.id === id
      ? {
          ...notification,
          isRead: false,
        }
      : notification
  )

  setStoredNotifications(updatedNotifications)

  return updatedNotifications.find((notification) => notification.id === id)
}

export async function markAllNotificationsAsUnread(): Promise<NotificationItem[]> {
  await wait(300)

  const notifications = getStoredNotifications()

  const updatedNotifications = notifications.map((notification) => ({
    ...notification,
    isRead: false,
  }))

  setStoredNotifications(updatedNotifications)

  return updatedNotifications
}

export async function deleteNotification(
  id: NotificationItem["id"]
): Promise<void> {
  await wait(300)

  const notifications = getStoredNotifications()

  setStoredNotifications(
    notifications.filter((notification) => notification.id !== id)
  )
}
