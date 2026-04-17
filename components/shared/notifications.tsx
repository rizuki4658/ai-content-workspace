"use client";

import Link from "next/link"
import { useState } from "react"
import { notifications as notificationsData } from "@/lib/data/notifications"
import type { Notification } from "@/lib/types/notifications"
import { formatDate } from "@/lib/utils/date-format"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { Bell, RefreshCcw } from "lucide-react"

function NotificationColor(type: string) {
  if (["content_generated", "content_published"].includes(type)) return "bg-green-300"
  if ("content_failed" === type) return "bg-red-500"
  if (["system", "reminder"].includes(type)) return "bg-blue-300"

  return "primary"
}

function NotificationSkeleton({ loading }: { loading: boolean }) {
  return (
    loading ?
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, key) => (
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

function NotificationList({ loading, data, onReadMore }: { loading: boolean, data: Notification[], onReadMore: (id: string) => void }) {
  if (loading) {
    return <NotificationSkeleton loading={loading} />
  }

  return (
    <div className="-mx-4 max-h-160 overflow-y-auto">
      {data.map((notif) => (
        <div
          key={notif.id}
          className={`text-sm ${
            !notif.isRead ? "bg-muted" : ""
          }`}
        >
          <div className="flex items-start gap-x-4 p-3">
            <Avatar size="lg" className={NotificationColor(notif.type)}>
              <AvatarFallback>
                {notif.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className={`${ notif.isRead ? 'text-muted-foreground' : ''} font-medium`}>{notif.title}</p>
              <p className={`${ notif.isRead ? 'text-muted-foreground' : ''} ${ !notif?.expand ? 'line-clamp-2' : 'line-clamp-none' } text-xs`}>{notif.message}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs">{formatDate(notif.createdAt)}</p>
                <p className="text-xs cursor-pointer hover:underline" onClick={() => onReadMore(notif.id)}>{!notif?.expand ? 'Read More' : 'Show less'}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Notifications() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<Notification[]>([])
  const [timer, setTimer] = useState<undefined | NodeJS.Timeout>(undefined)
  const isAllRead = data.every(notif => notif.isRead)

  const onFetch = () => {
    setIsLoading(true)
    clearTimeout(timer)
    setTimer(undefined)
  
    const timerTemp = setTimeout(() => {
      setData(notificationsData.map(notif => ({
        ...notif,
        expand: false
      })))
      setIsLoading(false)
    }, 1500)
    setTimer(timerTemp)
  }

  const onOpenNotification = (open: boolean, force = false) => {
    if (force) return onFetch()

    if (!!open && !data?.length) {
      onFetch()
    }
  }

  const onMarkAllReads = () => {
    const newNotifs = data.map(notif => ({
      ...notif,
      isRead: true
    }))
    setData(newNotifs)
  }

  const onMarkAllUnreads = () => {
    const newNotifs = data.map(notif => ({
      ...notif,
      isRead: false
    }))
    setData(newNotifs)
  }

  const onReadMore = (id: string) => {
    const nextData = data.map(notif => {
      if (notif.id === id) {
        return { 
          ...notif, 
          isRead: true, 
          expand: !notif.expand 
        };
      }
      return notif;
    });
    setData(nextData);
  };

  return (
    <>
      <div className="hidden md:block">
        <Popover
          onOpenChange={onOpenNotification}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full dark:hover:text-gray-500 dark:text-white hover:text-gray-500 text-gray-700">
              <div className="relative">
                <div className="absolute -top-1 right-0 bg-red-500 h-2 w-2 rounded-full" />
                <Bell />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-105 p-4">
            <div className="space-y-4 flex flex-col items-end">
              <div className="w-full flex items-center justify-between gap-4">
                <h2 className="font-medium text-lg dark:text-white text-gray-700">Notifications</h2>
                <div className="flex items-center justify-end">
                  <Button variant="link" size="sm" disabled={isLoading} onClick={() => !isAllRead ? onMarkAllReads() : onMarkAllUnreads()}>
                    {!isAllRead ? 'Mark all as read' : 'Mark all as unread'}
                  </Button>
                  <Button
                    disabled={isLoading}
                    variant="link"
                    size="sm"
                    className="rounded-full hover:text-primary dark:hover:text-white-500 text-gray-700 dark:text-white"
                    onClick={() => onOpenNotification(true, true)}>
                    <RefreshCcw  />
                  </Button>
                </div>
              </div>
              <div className="w-full">
                <NotificationList loading={isLoading} data={data} onReadMore={onReadMore} />
              </div>
              {
                !isLoading ? (
                  <Link href="/notifications">
                    <PopoverClose asChild>
                      <Button variant="ghost" className="rounded-full hover:text-primary dark:text-white text-gray-700">
                        See all notifications
                      </Button>
                    </PopoverClose>
                  </Link>
                ) : (
                  <Button variant="ghost" disabled={isLoading} className="cursor-not-allowed text-muted-foreground">
                    See all notifications
                  </Button>
                )
              }
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="md:hidden block">
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="rounded-full hover:text-gray-500 text-gray-500">
            <div className="relative">
              <div className="absolute -top-1 right-0 bg-red-500 h-2 w-2 rounded-full" />
              <Bell />
            </div>
          </Button>
        </Link>
      </div>
    </>
  )
}
