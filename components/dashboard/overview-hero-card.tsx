import type { DashboardHero } from "@/lib/types/dashboard"

import { Sparkles } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { highlightIconMap } from '@/lib/utils/dashboard-icon-maps'

function BaseTemplate({ data }: { data: DashboardHero }) {
  return (
    <Card className="space-y-6 rounded-sm border-0 bg-primary text-primary-foreground flex flex-col h-full justify-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            {data.title}
          </div>
        </CardTitle>

        <CardDescription className="max-w-2xl text-xs leading-6 text-primary-foreground/80">
          {data.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {data.highlights.map((highlight) => {
            const Icon =
              highlightIconMap[
                highlight.key as keyof typeof highlightIconMap
              ] || Sparkles

            return (
              <div
                key={highlight.key}
                className="rounded-md bg-white/10 p-4"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/80">
                    {highlight.label}
                  </p>
                </div>

                <p className="mt-2 text-sm text-primary-foreground/80">
                  {highlight.meta}
                </p>

                <p className="mt-1 text-base font-semibold leading-snug text-white">
                  {highlight.value}
                </p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function SkeletonTemplate() {
  return (
    <Card className="space-y-6 rounded-sm border-0 bg-primary text-primary-foreground flex flex-col h-full justify-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-full" />
          </div>
        </CardTitle>

        <CardDescription className="max-w-2xl text-xs leading-6 text-primary-foreground/80">
          <Skeleton className="h-8 w-full mt-1" />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-md bg-white/10 p-4"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-full" />
              </div>

              <Skeleton className="h-4 w-full mt-4" />

              <Skeleton className="h-6 w-full mt-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardOverviewHeroCard({ data, loading }: { data: DashboardHero, loading?: boolean }) {
  return loading ? <SkeletonTemplate /> : <BaseTemplate data={data} />
}
