import { Suspense } from "react"
import type { Metadata } from "next"

import SettingsPreferenceDataManagementSection from "@/components/settings/sections/settings-preference-data-management-section"
import SettingsPreferenceDataManagementSkeleton from "@/components/settings/skeletons/settings-preference-data-management-skeleton"

import PageTitle from "@/components/shared/page-title"

export const metadata: Metadata = {
  title: "Settings - AI Content Workspace",
  description: "AI Content Workspace",
}

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <PageTitle title="Settings" description="Manage your preferences and workspace settings." />

      <Suspense fallback={<SettingsPreferenceDataManagementSkeleton />}>
        <div className="animate-in fade-in duration-500">
          <SettingsPreferenceDataManagementSection />
        </div>
      </Suspense>
   </section>
  )
}
