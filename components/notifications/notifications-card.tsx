"use client"

import { useEffect, useMemo, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  useDeleteNotification,
  useMarkAllNotificationsAsRead,
  useMarkAllNotificationsAsUnread,
  useMarkNotificationAsRead,
  useMarkNotificationAsUnread,
  useNotifications,
  useNotificationsPaginated,
} from "@/hooks/use-notifications"
import {
  Mail,
  MailOpen,
  Search
} from "lucide-react"
import NotificationsPagination from "./notifications-pagination"
import NotificationsTable from "./notifications-table"
import NotificationBulkActions from "./notifications-bulk-actions"
import NotificationsCardSkeleton from "./skeletons/notifications-card-skeleton"
import NotificationsTableSkeleton from "./skeletons/notifications-table-skeleton"

export default function NotificationsCard() {
  const {
    data: notificationsAll = [],
    isFetching: isFetchingAll,
    isLoading: isLoadingAll,
  } = useNotifications()

  const {
    mutateAsync: onMarkAllAsReads,
    isPending: isMarkingAllAsRead,
  } = useMarkAllNotificationsAsRead()

  const {
    mutateAsync: onMarkAllAsUnreads,
    isPending: isMarkingAllAsUnread,
  } = useMarkAllNotificationsAsUnread()

  const {
    mutateAsync: onMarkAsRead,
    isPending: isMarkingAsRead,
  } = useMarkNotificationAsRead()

  const {
    mutateAsync: onMarkAsUnread,
    isPending: isMarkingAsUnread,
  } = useMarkNotificationAsUnread()

  const {
    mutateAsync: onDeleteNotification,
    isPending: isDeletingNotification,
  } = useDeleteNotification()

  const unreadCount = notificationsAll.filter((item) => !item.isRead).length

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const debouncedSearch = useDebounce(search, 500)

  const {
    data: dataPaginated,
    isLoading: isLoadingPaginated,
    isFetching: isFetchingPaginated,
  } = useNotificationsPaginated({
    page,
    limit: 10,
    search: debouncedSearch,
  })

  const notifications = dataPaginated?.data ?? []
  const meta = dataPaginated?.meta
  const isInitialLoading = isLoadingAll || isLoadingPaginated

  const isActionLoading =
    isMarkingAllAsRead ||
    isMarkingAllAsUnread ||
    isDeletingNotification

  const isTableLoading =
    !isInitialLoading &&
    (
      isFetchingAll ||
      isFetchingPaginated ||
      isActionLoading
    )

  const currentPageIds = useMemo(
    () => notifications.map((notification) => notification.id),
    [notifications]
  )

  const selectedNotifications = useMemo(
    () =>
      notificationsAll.filter((notification) =>
        selectedIds.includes(notification.id)
      ),
    [notificationsAll, selectedIds]
  )

  const hasSelected = selectedIds.length > 0
  const hasSelectedUnread = selectedNotifications.some((item) => !item.isRead)
  const hasSelectedRead = selectedNotifications.some((item) => item.isRead)

  const isAllSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIds.includes(id))

  const isSomeSelected =
    currentPageIds.some((id) => selectedIds.includes(id)) && !isAllSelected

  const isBulkLoading =
    isLoadingAll ||
    isFetchingAll ||
    isLoadingPaginated ||
    isFetchingPaginated ||
    isActionLoading

  const onSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const onSelectAllCurrentPage = (checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => {
        const next = new Set(prev)

        currentPageIds.forEach((id) => {
          next.add(id)
        })

        return Array.from(next)
      })

      return
    }

    setSelectedIds((prev) =>
      prev.filter((id) => !currentPageIds.includes(id))
    )
  }

  const onSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => {
        if (prev.includes(id)) return prev

        return [...prev, id]
      })

      return
    }

    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id))
  }

  const onClearSelected = () => {
    setSelectedIds([])
  }

  const onAllReads = async () => {
    await onMarkAllAsReads({
      refetch: true,
      invalidate: "all",
    })
  }

  const onAllUnreads = async () => {
    await onMarkAllAsUnreads({
      refetch: true,
      invalidate: "all",
    })
  }

  const onSelectedReads = async () => {
    await Promise.all(
      selectedIds.map((id) =>
        onMarkAsRead({
          id,
          refetch: false,
        })
      )
    )

    setSelectedIds([])
  }

  const onSelectedUnreads = async () => {
    await Promise.all(
      selectedIds.map((id) =>
        onMarkAsUnread({
          id,
          refetch: false,
        })
      )
    )

    setSelectedIds([])
  }

  const onSelectedDelete = async () => {
    await Promise.all(
      selectedIds.map((id) =>
        onDeleteNotification({
          id,
          refetch: false,
        })
      )
    )

    setSelectedIds([])
  }

  const onSingleRead = async (id: string) => {
    await onMarkAsRead({
      id,
      refetch: false,
      invalidate: "all",
    })
  }

  const onSingleUnread = async (id: string) => {
    await onMarkAsUnread({
      id,
      refetch: false,
      invalidate: "all",
    })
  }

  const onSingleDelete = async (id: string) => {
    await onDeleteNotification({
      id,
      refetch: true,
      invalidate: "all",
    })

    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id))
  }

  useEffect(() => {
    setSelectedIds([])
  }, [page, debouncedSearch])

  if (isInitialLoading) return <NotificationsCardSkeleton />

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center items-end lg:justify-between gap-4">
            <InputGroup className="w-full md:max-w-md">
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput
                value={search}
                placeholder="Search..."
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  onSearchChange(event.currentTarget.value)
                }
              />
            </InputGroup>

            <div className="flex items-center">
              {!hasSelected && notificationsAll.length ? (
                unreadCount > 0 ? (
                  <Button
                    variant="outline"
                    disabled={isBulkLoading}
                    onClick={onAllReads}
                  >
                    <MailOpen />
                    Mark all as read
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    disabled={isBulkLoading}
                    onClick={onAllUnreads}
                  >
                    <Mail />
                    Mark all as unread
                  </Button>
                )
              ) : null}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <NotificationBulkActions
            selectedCount={selectedIds.length}
            disabled={isBulkLoading}
            hasSelectedRead={hasSelectedRead}
            hasSelectedUnread={hasSelectedUnread}
            onMarkAsRead={onSelectedReads}
            onMarkAsUnread={onSelectedUnreads}
            onClear={onClearSelected}
            onDelete={onSelectedDelete}
          />

          {isTableLoading ? (
            <NotificationsTableSkeleton />
          ) : (
            <NotificationsTable
              notifications={notifications}
              selectedIds={selectedIds}
              isAllSelected={isAllSelected}
              isSomeSelected={isSomeSelected}
              onSelectAll={onSelectAllCurrentPage}
              onSelectRow={onSelectRow}
              onMarkAsRead={(id) => onSingleRead(id)}
              onMarkAsUnread={(id) => onSingleUnread(id)}
              onDelete={(id) => onSingleDelete(id)}
            />
          )}
        </div>
      </CardContent>

      <CardFooter>
        <NotificationsPagination
          meta={meta}
          onPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
          onNext={() =>
            setPage((prev) =>
              meta?.totalPages
                ? Math.min(prev + 1, meta.totalPages)
                : prev
            )
          }
        />
      </CardFooter>
    </Card>
  )
}