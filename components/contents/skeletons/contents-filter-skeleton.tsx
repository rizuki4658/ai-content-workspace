import { Skeleton } from "@/components/ui/skeleton"

export default function ContentsFilterSkeleton() {
  return (
    <div className="flex flex-col md:justify-between md:flex-row items-center w-full gap-4">
      <div className="flex-1 w-full">
        <Skeleton className="h-10" />
      </div>

      <div className="flex-1 w-full flex items-center justify-end gap-2">
        <div className="flex gap-2 justify-between flex-1 md:max-w-125">
          <Skeleton className="h-10 flex-1" />

          <Skeleton className="h-10 flex-1" />

          <Skeleton className="h-10 flex-1" />
        </div>
        <div className="w-7">
          <Skeleton className="h-8" />
        </div>
      </div>
    </div>
  )
}
