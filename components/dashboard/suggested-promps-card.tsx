import { PromptSuggestionItem } from "@/lib/types/content";

import { Sparkles } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { renderBadge } from "@/components/contents/contents-helper"
import Link from "next/link";

export default function DashboardSuggestedPromptsCard({ data }: { data: PromptSuggestionItem[] }) {
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

      <CardContent className="space-y-3">
        {data.map((prompt) => (
          <div
            key={prompt.id}
            className="rounded-md border p-4 transition hover:bg-muted"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <Link href={`/generate?suggest=${prompt.id}`}>
                  <p className="text-sm font-medium hover:underline">{prompt.label}</p>
                </Link>
                <p className="text-xs text-muted-foreground">
                  {prompt.prompt}
                </p>
              </div>

              {renderBadge({ item: prompt as any, key: 'type' })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
