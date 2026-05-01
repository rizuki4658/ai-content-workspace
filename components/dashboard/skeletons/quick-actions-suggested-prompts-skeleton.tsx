import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardQuickActionsSkeleton() {
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

export function DashboardSuggestedPromptsSkeleton() {
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

export default function DashboardQuickActionsSuggestedPromptsSkeleton() {
  return (
    <div className="grid grid-flow-dense gap-6 md:grid-cols-2">
      <DashboardQuickActionsSkeleton />
      <DashboardSuggestedPromptsSkeleton />
    </div>
  )
}