import {
  fetchDashboardOverview,
  fetchDashboardStats,
} from "@/lib/server/dashboard"

import DashboardOverviewHeroCard from "@/components/dashboard/overview-hero-card"
import DashboardStatsCard from "@/components/dashboard/stats-card"

export default async function DashboardOverviewHeroStatsSection() {
  const [overview, stats] = await Promise.all([
    fetchDashboardOverview(),
    fetchDashboardStats()
  ])

  return (
    <div className="grid gap-6 lg:grid-cols-7">
      <div className="lg:col-span-3">
        <DashboardOverviewHeroCard data={overview} />
      </div>

      {stats.map((stat) => {
        return (
          <div key={stat.id} className="lg:col-span-2">
            <DashboardStatsCard data={stat} />
          </div>
        )
      })}
    </div>
  )
}
