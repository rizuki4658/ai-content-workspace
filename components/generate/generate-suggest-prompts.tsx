"use client"

import type { PromptSuggestionItem } from "@/lib/types/content";
import type { DashboardQuickAction } from "@/lib/types/dashboard";

import { useEffect } from "react";
import { useGenerateContent } from "@/contexts/generate-context"
import { ideaTypes, ideaTones } from "@/lib/data/generate"
import { toast } from "sonner"
import { contentTypeColorMap, contentToneColorMap } from "@/lib/data/contents"
import { generateId } from "@/lib/utils/generator-id"
import { fetchQuicActionById, fetchSuggestedPromptById } from "@/lib/api/generate-content";
import { useQuery } from "@tanstack/react-query";

import { BrainCircuit, FileUp, Sparkles, Volume2 } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function GenerateSuggestedPromptsCard({ data, suggestId, actionId }: {
  data: PromptSuggestionItem[];
  actionId?: string | number;
  suggestId?: string | number
}) {
  const isAlreadySuggested = Boolean(suggestId)
  const isQuickAction = Boolean(actionId)
  const { data: dataPrompt } = useQuery<PromptSuggestionItem | undefined>({
    queryKey: ['generate-suggest-prompt-by-id', suggestId],
    queryFn: () => fetchSuggestedPromptById(suggestId!),
    enabled: isAlreadySuggested
  })
  const { data: dataAction } = useQuery<DashboardQuickAction | undefined>({
    queryKey: ['generate-action-by-id', actionId],
    queryFn: () => fetchQuicActionById(actionId!),
    enabled: isQuickAction
  })
  const { content, setContent } = useGenerateContent()

  const onFillsUp = (e: PromptSuggestionItem) => {
    try {
      setContent({
        ...content,
        form: {
          uniqueId: generateId(),
          title: e.label || '',
          tone: e.tone || undefined,
          type: e.type || '',
          prompt: e.prompt || '',
          targetAudience: e?.targetAudience || '',
          keywords: e?.keywords || ''
        },
        isLoading: false
      })
      toast.success("Form filled!", { position: "top-center", duration: 1000 })
    } catch {
      toast.error("Failed to fill form!", { position: "top-center", duration: 1000 })
    }
  }

  useEffect(() => {
    if (!!isAlreadySuggested && dataPrompt) {
      onFillsUp(dataPrompt)
    }
  }, [dataPrompt, isAlreadySuggested])

  useEffect(() => {
    if (!!isQuickAction && dataAction) {
      onFillsUp({
        id: actionId?.toString() || 'unknown',
        label: dataAction?.title || '',
        tone: dataAction?.tone || undefined,
        type: dataAction?.type || 'blog_idea',
        prompt: dataAction?.description || '',
        targetAudience: dataAction?.audience || '',
        keywords: dataAction?.tags || ''
      })
    }
  }, [isQuickAction, dataAction])

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Suggested Prompts</CardTitle>
          </div>

          <CardDescription>
            AI suggestions based on recent content patterns and activity.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 h-150 overflow-y-auto">
        {data.map((prompt) => (
          <div
            key={prompt.id}
            className="rounded-md border p-4 transition hover:bg-muted"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className={`text-sm font-medium`}>
                  {prompt.label}&nbsp;
                  {
                    prompt.tone
                      ? <span
                          className={`${contentToneColorMap[prompt.tone]} text-xs gap-0.5 items-center inline-flex`}>
                          ({ideaTones[prompt.tone]}<Volume2 size={12} />)
                        </span>
                      : null
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  {prompt.prompt}
                </p>
              </div>

              <div className="flex flex-col items-end justify-between gap-1 h-full">
                <Badge
                  variant="secondary"
                  className={`${contentTypeColorMap[prompt.type]} text-xs`}>
                  <BrainCircuit />
                  {ideaTypes[prompt.type]}
                </Badge>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon-sm" onClick={() => onFillsUp(prompt)}>
                      <FileUp />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Fills up generate form!
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
