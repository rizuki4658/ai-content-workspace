import { Suspense } from "react"
import type { Metadata } from "next"

import PageTitle from "@/components/shared/page-title"

import ContentsCard from "@/components/contents/contents-card"

export const metadata: Metadata = {
  title: "Dashboard - AI Content Workspace",
  description: "AI Content Workspace",
}

export default function ContentsPage() {
  return (
    <section className="space-y-6">
      <PageTitle title="Contents" description="Manage, review and organize all your generated content in one place." />

      <Suspense>
        <div className="animate-in fade-in duration-500">
          <ContentsCard />
        </div>
      </Suspense>
    </section>
  )
}
