"use client"

import { fetchDashboardStats } from "@/lib/api/dashboard"
import { DashboardStatsResponse } from "@/lib/types/dashboard"
import { useQuery } from "@tanstack/react-query"

import DashboardOverviewHeroCard from "@/components/dashboard/overview-hero-card"
import DashboardStatsCard from "@/components/dashboard/stats-card"
import DashboardOverviewHeroStatsSkeleton from "@/components/dashboard/skeletons/overview-hero-and-stats-skeleton"

export default function DashboardOverviewHeroStatsSection({}) {
  const { data, isLoading, isFetching, isError } = useQuery<DashboardStatsResponse>({
    queryKey: ['dashboard-stats'],
    queryFn: () => fetchDashboardStats(),
  })

  return (
    !isLoading && !isFetching ?
    <div className="grid gap-6 lg:grid-cols-6">
      <div className="lg:col-span-3">
        <DashboardOverviewHeroCard
          total={data?.total}
          content={data?.content}
          published={data?.content_published}
        />
      </div>

      <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
        {data?.stats?.length
          ? data.stats.map((stat) => (
              <div key={stat.id} className="lg:col-span-1">
                <DashboardStatsCard data={stat} />
              </div>
            ))
          : Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="lg:col-span-1">
                <DashboardStatsCard
                  data={{
                    id: `empty-stat-${index}`,
                    title: "No stats yet",
                    value: 0,
                    trend: "Waiting for content",
                    trendType: "neutral",
                    icon: "draft",
                    details: [
                      { label: "Generated content", value: "0" },
                      { label: "Available insights", value: "0" },
                    ],
                    note: "No dashboard data is available yet. Generate your first content to start seeing stats here.",
                  }}
                />
              </div>
            ))}
      </div>
    </div> : <DashboardOverviewHeroStatsSkeleton />
  )
}
