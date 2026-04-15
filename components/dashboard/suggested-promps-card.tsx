import { DashboardSuggestedPrompts } from "@/lib/types/dashboard";

import { Sparkles } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardSuggestedPromptsCard({ data }: { data: DashboardSuggestedPrompts[] }) {
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
                <p className="text-sm font-medium">{prompt.title}</p>
                <p className="text-xs text-muted-foreground">
                  {prompt.description}
                </p>
              </div>

              <Badge variant="secondary">{prompt.tag}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
