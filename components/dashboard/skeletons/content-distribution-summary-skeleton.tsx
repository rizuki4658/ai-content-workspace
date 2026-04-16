import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardContentDistributionSummarySkeleton() {
  return (
    <div className="grid grid-flow-dense gap-6 md:grid-cols-2">
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle className="text-base">
            <Skeleton className="w-1/3 h-6" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="w-1/2 h-5" />
          </CardDescription>
        </CardHeader>
    
        <CardContent className="flex items-center justify-center h-65">
          <Skeleton className="w-48 h-48 rounded-full" />
        </CardContent>
      </Card>

      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle className="text-base">
            <Skeleton className="h-6 w-1/4" />
          </CardTitle>
        </CardHeader>
    
        <CardContent className="flex h-65 flex-col justify-between space-y-4">
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-5 w-10" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
    
          <Skeleton className="h-14 w-full rounded-md" />
        </CardContent>
      </Card>
    </div>
  )
}
