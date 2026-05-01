import type { DashboardHero } from "@/lib/types/dashboard"

import { Sparkles, TrendingUp, Wand2 } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import { ContentItem } from "@/lib/types/content"
import { ideaStatus } from "@/lib/data/generate"
import { relativeDate } from "@/lib/utils/date-format"

export default function DashboardOverviewHeroCard({ total, content, published }: {
  total?: number;
  content?: ContentItem
  published?: ContentItem
}) {
  return (
    <Card className="space-y-6 rounded-sm border-0 bg-primary text-primary-foreground flex flex-col h-full justify-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Content Workspace
          </div>
        </CardTitle>
  
        <CardDescription className="max-w-2xl text-xs leading-6 text-primary-foreground/80">
          You've generated {total} contents today. AI suggestions are helping improve your publishing consistency and engagement.
        </CardDescription>
      </CardHeader>
  
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md bg-white/10 p-4">
            <div className="flex items-center gap-2">
              <TrendingUp />
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/80">
                {published?.title}
              </p>
            </div>

            <p className="mt-2 text-sm text-primary-foreground/80">
              {ideaStatus[published?.status || 'draft']} • {relativeDate(published?.createdAt || '')}
            </p>

            <p className="mt-1 text-base font-semibold leading-snug text-white truncate capitalize">
              {published?.prompt}
            </p>
          </div>
          <div className="rounded-md bg-white/10 p-4">
            <div className="flex items-center gap-2">
              <Wand2 />
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/80">
                {content?.title}
              </p>
            </div>

            <p className="mt-2 text-sm text-primary-foreground/80">
              {ideaStatus[content?.status || 'draft']} • {relativeDate(content?.createdAt || '')}
            </p>

            <p className="mt-1 text-base font-semibold leading-snug text-white truncate capitalize">
              {content?.prompt}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
