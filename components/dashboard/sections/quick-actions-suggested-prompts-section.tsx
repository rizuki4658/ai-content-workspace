import { fetchQuickActions, fetchSuggestedPrompts } from "@/lib/server/dashboard"

import DashboardQuickActionsCard from "@/components/dashboard/quick-actions-card"
import DashboardSuggestedPromptsCard from "@/components/dashboard/suggested-promps-card"

export default async function DashboardQuickActionsSuggestedPromptsSection() {
  const [quickActions, suggestedPrompts] = await Promise.all([
    fetchQuickActions(),
    fetchSuggestedPrompts()
  ])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DashboardQuickActionsCard data={quickActions} />
      <DashboardSuggestedPromptsCard data={suggestedPrompts} />
    </div>
  )
}
