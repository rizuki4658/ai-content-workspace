import { Suspense } from "react"
import type { Metadata } from "next"

import DashboardOverviewHeroStatsSection from "@/components/dashboard/sections/overview-hero-and-stats-section"
import DashboardContentDistributionSummarySection from "@/components/dashboard/sections/content-distribution-summary-section"
import DashboardRecentsContentsActivitySection from "@/components/dashboard/sections/recents-contents-activity-section"
import DashboardQuickActionsSuggestedPromptsSection from "@/components/dashboard/sections/quick-actions-suggested-prompts-section"

import DashboardOverviewHeroStatsSkeleton from "@/components/dashboard/skeletons/overview-hero-and-stats-skeleton"
import DashboardContentDistributionSummarySkeleton from "@/components/dashboard/skeletons/content-distribution-summary-skeleton"
import DashboardRecentsContentsActivitySkeleton from "@/components/dashboard/skeletons/recents-contents-activity-skeleton"
import DashboardQuickActionsSuggestedPromptsSkeleton from "@/components/dashboard/skeletons/quick-actions-suggested-prompts-skeleton"

import PageTitle from "@/components/shared/page-title"

export const metadata: Metadata = {
  title: "Dashboard - AI Content Workspace",
  description: "AI Content Workspace",
}

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <PageTitle title="Dashboard" description="Overview of your content performance and workspace activity." />

      <Suspense fallback={<DashboardOverviewHeroStatsSkeleton />}>
        <div className="animate-in fade-in duration-500">
          <DashboardOverviewHeroStatsSection />
        </div>
      </Suspense>

      <Suspense fallback={<DashboardContentDistributionSummarySkeleton />}>
        <div className="animate-in fade-in duration-500">
          <DashboardContentDistributionSummarySection />
        </div>
      </Suspense>

      <Suspense fallback={<DashboardRecentsContentsActivitySkeleton />}>
        <div className="animate-in fade-in duration-500">
          <DashboardRecentsContentsActivitySection />
        </div>
      </Suspense>

      <Suspense fallback={<DashboardQuickActionsSuggestedPromptsSkeleton />}>
        <div className="animate-in fade-in duration-500">
          <DashboardQuickActionsSuggestedPromptsSection />
        </div>
      </Suspense>
   </section>
  )
}
