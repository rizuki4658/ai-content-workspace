import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsRecentsInsightsSkeleton() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      
      <div className="md:col-span-3">
        <Card>
          <CardHeader className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-48" />
          </CardHeader>

          <CardContent className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-3 rounded-md border p-3"
              >
                <div className="flex min-w-0 items-start gap-3 w-full">
                  <Skeleton className="h-4 w-4 rounded-sm mt-1" />

                  <div className="min-w-0 space-y-2 flex-1">
                    <Skeleton className="h-4 w-40" />

                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-2" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </div>

                <Skeleton className="h-5 w-16 rounded-md" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-44" />
          </CardHeader>

          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
