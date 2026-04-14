import { DashboardSuggestedPrompts } from "@/lib/types/dashboard";

import { Sparkles } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

function BaseTemplate({ data }: { data: DashboardSuggestedPrompts[] }) {
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

function SkeletonTemplate() {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <div className="space-y-1">
          <div className="flex items-center gap-2 w-full">
            <Skeleton className="w-6 h-6" />
            <CardTitle className="text-base w-full">
              <Skeleton className="w-1/3 h-6" />
            </CardTitle>
          </div>
          <CardDescription>
            <Skeleton className="w-10/12 h-5" />
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3">
        {Array.from({ length: 3 }).map((_, i) => {

          return (
            <div
              key={i}
              className="flex items-start justify-between gap-4 rounded-md border p-4"
            >
              <div className="space-y-1.5 flex-1">
                <Skeleton className="w-1/3 h-6" />
                <Skeleton className="w-full h-4" />
              </div>

              <Skeleton className="w-1/6 h-4" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default function DashboardSuggestedPromptsCard({ data, loading }: { data: DashboardSuggestedPrompts[]; loading?: boolean }) {
  return loading ? <><SkeletonTemplate /> <BaseTemplate data={data} /></> : <BaseTemplate data={data} />
}