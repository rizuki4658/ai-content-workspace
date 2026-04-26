import type { Metadata } from "next"

import PageTitle from "@/components/shared/page-title"
import AnalyticsCard from "@/components/analytics/analytics-card"

export const metadata: Metadata = {
  title: "Analytics - AI Content Workspace",
  description: "AI Content Workspace",
}

export default function AnalyticsPage() {
  return (
    <section className="space-y-6">
      <PageTitle
        title="Analytics"
        description="Monitor content performance, analyze trends, and make data-driven decisions."
      />

      <AnalyticsCard />
    </section>
  )
}
