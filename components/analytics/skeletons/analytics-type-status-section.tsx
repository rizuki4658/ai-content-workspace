import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsTypeStatusSkeleton() {

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <Card className="rounded-sm p-0! block!">
        <CardContent className="px-4 py-6">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-1/4 h-4" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-1/2 h-4" />
            </CardDescription>
          </CardHeader>

          <div className="h-65 w-full flex items-center justify-center relative">
            <Skeleton className="h-40 w-40 rounded-full" />

            <div className="absolute -bottom-1 left-0 right-0">
              <div className="flex w-full flex-wrap justify-center gap-x-4 gap-y-2">
                {Array.from({ length: 4 }).map((_, key) => (
                  <Skeleton key={key} className="w-1/6 h-3" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-sm p-0! block!">
        <CardContent className="px-4 py-6">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-1/4 h-4" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-1/2 h-4" />
            </CardDescription>
            <div className="space-y-4 mt-2">
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, key) => {

                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex min-w-0 items-center gap-2">
                          <Skeleton className="h-2.5 w.25" />
                          <span className="truncate text-muted-foreground">
                            <Skeleton className="w-20 h-4" />
                          </span>
                        </div>

                        <span className="font-medium text-foreground">
                          <Skeleton className="w-8 h-8" />
                        </span>
                      </div>

                      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                        <Skeleton className="w-full h-3" />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="rounded-md bg-muted p-3">
                <Skeleton className="w-full h-4" />
              </div>
            </div>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  )
}
