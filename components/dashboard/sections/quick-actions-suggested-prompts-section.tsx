"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchQuickActions, fetchSuggestedPrompts } from "@/lib/api/dashboard"

import DashboardQuickActionsCard from "@/components/dashboard/quick-actions-card"
import DashboardSuggestedPromptsCard from "@/components/dashboard/suggested-promps-card"
import {
  DashboardQuickActionsSkeleton,
  DashboardSuggestedPromptsSkeleton
} from "@/components/dashboard/skeletons/quick-actions-suggested-prompts-skeleton"

export default function DashboardQuickActionsSuggestedPromptsSection() {
  const { data: dataActions, isLoading: isLoadingActions, isFetching: isFetchingActions } = useQuery({
    queryKey: ['dashboard-quick-actions'],
    queryFn: () => fetchQuickActions(),
  })
  const { data: dataPrompts, isLoading: isLoadingPrompts, isFetching: isFetchingPrompts } = useQuery({
    queryKey: ['dashboard-suggested-prompts'],
    queryFn: () => fetchSuggestedPrompts(),
  })

  return (
    <div className="grid grid-flow-dense gap-6 md:grid-cols-2">
      { !isLoadingActions && !isFetchingActions ?
        <DashboardQuickActionsCard data={dataActions || []} /> : <DashboardQuickActionsSkeleton />
      }
      { !isLoadingPrompts && !isFetchingPrompts ?
        <DashboardSuggestedPromptsCard data={dataPrompts || []} /> : <DashboardSuggestedPromptsSkeleton />
      }
    </div>
  )
}
