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
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardOverviewHeroCard({
  total,
  content,
  published,
}: {
  total?: number
  content?: ContentItem
  published?: ContentItem
}) {
  return !total && !content && !published ? (
    <Card className="space-y-6 rounded-sm border-0 bg-primary text-primary-foreground flex flex-col h-full justify-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="h-5 w-5 shrink-0" />
            <span className="truncate">Your workspace is ready!</span>
          </div>
        </CardTitle>

        <CardDescription className="max-w-2xl text-xs leading-6 text-primary-foreground/80">
          Start generating high-quality content ideas and watch your engagement grow. Your creative journey begins here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Link href="/generate">
            <Button
              variant="secondary"
              size="lg">
              Generate First Content
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  ) : (
    <Card className="space-y-6 rounded-sm border-0 bg-primary text-primary-foreground flex flex-col h-full justify-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="h-5 w-5 shrink-0" />
            <span className="truncate">AI Content Workspace</span>
          </div>
        </CardTitle>

        <CardDescription className="max-w-2xl text-xs leading-6 text-primary-foreground/80">
          You've generated {total} contents today. AI suggestions are helping improve your publishing consistency and engagement.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {published?.title ? <div className="min-w-0 rounded-md bg-white/10 p-4">
            <div className="flex items-center gap-2 min-w-0">
              <TrendingUp className="shrink-0" />
              <p className="min-w-0 truncate text-xs font-semibold uppercase tracking-wide text-primary-foreground/80">
                {published?.title}
              </p>
            </div>

            <p className="mt-2 text-sm text-primary-foreground/80">
              {ideaStatus[published?.status || "draft"]} •{" "}
              {relativeDate(published?.createdAt || "")}
            </p>

            <p className="mt-1 min-w-0 truncate text-base font-semibold leading-snug text-white capitalize">
              {published?.prompt}
            </p>
          </div> : null}

          {content?.title ? <div className="min-w-0 rounded-md bg-white/10 p-4">
            <div className="flex items-center gap-2 min-w-0">
              <Wand2 className="shrink-0" />
              <p className="min-w-0 truncate text-xs font-semibold uppercase tracking-wide text-primary-foreground/80">
                {content?.title}
              </p>
            </div>

            <p className="mt-2 text-sm text-primary-foreground/80">
              {ideaStatus[content?.status || "draft"]} •{" "}
              {relativeDate(content?.createdAt || "")}
            </p>

            <p className="mt-1 min-w-0 truncate text-base font-semibold leading-snug text-white capitalize">
              {content?.prompt}
            </p>
          </div> : null }
        </div>
      </CardContent>
    </Card>
  )
}
