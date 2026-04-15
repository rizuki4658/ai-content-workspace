import type { Metadata } from "next"

import GenerateFormPreviewSection from "@/components/generate/sections/generate-form-preview-section"
import GenerateFormPreviewSkeleton from "@/components/generate/skeletons/generate-form-preview-skeleton"
import { GenerateContentProvider } from "@/contexts/generate-context"

import PageTitle from "@/components/shared/page-title"

export const metadata: Metadata = {
  title: "Generate - AI Content Workspace",
  description: "AI Content Workspace",
}

export default function GeneratePage() {
  return (
    <GenerateContentProvider>
      <section className="space-y-6">
        <PageTitle
          title="Generate"
          description="Create blog posts, captions, emails, and more with AI-assisted workflows."
        />
        <GenerateFormPreviewSection />
      </section>
    </GenerateContentProvider>
  )
}
