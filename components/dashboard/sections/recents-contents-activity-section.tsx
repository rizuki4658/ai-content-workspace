"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchRecentActivities, fetchRecentContents } from "@/lib/api/dashboard"
import { ContentItem } from "@/lib/types/content"

import DashboardRecentsContentsCard from "@/components/dashboard/recents-contents-card"
import DashboardRecentsActivityCard from "@/components/dashboard/recents-activity-card"
import {
  DashboardRecentsActivitySkeleton,
  DashboardRecentsContentsSkeleton
} from "@/components/dashboard/skeletons/recents-contents-activity-skeleton"

export default function DashboardRecentsContentsActivitySection() {
  const { data: dataRecents, isLoading: isLoadingRecents, isFetching: isFetchingRecents } = useQuery<ContentItem[]>({
    queryKey: ['dashboard-recents-content'],
    queryFn: () => fetchRecentContents(),
  })
  const { data: dataActivities, isLoading: isLoadingActivities, isFetching: isFetchingActivities } = useQuery<ContentItem[]>({
    queryKey: ['dashboard-recents-activity'],
    queryFn: () => fetchRecentActivities(),
  })

  return (
    <div className="grid grid-flow-dense gap-6 md:grid-cols-2">
      {!isLoadingRecents && !isFetchingRecents ?
        <DashboardRecentsContentsCard data={dataRecents || []} /> : <DashboardRecentsContentsSkeleton/>
      }
      {!isLoadingActivities && !isFetchingActivities ?
        <DashboardRecentsActivityCard data={dataActivities || []} /> : <DashboardRecentsActivitySkeleton/>
      }
    </div>
  )
}
