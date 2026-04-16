import { fetchWriteTips, fetchSuggestedPrompts } from "@/lib/server/generate"

import GenerateWriteTipsCard from "@/components/generate/generate-ai-tips"
import GenerateSuggestedPromptsCard from "@/components/generate/generate-suggest-prompts"

export default async function DashboardQuickActionsSuggestedPromptsSection() {
  const [writeTips, promptSuggestions] = await Promise.all([
    fetchWriteTips(),
    fetchSuggestedPrompts()
  ])

  return (
    <div className="grid grid-flow-dense gap-6 grid-cols-6">
      <div className="lg:col-span-4 md:col-span-3 col-span-6">
        <GenerateSuggestedPromptsCard data={promptSuggestions} />
      </div>
      <div className="lg:col-span-2 md:col-span-3 col-span-6">
        <GenerateWriteTipsCard data={writeTips} />
      </div>
    </div>
  )
}
