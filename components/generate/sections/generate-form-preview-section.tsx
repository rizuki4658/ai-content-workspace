"use client";

import GenerateFormCard from "@/components/generate/generate-form-card"
import GeneratePreviewCard from "@/components/generate/generate-preview-card"

export default function GenerateFormPreviewSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <GenerateFormCard />
      <GeneratePreviewCard />
    </div>
  )
}
