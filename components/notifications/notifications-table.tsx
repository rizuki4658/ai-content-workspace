import { NotificationItem } from "@/lib/types/notifications"
import { relativeDate } from "@/lib/utils/date-format"
import { BellOff, Mail, MailOpen, Trash2 } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"

type NotificationsTableProps = {
  notifications: NotificationItem[]
  selectedIds: string[]
  isAllSelected: boolean
  isSomeSelected: boolean
  onSelectAll: (checked: boolean) => void
  onSelectRow: (id: string, checked: boolean) => void
  onMarkAsRead: (id: string) => void
  onMarkAsUnread: (id: string) => void
  onDelete: (id: string) => void
}

export default function NotificationsTable({
  notifications,
  selectedIds,
  isAllSelected,
  isSomeSelected,
  onSelectAll,
  onSelectRow,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete
}: NotificationsTableProps) {
  if (!notifications.length) return <div className="border rounded min-h-80 flex flex-col w-full justify-center items-center">
    <BellOff size={80} className="text-muted-foreground opacity-50" />
    <p className="text-muted-foreground">Nothing to see here</p>
  </div>

  return (
    <div className="border rounded">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={
                  isAllSelected
                    ? true
                    : isSomeSelected
                      ? "indeterminate"
                      : false
                }
                disabled={!notifications.length}
                onCheckedChange={(checked) =>
                  onSelectAll(checked === true)
                }
                aria-label="Select all notifications"
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {notifications.map((notification) => {
            const isSelected = selectedIds.includes(notification.id)

            return (
              <TableRow key={notification.id} className="group">
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      onSelectRow(notification.id, checked === true)
                    }
                    aria-label={`Select ${notification.title}`}
                  />
                </TableCell>

                <TableCell className={`${!notification.isRead && "font-bold"} text-muted-foreground`}>{notification.title}</TableCell>
                <TableCell className={`${!notification.isRead && "font-bold"} text-muted-foreground`}>{notification.message}</TableCell>
                <TableCell className={`${!notification.isRead && "font-bold"} text-muted-foreground`}>
                  {relativeDate(notification.createdAt)}
                </TableCell>

                <TableCell>
                  <div className="group-hover:visible lg:invisible flex items-center justify-end gap-2">
                    {!notification.isRead ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onMarkAsRead(notification.id)}>
                            <MailOpen />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Mark as read</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : null}

                    {!!notification.isRead ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onMarkAsUnread(notification.id)}>
                            <Mail />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Mark as unread</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : null}

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => onDelete(notification.id)}>
                          <Trash2 />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete notification</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}