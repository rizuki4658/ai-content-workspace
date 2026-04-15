import type { DashboardRecentActivities } from "@/lib/types/dashboard"

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

export default function DashboardRecentsActivityCard({ data }: { data: DashboardRecentActivities[] }) {
  return (
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

          <Button variant="link" className="text-xs font-medium text-primary">
            View all
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {data.map((activity) => {
          const Icon =
            activityIconMap[
              activity.key as keyof typeof activityIconMap
            ] || Sparkles

          return (
            <div
              key={activity.key}
              className="group flex items-start gap-3 rounded-md border p-3 transition hover:bg-muted"
            >
              <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />

              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.message}
                </p>
              </div>

              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {activity.time}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
