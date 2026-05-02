import { Suspense } from "react"
import type { Metadata } from "next"

import MySettingsCard from "@/components/my-settings/my-settings-card"
import MySettingsSkeleton from "@/components/my-settings/my-settings-skeleton"

export const metadata: Metadata = {
  title: "My Settings - AI Content Workspace",
  description: "AI Content Workspace",
}

export default function MySettingsPage() {
  return (
    <section className="space-y-6">
      <Suspense fallback={<MySettingsSkeleton />}>
        <div className="animate-in fade-in duration-500">
          <MySettingsCard />
        </div>
      </Suspense>
   </section>
  )
}
