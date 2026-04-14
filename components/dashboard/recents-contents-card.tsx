import type { DashboardRecentContents } from "@/lib/types/dashboard"

import { FileText } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function BaseTemplate({ data }: { data: DashboardRecentContents[] }) {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Recent Contents</CardTitle>
            </div>

            <CardDescription>
              Recently generated and updated content in your workspace.
            </CardDescription>
          </div>

          <Button variant="link" className="text-xs font-medium text-primary">
            View all
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {data.map((content) => (
          <div
            key={content.id}
            className="group flex items-start justify-between gap-3 rounded-md border p-3 transition hover:bg-muted"
          >
            <div className="flex min-w-0 items-start gap-3">
              <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />

              <div className="min-w-0 space-y-1">
                <p className="truncate text-sm font-medium">
                  {content.title}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{content.type}</span>
                  <span>•</span>
                  <span>{content.createdAt}</span>
                </div>
              </div>
            </div>

            <Badge
              variant={
                content.status === "Published" ? "default" : "secondary"
              }
            >
              {content.status}
            </Badge>
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
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1 w-full">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-1/2" />
            </div>

            <CardDescription>
              <Skeleton className="h-6 w-11/12 mt-2" />
            </CardDescription>
          </div>

          <Skeleton className="w-1/6 h-6" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <div
              key={i}
              className="group flex items-start gap-3 rounded-md border p-3"
            >
              <Skeleton className="mt-0.5 h-6 w-6" />

              <div className="flex-1 space-y-1">
                <Skeleton className="w-full h-6" />
                <div className="w-1/4 flex items-center gap-4">
                  <Skeleton className="w-full h-4" />
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

export default function DashboardRecentsContentsCard({ data, loading }: { data: DashboardRecentContents[], loading?: boolean }) {
  return loading ?<SkeletonTemplate /> : <BaseTemplate data={data} />
}
