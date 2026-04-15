import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardOverviewHeroStatsSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-7">
      <div className="lg:col-span-3">
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
      </div>

      {Array.from({ length: 2 }).map((_, i) => {
        return (
          <div key={i} className="lg:col-span-2">
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
                {Array.from({ length: 2 }).map((_, j) => (
                  <div
                    key={j}
                    className="flex items-center justify-between text-sm gap-4"
                  >
                    <Skeleton className="w-1/2 h-4" />
                    <Skeleton className="w-1/2 h-4" />
                  </div>
                ))}
          
                <Skeleton className="w-full h-10" />
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
