import { fetchRecentContents, fetchRecentActivities } from "@/lib/server/dashboard"

import DashboardRecentsContentsCard from "@/components/dashboard/recents-contents-card"
import DashboardRecentsActivityCard from "@/components/dashboard/recents-activity-card"

export default async function DashboardRecentsContentsActivitySection() {
  const [contents, activities] = await Promise.all([
    fetchRecentContents(),
    fetchRecentActivities()
  ])

  return (
    <div className="grid grid-flow-dense gap-6 md:grid-cols-2">
      <DashboardRecentsContentsCard data={contents} />
      <DashboardRecentsActivityCard data={activities} />
    </div>
  )
}
