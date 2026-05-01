"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchWriteTips, fetchSuggestedPrompts } from "@/lib/api/generate-content"

import GenerateWriteTipsCard from "@/components/generate/generate-ai-tips"
import GenerateSuggestedPromptsCard from "@/components/generate/generate-suggest-prompts"
import { GenerateSuggestSkeleton, GenerateTipsSkeleton } from "@/components/generate/skeletons/generate-suggest-tips-skeleton"

export default function DashboardQuickActionsSuggestedPromptsSection() {
  const { data: dataPrompts, isLoading: isLoadingPrompts, isFetching: isFetchingPrompts } = useQuery({
    queryKey: ['generate-suggest-prompts'],
    queryFn: () => fetchSuggestedPrompts(),
  })
  const { data: dataTips, isLoading: isLoadingTips, isFetching: isFetchingTips } = useQuery({
    queryKey: ['generate-write-tips'],
    queryFn: () => fetchWriteTips(),
  })

  return (
    <div className="grid grid-flow-dense gap-6 grid-cols-6">
      <div className="lg:col-span-4 md:col-span-3 col-span-6">
        { !isLoadingPrompts && !isFetchingPrompts ?
          <GenerateSuggestedPromptsCard data={dataPrompts || []} /> : <GenerateSuggestSkeleton />
        }
      </div>
      <div className="lg:col-span-2 md:col-span-3 col-span-6">
        { !isLoadingPrompts && !isFetchingPrompts ?
          <GenerateWriteTipsCard data={dataTips || []} /> : <GenerateTipsSkeleton />
        }
      </div>
    </div>
  )
}
