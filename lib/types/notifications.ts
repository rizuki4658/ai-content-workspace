export type NotificationType =
  | "content_generated"
  | "content_published"
  | "content_failed"
  | "system"
  | "reminder";

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  avatar: string;
  expand?: boolean
};