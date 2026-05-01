import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationsTableSkeleton() {
  return (
    <div className="border rounded">
      <div className="w-full">
        <div className="grid grid-cols-[48px_1fr_2fr_140px_120px] gap-4 border-b px-4 py-3">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20 justify-self-end" />
        </div>

        <div className="divide-y">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[48px_1fr_2fr_140px_120px] gap-4 px-4 py-4 items-center"
            >
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-24" />

              <div className="flex justify-end gap-2">
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
