import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardRecentsContentsActivitySkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
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
                  <Skeleton className="w-full h-4" />
                </div>
    
                <Skeleton className="w-1/12 h-4" />
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}