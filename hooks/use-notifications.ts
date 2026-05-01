import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createNotification,
  deleteNotification,
  getNotifications,
  getNotificationsPaginated,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  markAllNotificationsAsUnread,
  markNotificationAsUnread,
} from "@/lib/api/notifications"

import type {
  CreateNotificationPayload,
  NotificationItem,
} from "@/lib/types/notifications"

export const notificationQueryKey = ["notifications"] as const
export const notificationPaginatedQueryKey = ["notifications", "paginated"] as const

type MutationOptions = {
  refetch?: boolean
  invalidate?: "all" | "list" | "paginated" | "none"
}

type NotificationMutationVariables = MutationOptions & {
  id: NotificationItem["id"]
}

type NotificationsPaginatedResponse = {
  data: NotificationItem[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
    from: number
    to: number
    hasPrev: boolean
    hasNext: boolean
  }
}

function shouldInvalidate(options?: MutationOptions) {
  return options?.refetch === true && options?.invalidate !== "none"
}

function invalidateNotifications(
  queryClient: ReturnType<typeof useQueryClient>,
  options?: MutationOptions
) {
  if (!shouldInvalidate(options)) return

  const invalidate = options?.invalidate ?? "all"

  if (invalidate === "all" || invalidate === "list") {
    queryClient.invalidateQueries({
      queryKey: notificationQueryKey,
    })
  }

  if (invalidate === "all" || invalidate === "paginated") {
    queryClient.invalidateQueries({
      queryKey: notificationPaginatedQueryKey,
    })
  }
}

function updateNotificationListCache(
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (notifications: NotificationItem[]) => NotificationItem[]
) {
  queryClient.setQueryData<NotificationItem[]>(
    notificationQueryKey,
    (old) => {
      if (!old) return old
      return updater(old)
    }
  )
}

function updateNotificationPaginatedCache(
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (notifications: NotificationItem[]) => NotificationItem[]
) {
  queryClient.setQueriesData<NotificationsPaginatedResponse>(
    { queryKey: notificationPaginatedQueryKey },
    (old) => {
      if (!old) return old

      return {
        ...old,
        data: updater(old.data),
      }
    }
  )
}

function updateAllNotificationCaches(
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (notifications: NotificationItem[]) => NotificationItem[]
) {
  updateNotificationListCache(queryClient, updater)
  updateNotificationPaginatedCache(queryClient, updater)
}

export function useNotifications() {
  return useQuery<NotificationItem[]>({
    queryKey: notificationQueryKey,
    queryFn: getNotifications,
  })
}

export function useNotificationsPaginated({
  page,
  limit = 10,
  search = "",
}: {
  page: number
  limit?: number
  search?: string
}) {
  return useQuery({
    queryKey: [...notificationPaginatedQueryKey, { page, limit, search }],
    queryFn: () => getNotificationsPaginated({ page, limit, search }),
  })
}

export function useCreateNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      refetch,
      invalidate,
      ...payload
    }: CreateNotificationPayload & MutationOptions) =>
      createNotification(payload),

    onSuccess: (_data, variables) => {
      invalidateNotifications(queryClient, variables)
    },
  })
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: NotificationMutationVariables) =>
      markNotificationAsRead(id),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: notificationQueryKey,
      })

      await queryClient.cancelQueries({
        queryKey: notificationPaginatedQueryKey,
      })

      const previousNotifications =
        queryClient.getQueryData<NotificationItem[]>(notificationQueryKey)

      const previousPaginatedNotifications =
        queryClient.getQueriesData<NotificationsPaginatedResponse>({
          queryKey: notificationPaginatedQueryKey,
        })

      updateAllNotificationCaches(queryClient, (notifications) =>
        notifications.map((notification) =>
          notification.id === variables.id
            ? {
                ...notification,
                isRead: true,
              }
            : notification
        )
      )

      return {
        previousNotifications,
        previousPaginatedNotifications,
      }
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        notificationQueryKey,
        context?.previousNotifications
      )

      context?.previousPaginatedNotifications?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },

    onSettled: (_data, _error, variables) => {
      invalidateNotifications(queryClient, variables)
    },
  })
}

export function useMarkNotificationAsUnread() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: NotificationMutationVariables) =>
      markNotificationAsUnread(id),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: notificationQueryKey,
      })

      await queryClient.cancelQueries({
        queryKey: notificationPaginatedQueryKey,
      })

      const previousNotifications =
        queryClient.getQueryData<NotificationItem[]>(notificationQueryKey)

      const previousPaginatedNotifications =
        queryClient.getQueriesData<NotificationsPaginatedResponse>({
          queryKey: notificationPaginatedQueryKey,
        })

      updateAllNotificationCaches(queryClient, (notifications) =>
        notifications.map((notification) =>
          notification.id === variables.id
            ? {
                ...notification,
                isRead: false,
              }
            : notification
        )
      )

      return {
        previousNotifications,
        previousPaginatedNotifications,
      }
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        notificationQueryKey,
        context?.previousNotifications
      )

      context?.previousPaginatedNotifications?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },

    onSettled: (_data, _error, variables) => {
      invalidateNotifications(queryClient, variables)
    },
  })
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (_variables: MutationOptions = {}) =>
      markAllNotificationsAsRead(),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: notificationQueryKey,
      })

      await queryClient.cancelQueries({
        queryKey: notificationPaginatedQueryKey,
      })

      const previousNotifications =
        queryClient.getQueryData<NotificationItem[]>(notificationQueryKey)

      const previousPaginatedNotifications =
        queryClient.getQueriesData<NotificationsPaginatedResponse>({
          queryKey: notificationPaginatedQueryKey,
        })

      updateAllNotificationCaches(queryClient, (notifications) =>
        notifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      )

      return {
        previousNotifications,
        previousPaginatedNotifications,
      }
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        notificationQueryKey,
        context?.previousNotifications
      )

      context?.previousPaginatedNotifications?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },

    onSettled: (_data, _error, variables) => {
      invalidateNotifications(queryClient, variables)
    },
  })
}

export function useMarkAllNotificationsAsUnread() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (_variables: MutationOptions = {}) =>
      markAllNotificationsAsUnread(),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: notificationQueryKey,
      })

      await queryClient.cancelQueries({
        queryKey: notificationPaginatedQueryKey,
      })

      const previousNotifications =
        queryClient.getQueryData<NotificationItem[]>(notificationQueryKey)

      const previousPaginatedNotifications =
        queryClient.getQueriesData<NotificationsPaginatedResponse>({
          queryKey: notificationPaginatedQueryKey,
        })

      updateAllNotificationCaches(queryClient, (notifications) =>
        notifications.map((notification) => ({
          ...notification,
          isRead: false,
        }))
      )

      return {
        previousNotifications,
        previousPaginatedNotifications,
      }
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        notificationQueryKey,
        context?.previousNotifications
      )

      context?.previousPaginatedNotifications?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },

    onSettled: (_data, _error, variables) => {
      invalidateNotifications(queryClient, variables)
    },
  })
}

export function useDeleteNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
    }: NotificationMutationVariables) =>
      deleteNotification(id),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: notificationQueryKey,
      })

      await queryClient.cancelQueries({
        queryKey: notificationPaginatedQueryKey,
      })

      const previousNotifications =
        queryClient.getQueryData<NotificationItem[]>(notificationQueryKey)

      const previousPaginatedNotifications =
        queryClient.getQueriesData<NotificationsPaginatedResponse>({
          queryKey: notificationPaginatedQueryKey,
        })

      updateAllNotificationCaches(queryClient, (notifications) =>
        notifications.filter(
          (notification) => notification.id !== variables.id
        )
      )

      return {
        previousNotifications,
        previousPaginatedNotifications,
      }
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        notificationQueryKey,
        context?.previousNotifications
      )

      context?.previousPaginatedNotifications?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },

    onSettled: (_data, _error, variables) => {
      invalidateNotifications(queryClient, variables)
    },
  })
}
