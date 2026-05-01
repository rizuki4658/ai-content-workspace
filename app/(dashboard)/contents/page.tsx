import { Suspense } from "react"
import type { Metadata } from "next"

import PageTitle from "@/components/shared/page-title"

import ContentsCard from "@/components/contents/contents-card"
import ContentsSkeleton from "@/components/contents/contents-skeleton"

export const metadata: Metadata = {
  title: "Contents - AI Content Workspace",
  description: "AI Content Workspace",
}

export default async function ContentsPage({ searchParams }: { searchParams: { id?: string } }) {
  const { id: editId } = await searchParams

  return (
    <section className="space-y-6">
      <PageTitle title="Contents" description="Manage, review and organize all your generated content in one place." />

      <Suspense fallback={ <ContentsSkeleton /> }>
        <div className="animate-in fade-in duration-500">
          <ContentsCard editId={editId} />
        </div>
      </Suspense>
    </section>
  )
}
