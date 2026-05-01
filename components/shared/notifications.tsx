"use client";

import Link from "next/link"
import { useEffect, useState } from "react"
import type { NotificationItem } from "@/lib/types/notifications"
import { relativeDate } from "@/lib/utils/date-format"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { Bell, BellOff, RefreshCcw } from "lucide-react"
import { useMarkAllNotificationsAsRead, useMarkAllNotificationsAsUnread, useMarkNotificationAsRead, useNotifications } from "@/hooks/use-notifications";
import { getExcerpt } from "../contents/contents-helper";

function NotificationColor(type: string) {
  if (["content_generated", "content_ready", "content_published"].includes(type)) return "dark:bg-green-300/50! bg-green-100!"
  if (["content_failed_generated", "content_deleted"].includes(type)) return "dark:bg-red-300/50! bg-red-100!"
  if (["content_status_changed", "content_saved_draft"].includes(type)) return "dark:bg-blue-300/50! bg-blue-100!"
  if (["content_edited"].includes(type)) return "dark:bg-orange-300/50! bg-orange-100!"

  return "dark:bg-primary-300/50! bg-primary-100!"
}

function NotificationSkeleton({ loading }: { loading: boolean }) {
  return (
    loading ?
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, key) => (
          <div key={key} className="space-y-1 flex w-full items-start gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 max-w-30" />
              <Skeleton className="h-12" />
            </div>
          </div>
        ))}
      </div>
    : ''
  )
}

function NotificationList({
  loading,
  data,
  onReadMore,
  onMarkAsRead
}: {
  loading: boolean;
  data: NotificationItem[];
  onMarkAsRead: (notif: NotificationItem) => void
  onReadMore: (id: string) => void
}) {
  if (loading) {
    return <NotificationSkeleton loading={loading} />
  }

  return (
    <div className="-mx-4 max-h-160 overflow-y-auto">
      {!!data?.length ? data.map((notif) => (
        <div
          key={notif.id}
          className={`text-sm ${
            !notif.isRead ? "bg-muted" : ""
          } dark:hover:bg-primary/40 hover:bg-primary/10 group`}
          onClick={() => onMarkAsRead(notif)}>
          {notif.isRead}
          <div className="flex items-start gap-x-4 p-3">
            <Avatar size="lg">
              <AvatarFallback className={`${NotificationColor(notif.type)}`}>
                {notif.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className={`${ notif.isRead ? 'dark:group-hover:text-white! text-muted-foreground' : ''} font-medium`}>{notif.title}</p>
              <p className={`${ notif.isRead ? 'dark:group-hover:text-white! text-muted-foreground' : ''} ${ !notif?.expand ? 'line-clamp-2' : 'line-clamp-none' } text-xs`}>
                {notif.expand || notif.message.length <= 50 ? notif.message : getExcerpt(notif.message, 50)}
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs dark:group-hover:text-white! text-muted-foreground">{relativeDate(notif.createdAt)}</p>
                {notif.message.length > 50 ?
                  <p className="text-xs cursor-pointer hover:underline" onClick={() => onReadMore(notif.id)}>
                    {!notif?.expand ? 'Read More' : 'Show less'}
                  </p>
                : null}
              </div>
            </div>
          </div>
        </div>
      )) : <div className="min-h-120 flex flex-col items-center justify-center gap-4">
        <BellOff size={80} className="text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">Nothing to see here</p>
      </div> }
    </div>
  )
}

export default function Notifications() {
  const { data: notifications = [], isLoading, isFetching, refetch } = useNotifications()
  const { mutate: onMarkAsRead } = useMarkNotificationAsRead()
  const { mutate: onMarkAllReads } = useMarkAllNotificationsAsRead()
  const { mutate: onMarkAllUnreads } = useMarkAllNotificationsAsUnread()
  const unreadCount = notifications.filter((item) => !item.isRead).length
  const [items, setItems] = useState<NotificationItem[]>([])

  const setMarkAsRead = async (notif: NotificationItem) => {
    if (!notif?.isRead) await onMarkAsRead({ id: notif.id })
  }

  const onReadMore = async (id: NotificationItem['id']) => {
    setItems((prev) => {
      return prev.map(notif => {
        if (notif.id === id) {
          return {
            ...notif,
            isRead: true,
            expand: !notif.expand
          }
        }

        return notif
      })
    })
  }

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setItems(() => notifications.map(notification => ({
        ...notification,
        expand: false
      })))
    }
  }, [isLoading, isFetching])

  return (
    <>
      <div className="hidden md:block">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full dark:hover:text-gray-500 dark:text-white hover:text-gray-500 text-gray-700">
              <div className="relative">
                {!!unreadCount ? <div className="absolute -top-1 right-0 bg-red-500 h-2 w-2 rounded-full" /> : null}
                <Bell />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-105 p-4">
            <div className="space-y-4 flex flex-col items-end">
              <div className="w-full flex items-center justify-between gap-4">
                <h2 className="font-medium text-lg dark:text-white text-gray-700">Notifications</h2>
                <div className="flex items-center justify-end">
                  {notifications?.length ?
                    <Button
                      variant="link"
                      size="sm"
                      disabled={isLoading || isFetching}
                      onClick={() => !!unreadCount ? onMarkAllReads({}) : onMarkAllUnreads({})}>
                      {!!unreadCount ? 'Mark all as read' : 'Mark all as unread'}
                  </Button> : null }
                  <Button
                    disabled={isLoading || isFetching}
                    variant="link"
                    size="sm"
                    className="rounded-full hover:text-primary dark:hover:text-white-500 text-gray-700 dark:text-white"
                    onClick={() => refetch()}>
                    <RefreshCcw  />
                  </Button>
                </div>
              </div>
              <div className="w-full">
                <NotificationList
                  loading={isLoading || isFetching}
                  data={items}
                  onReadMore={onReadMore}
                  onMarkAsRead={setMarkAsRead}
                />
              </div>
              {
                !isLoading && !isFetching ? !!notifications.length ? (
                  <Link href="/notifications">
                    <PopoverClose asChild>
                      <Button variant="ghost" className="rounded-full hover:text-primary dark:text-white text-gray-700">
                        See all notifications
                      </Button>
                    </PopoverClose>
                  </Link>
                ) : null : !!notifications.length ? (
                  <Button variant="ghost" disabled={isLoading || isFetching} className="cursor-not-allowed text-muted-foreground">
                    See all notifications
                  </Button>
                ) : null
              }
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="md:hidden block">
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="rounded-full hover:text-gray-500 text-gray-500">
            <div className="relative">
              {unreadCount > 0 ? <div className="absolute -top-1 right-0 bg-red-500 h-2 w-2 rounded-full" /> : null }
              <Bell />
            </div>
          </Button>
        </Link>
      </div>
    </>
  )
}
