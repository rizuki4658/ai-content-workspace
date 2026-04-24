
import { Skeleton } from "@/components/ui/skeleton"

export default function ContentsPaginationSkeleton() {
  return (
    <div>
      <div className="hidden md:block">
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex-1 max-w-100">
            <Skeleton className="w-full h-8" />
          </div>
          <div className="flex-1 flex items-center justify-end gap-x-2">
            <Skeleton className="w-40 h-10" />
            <Skeleton className="w-40 h-10" />
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <div className="flex items-center justify-between gap-x-2">
          <Skeleton className="flex-1 h-10" />
          <Skeleton className="flex-1 h-10" />
        </div>
      </div>
    </div>
  )
}
