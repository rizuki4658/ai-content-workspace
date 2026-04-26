import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsStatsSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, key) => (
        <Card key={key} className="rounded-sm p-0! block!">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center gap-2 gap-x-10 justify-between">
              <div className="flex items-center gap-2">
                <Skeleton
                  className="h-8 w-8"
                />
                <div className="text-xl font-semibold">
                  <Skeleton
                    className="h-8 w-10"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2 items-end">
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-full h-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
