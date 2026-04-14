import { DashboardQuickActions } from "@/lib/types/dashboard";

import { Zap, FilePenLine } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

import { quickActionIconMap } from "@/lib/utils/dashboard-icon-maps"

function BaseTemplate({ data }: { data: DashboardQuickActions[] }) {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </div>
          <CardDescription>
            Start a new task faster with common content workflows.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3">
        {data.map((action) => {
          const Icon =
            quickActionIconMap[
              action.icon as keyof typeof quickActionIconMap
            ] || FilePenLine

          return (
            <div
              key={action.id}
              className="flex items-start justify-between gap-4 rounded-md border p-4 transition hover:bg-muted"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-primary/10 p-2 text-primary">
                  <Icon className="h-4 w-4" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>

              <Button size="sm" variant="secondary">
                {action.cta}
              </Button>
            </div>
          )
        })}
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
              <div className="flex w-full items-start gap-3">
                <Skeleton className="h-6 w-6" />

                <div className="space-y-1.5 flex-1">
                  <Skeleton className="w-1/3 h-6" />
                  <Skeleton className="w-full h-4" />
                </div>
              </div>

              <Skeleton className="w-1/6 h-4" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default function DashboardQuickActionsCard({ data, loading }: { data: DashboardQuickActions[]; loading?: boolean }) {
  return loading ? <SkeletonTemplate /> : <BaseTemplate data={data} />
}