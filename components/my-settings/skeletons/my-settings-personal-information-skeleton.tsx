import { Skeleton } from "@/components/ui/skeleton"

export default function MySettingsPersonalInformationSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      <Skeleton className="h-11 w-full rounded-md" />
    </div>
  )
}
