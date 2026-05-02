// lib/api/notification.ts
import { db } from "@/lib/db"
import type {
  CreateNotificationPayload,
  NotificationItem,
  NotificationsPaginatedResponse
} from "@/lib/types/notifications"

export async function getNotifications(): Promise<NotificationItem[]> {
  try {
    const notifications = await db.notifications
      .reverse()
      .limit(50)
      .toArray()

    return notifications
  } catch (error) {
    console.error("Failed to fetch notifications:", error)
    return []
  }
}

export async function getNotificationsPaginated({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<NotificationsPaginatedResponse> {
  try {
    const normalizedSearch = search.trim().toLowerCase()
    const offset = (page - 1) * limit

    let collection = db.notifications.toCollection()

    if (normalizedSearch) {
      collection = db.notifications.filter((notification) => {
        return (
          notification.title.toLowerCase().includes(normalizedSearch) ||
          notification.message.toLowerCase().includes(normalizedSearch) ||
          notification.type.toLowerCase().includes(normalizedSearch)
        )
      })
    }

    const total = await collection.count()
    const totalPages = Math.ceil(total / limit) || 1
    const safePage = Math.min(Math.max(page, 1), totalPages)

    const allSorted = await collection.reverse().sortBy("createdAt")
    const data = allSorted.slice(offset, offset + limit)

    const from = total === 0 ? 0 : offset + 1
    const to = Math.min(offset + limit, total)

    return {
      data,
      meta: {
        page: safePage,
        limit,
        total,
        totalPages,
        from,
        to,
        hasPrev: safePage > 1,
        hasNext: safePage < totalPages,
      },
    }
  } catch (error) {
    return {
      data: [],
      meta: {
        page: 1,
        limit,
        total: 0,
        totalPages: 1,
        from: 0,
        to: 0,
        hasPrev: false,
        hasNext: false,
      },
    }
  }
}

export async function createNotification(
  payload: CreateNotificationPayload
): Promise<NotificationItem> {
  try {
    // Kita buat objek tanpa ID dulu
    const newNotification: Omit<NotificationItem, 'id'> = {
      ...payload,
      isRead: false,
      createdAt: new Date().toISOString(),
    }

    const id = await db.notifications.add(newNotification as NotificationItem)

    return { 
      ...newNotification,
      id 
    } as NotificationItem;
    
  } catch (error) {
    console.error("Failed to create notification:", error)
    throw error
  }
}

export async function markNotificationAsRead(
  id: NotificationItem["id"]
): Promise<NotificationItem | undefined> {
  try {
    // update() hanya mengubah field yang ditentukan
    await db.notifications.update(id, { isRead: true })
    return await db.notifications.get(id)
  } catch (error) {
    return undefined
  }
}

export async function markAllNotificationsAsRead(): Promise<NotificationItem[]> {
  try {
    // modify() sangat sakti untuk update massal tanpa load semua data ke RAM
    await db.notifications.toCollection().modify({ isRead: true })
    return await db.notifications.toArray()
  } catch (error) {
    return []
  }
}

export async function markNotificationAsUnread(
  id: NotificationItem["id"]
): Promise<NotificationItem | undefined> {
  try {
    await db.notifications.update(id, { isRead: false })
    return await db.notifications.get(id)
  } catch (error) {
    return undefined
  }
}

export async function markAllNotificationsAsUnread(): Promise<NotificationItem[]> {
  try {
    await db.notifications.toCollection().modify({ isRead: false })
    return await db.notifications.toArray()
  } catch (error) {
    return []
  }
}

export async function deleteNotification(
  id: NotificationItem["id"]
): Promise<void> {
  try {
    await db.notifications.delete(id)
  } catch (error) {
    console.error("Failed to delete notification:", error)
  }
}
