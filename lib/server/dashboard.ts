import {
  dashboardOverview,
  dashboardStats,
  recentContents,
  recentActivities,
  quickActions,
  suggestedPrompts,
  contentDistribution,
} from "@/lib/data/dashboard"

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchDashboardOverview() {
  await wait(900)
  return dashboardOverview
}

export async function fetchDashboardStats() {
  await wait(1200)
  return dashboardStats
}

export async function fetchContentDistribution() {
  await wait(1600)
  return contentDistribution
}

export async function fetchRecentContents() {
  await wait(1100)
  return recentContents
}

export async function fetchRecentActivities() {
  await wait(1800)
  return recentActivities
}

export async function fetchQuickActions() {
  await wait(1000)
  return quickActions
}

export async function fetchSuggestedPrompts() {
  await wait(1400)
  return suggestedPrompts
}
