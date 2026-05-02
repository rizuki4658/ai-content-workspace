"use client"

import { useState, useEffect } from "react"

import { ideaTypes } from "@/lib/data/generate"

import { fetchContentDistribution } from "@/lib/api/dashboard"
import { DashboardSummaryResponse } from "@/lib/types/dashboard"
import { useQuery } from "@tanstack/react-query"

import DashboardContentDistributionCard from "@/components/dashboard/content-distribution-card"
import DashboardContentSummaryCard from "@/components/dashboard/content-summary-card"
import { contentTypeColorChartMap } from "@/lib/data/contents"
import DashboardContentDistributionSummarySkeleton from "@/components/dashboard/skeletons/content-distribution-summary-skeleton"

export default function DashboardContentDistributionSummarySection() {
  const { data, isLoading, isFetching, isError } = useQuery<DashboardSummaryResponse>({
    queryKey: ['dashboard-summary'],
    queryFn: () => fetchContentDistribution(),
  })
  const [items, setItems] = useState<any>([])

  useEffect(() => {
    setItems(Object.keys(data || {}).filter(i => i !== 'total').map((key) => ({
      name: ideaTypes[key as keyof typeof ideaTypes],
      value: data?.[key as keyof typeof data],
      fill: contentTypeColorChartMap[key as keyof typeof contentTypeColorChartMap]
    })
  ))
  }, [data])

  return (
    !isLoading && !isFetching ?
    <div className="grid grid-flow-dense gap-6 md:grid-cols-2">
      <DashboardContentDistributionCard data={items} total={data?.total} />
      <DashboardContentSummaryCard data={items} total={data?.total} />
    </div> : <DashboardContentDistributionSummarySkeleton />
  )
}
