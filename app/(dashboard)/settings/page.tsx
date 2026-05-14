import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"

import SettingsPreferenceDataManagementSection from "@/components/settings/sections/settings-preference-data-management-section"
import SettingsPreferenceDataManagementSkeleton from "@/components/settings/skeletons/settings-preference-data-management-skeleton"

import PageTitle from "@/components/shared/page-title"

export const metadata: Metadata = {
  title: "Settings - AI Content Workspace",
  description: "AI Content Workspace",
}

export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <PageTitle
        title="Settings"
        description="Manage your preferences and workspace settings."
      />

      <Suspense fallback={<SettingsPreferenceDataManagementSkeleton />}>
        <div className="animate-in fade-in duration-500">
          <SettingsPreferenceDataManagementSection />
        </div>
      </Suspense>

      <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
        <div className="space-y-2">
          <h2 className="text-sm font-medium">
            Your data stays in your browser
          </h2>

          <p className="text-sm leading-6 text-muted-foreground">
            AI Content Workspace stores demo data locally using IndexedDB. This
            demo does not use a backend server or external database.
          </p>

          <Link
            href="/privacy"
            className="inline-flex text-sm font-medium text-primary underline-offset-4 transition hover:underline"
          >
            Learn more about data & privacy →
          </Link>
        </div>
      </div>
    </section>
  )
}
