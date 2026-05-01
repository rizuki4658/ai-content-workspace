import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import NotificationsTableSkeleton from "./notifications-table-skeleton"

export default function NotificationsCardSkeleton() {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-10 w-full md:max-w-md" />
          <Skeleton className="h-10 w-40" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <NotificationsTableSkeleton />
        </div>
      </CardContent>

      <CardFooter>
        <div className="w-full flex items-center justify-between gap-4">
          <Skeleton className="h-4 w-48" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
