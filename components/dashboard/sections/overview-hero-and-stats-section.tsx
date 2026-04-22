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
    <div className="grid gap-6 lg:grid-cols-6">
      <div className="lg:col-span-3">
        <DashboardOverviewHeroCard data={overview} />
      </div>

      <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
        {stats.map((stat) => {
          return (
            <div key={stat.id} className="lg:col-span-1">
              <DashboardStatsCard data={stat} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
