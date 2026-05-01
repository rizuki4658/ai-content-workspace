import type { Metadata } from "next"

import PageTitle from "@/components/shared/page-title"
import NotificationsCard from "@/components/notifications/notifications-card"

export const metadata: Metadata = {
  title: "Notifications - AI Content Workspace",
  description: "AI Content Workspace",
}

export default function NotificationsPage() {
  return (
    <section className="space-y-6">
      <PageTitle
        title="Notifications"
        description="Stay updated with content changes, status updates, and workspace activity."
      />

      <NotificationsCard />
    </section>
  )
}
