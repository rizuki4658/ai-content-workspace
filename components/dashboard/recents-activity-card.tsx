import type { ContentItem } from "@/lib/types/content"

import Link from "next/link"
import { relativeDate } from "@/lib/utils/date-format"
import { Activity, Sparkles } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { activityIconMap } from '@/lib/utils/dashboard-icon-maps'
import { getExcerpt } from "@/components/contents/contents-helper"

export default function DashboardRecentsActivityCard({ data }: { data: ContentItem[] }) {
  return data.length ? (
    <Card className="rounded-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Activity</CardTitle>
            </div>

            <CardDescription>
              Recent actions and suggestions across your workspace.
            </CardDescription>
          </div>

          <Link href="/analytics">
            <Button variant="link" className="text-xs font-medium text-primary">
              View all
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {data.map((activity) => {
          const Icon =
            activityIconMap[
              activity.status as keyof typeof activityIconMap
            ] || Sparkles

          return (
            <div
              key={activity.id}
              className="group flex items-start gap-3 rounded-md border p-3 transition hover:bg-muted"
            >
              <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />

              <div className="flex-1 space-y-1">
                <Link href={`/contents?id=${activity.id}`}>
                  <Button
                    variant="link"
                    className="dark:text-white text-black block truncate text-sm font-medium px-0! h-auto!">
                    {activity.title}
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground">
                  {getExcerpt(activity.output, 80)}
                </p>
              </div>

              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {relativeDate(activity.updatedAt)}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  ) : null
}
