"use client";

import { useRouter } from "next/navigation"

import GenerateFormCard from "@/components/generate/generate-form-card"
import GeneratePreviewCard from "@/components/generate/generate-preview-card"

export default function GenerateFormPreviewSection() {
  const router = useRouter()

  const onReset = () => {
    router.replace("/generate", { scroll: false })
  }

  return (
    <div className="grid grid-flow-dense gap-6 md:grid-cols-2">
      <GenerateFormCard onReset={onReset} />
      <GeneratePreviewCard />
    </div>
  )
}
