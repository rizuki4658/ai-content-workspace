import { fetchContentDistribution } from "@/lib/server/dashboard"

import DashboardContentDistributionCard from "@/components/dashboard/content-distribution-card"
import DashboardContentSummaryCard from "@/components/dashboard/content-summary-card"

export default async function DashboardContentDistributionSummarySection() {
  const distribution = await fetchContentDistribution()

  return (
    <div className="grid grid-flow-dense gap-6 md:grid-cols-2">
      <DashboardContentDistributionCard data={distribution} />
      <DashboardContentSummaryCard data={distribution} />
    </div>
  )
}
