import type { Metadata } from "next"
import {
  dashboardOverview,
  dashboardStats,
  recentContents,
  recentActivities,
  quickActions,
  suggestedPrompts,
  contentDistribution
} from "@/lib/data/dashboard"

import DashboardOverviewHeroCard from "@/components/dashboard/overview-hero-card"
import DashboardStatsCard from "@/components/dashboard/stats-card"
import DashboardRecentsActivityCard from "@/components/dashboard/recents-activity-card"
import DashboardRecentsContentsCard from "@/components/dashboard/recents-contents-card"
import DashboardQuickActionsCard from "@/components/dashboard/quick-actions-card"
import DashboardSuggestedPromptsCard from "@/components/dashboard/suggested-promps-card"
import PageTitle from "@/components/shared/page-title"
import DashboardContentSummaryCard from "@/components/dashboard/content-summary-card"
import DashboardContentDistributionCard from "@/components/dashboard/content-distribution-card"

export const metadata: Metadata = {
  title: "Dashboard - AI Content Workspace",
  description: "AI Content Workspace",
}

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <PageTitle title="Dashboard" description="Overview of your content performance and workspace activity" />

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-3">
          <DashboardOverviewHeroCard data={dashboardOverview} loading={false} />
        </div>

        {dashboardStats.map((stat) => {
          return (
            <div key={stat.id} className="lg:col-span-2">
              <DashboardStatsCard data={stat} loading={false} />
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardContentDistributionCard data={contentDistribution} loading={true} />
        <DashboardContentSummaryCard data={contentDistribution} loading={false} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardRecentsContentsCard data={recentContents} loading={false} />
        <DashboardRecentsActivityCard data={recentActivities} loading={false} />
      </div>
 
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardQuickActionsCard data={quickActions} loading={false} />
        <DashboardSuggestedPromptsCard data={suggestedPrompts} loading={false} />
      </div>
   </section>
  )
}
