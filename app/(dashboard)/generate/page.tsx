import { Suspense } from "react"
import type { Metadata } from "next"

import GenerateFormPreviewSection from "@/components/generate/sections/generate-form-preview-section"
import GenerateSuggestTipsSection from "@/components/generate/sections/generate-suggest-tips-section"
import GenerateSuggestTipsSkeleton from "@/components/generate/skeletons/generate-suggest-tips-skeleton"

import PageTitle from "@/components/shared/page-title"

export const metadata: Metadata = {
  title: "Generate - AI Content Workspace",
  description: "AI Content Workspace",
}

export default async function GeneratePage({
  searchParams
}: {
  searchParams: {
    suggest?: string | number;
    action?: string | number;
  }
}) {
  const { suggest, action } = await searchParams

  return (
    <section className="space-y-6">
      <PageTitle
        title="Generate"
        description="Create blog posts, captions, emails, and more with AI-assisted workflows."
      />

      <GenerateFormPreviewSection />

      <Suspense fallback={<GenerateSuggestTipsSkeleton />}>
        <div className="animate-in fade-in duration-500 w-full">
          <GenerateSuggestTipsSection
            suggestId={suggest}
            actionId={action}
          />
        </div>
      </Suspense>
    </section>
  )
}
