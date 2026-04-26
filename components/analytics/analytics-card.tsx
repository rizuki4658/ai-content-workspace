"use client"

import { Suspense } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAnalytics, GetAnalyticsResponse } from "@/lib/api/analytics"

import AnalyticsStatsSection from "@/components/analytics/analytics-stats-section"
import AnalyticsStatsSkeleton from "@/components/analytics/skeletons/analytics-stats-skeleton"

import AnalyticsTypeStatusSection from "@/components/analytics/analytics-type-status-section"
import AnalyticsTypeStatusSkeleton from "@/components/analytics/skeletons/analytics-type-status-section"

import AnalyticsRecentsInsightsSection from "@/components/analytics/analytics-recents-insights-section"
import AnalyticsRecentsInsightsSkeleton from "@/components/analytics/skeletons/analytics-recents-insights-skeleton"

export default function AnalyticsCard() {
  const { data, isLoading, isFetching, isError } = useQuery<GetAnalyticsResponse>({
    queryKey: ['analytics'],
    queryFn: () => getAnalytics()
  })

  return (
    <div className="space-y-6">
      <Suspense fallback={<AnalyticsStatsSkeleton />}>
        <div className="animate-in fade-in duration-500">
          <AnalyticsStatsSection
            data={data?.stats}
            loading={isLoading}
            fetching={isFetching}
          />
        </div>
      </Suspense>

      <Suspense fallback={<AnalyticsTypeStatusSkeleton />}>
        <div className="animate-in fade-in duration-500">
          <AnalyticsTypeStatusSection
            data={data?.distribution}
            loading={isLoading}
            fetching={isFetching}
          />
        </div>
      </Suspense>

      <Suspense fallback={<AnalyticsRecentsInsightsSkeleton />}>
        <div className="animate-in fade-in duration-500">
          <AnalyticsRecentsInsightsSection
            data={data?.summary}
            loading={isLoading}
            fetching={isFetching}
          />
        </div>
      </Suspense>
    </div>
  )
}
