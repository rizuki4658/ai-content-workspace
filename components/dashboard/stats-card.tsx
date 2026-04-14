import type { DashboardStats } from "@/lib/types/dashboard"
import { statIconMap } from "@/lib/utils/dashboard-icon-maps"

import { FileText } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function BaseTemplate({ data }: { data: DashboardStats}) {
  const Icon =
    statIconMap[data.icon as keyof typeof statIconMap] || FileText

  const trendClass =
    data.trendType === "positive"
      ? "text-emerald-600"
      : "text-amber-600"

  const iconBoxClass =
    data.trendType === "positive"
      ? "bg-primary/10 text-primary"
      : "bg-amber-500/10 text-amber-600"
  return (
    <Card className="h-full rounded-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <div className={`rounded-md p-2 ${iconBoxClass}`}>
            <Icon className="h-4 w-4" />
          </div>

          <span className={`text-xs font-medium ${trendClass}`}>
            {data.trend}
          </span>
        </div>

        <div>
          <CardDescription className="text-xs uppercase tracking-wide">
            {data.title}
          </CardDescription>

          <CardTitle className="mt-2 text-3xl font-bold">
            {data.value}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {data.details.map((detail) => (
          <div
            key={detail.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted-foreground">
              {detail.label}
            </span>
            <span className="font-medium">{detail.value}</span>
          </div>
        ))}

        <div className="rounded-md bg-muted p-3">
          <p className="text-xs text-muted-foreground">
            {data.note}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function SkeletonTemplate () {
  return (
    <Card className="h-full rounded-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-8" />

          <Skeleton className="h-4 w-1/3" />
        </div>

        <div>
          <CardDescription className="text-xs uppercase tracking-wide">
            <Skeleton className="h-4 w-1/2" />
          </CardDescription>

          <CardTitle className="mt-2 text-3xl font-bold">
            <Skeleton className="h-10 w-1/4" />
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between text-sm gap-4"
          >
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        ))}

        <Skeleton className="w-full h-10" />
      </CardContent>
    </Card>
  )
}

export default function DashboardStatsCard({ data, loading }: { data: DashboardStats; loading?: boolean}) {
  return loading ? <SkeletonTemplate /> : <BaseTemplate data={data} />
}