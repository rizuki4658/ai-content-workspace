"use client";

import { useQuery } from "@tanstack/react-query"
import { SettingPrefrenceFormSchema } from "@/lib/validations/settings"
import { getPreference } from "@/lib/api/settings"
import { useGenerateContent } from "@/contexts/generate-context"

import { useRouter } from "next/navigation"
import { generateId } from "@/lib/utils/generator-id"

import GenerateFormCard from "@/components/generate/generate-form-card"
import GeneratePreviewCard from "@/components/generate/generate-preview-card"

const preferenceQueryKey = ["generate-settings-preference"] as const

export default function GenerateFormPreviewSection() {
  const { content, setContent } = useGenerateContent()
  const { data: preferenceValues, isLoading } =
    useQuery<SettingPrefrenceFormSchema>({
      queryKey: preferenceQueryKey,
      queryFn: async () => {
        const results = await getPreference()
        setContent({
          ...content,
          form: {
            uniqueId: generateId(),
            title: content.form?.title || "",
            prompt: content.form?.prompt || "",
            targetAudience: content.form?.targetAudience || "",
            keywords: content.form?.keywords || "",
            tone: results?.tone,
            type: results?.type,
          }
        })

        return results
      }
    }
  )
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
