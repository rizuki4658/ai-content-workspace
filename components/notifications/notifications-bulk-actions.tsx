import { Mail, MailOpen, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type NotificationsBulkActionsProps = {
  selectedCount: number
  hasSelectedUnread: boolean
  hasSelectedRead: boolean
  disabled?: boolean
  onMarkAsRead: () => void
  onMarkAsUnread: () => void
  onDelete: () => void
  onClear: () => void
}

export default function NotificationBulkActions({
  selectedCount,
  hasSelectedUnread,
  hasSelectedRead,
  disabled,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  onClear
}: NotificationsBulkActionsProps) {
  if (!selectedCount) return null

  return (
    <div className="flex flex-col gap-3 rounded-md border bg-muted/40 p-3 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-muted-foreground">
        {selectedCount} notification
        {selectedCount > 1 ? "s" : ""} selected
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {hasSelectedUnread ? (
          <Button
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={onMarkAsRead}
          >
            <MailOpen />
            Mark as read
          </Button>
        ) : null}

        {hasSelectedRead ? (
          <Button
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={onMarkAsUnread}
          >
            <Mail />
            Mark as unread
          </Button>
        ) : null}

        <Button
          variant="destructive"
          size="sm"
          disabled={disabled}
          onClick={onDelete}
        >
          <Trash2 />
          Delete
        </Button>

        <Button
          variant="ghost"
          size="sm"
          disabled={disabled}
          onClick={onClear}
        >
          <X />
          Clear
        </Button>
      </div>
    </div>
  )
}
