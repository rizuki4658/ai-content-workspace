export type NotificationType =
  | "content_generated"
  | "content_failed_generated"
  | "content_saved_draft"
  | "content_ready"
  | "content_status_changed"
  | "content_edited"
  | "content_deleted"
  | "content_published"

export type NotificationItem = {
  id: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  contentId?: string
  createdAt: string
  avatar: string
  expand?: boolean
}

export type CreateNotificationPayload = {
  type: NotificationType
  title: string
  message: string
  contentId?: string
  avatar: string
}

export interface NotificationsPaginatedResponse {
  data?: NotificationItem[],
  meta?: {
    page?: number,
    limit?: number,
    total?: number,
    totalPages?: number,
    from?: number,
    to?: number,
    hasPrev?: boolean,
    hasNext?: boolean,
  },
}
