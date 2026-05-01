import { Skeleton } from "@/components/ui/skeleton"

import { DialogFooter } from "@/components/ui/dialog"
import { DrawerFooter } from "@/components/ui/drawer"

export default function ContentsEditFormSkeleton({
  FooterComponent
}: {
  FooterComponent: typeof DialogFooter | typeof DrawerFooter
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 space-y-6">
        <div className="space-y-1">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-10 w-full rounded-sm" />
        </div>

        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-5">
            <div className="space-y-1">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-10 w-full rounded-sm" />
            </div>
          </div>

          <div className="col-span-6 sm:col-span-2 md:col-span-2 lg:col-span-1">
            <div className="space-y-1">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-10 w-full rounded-sm" />
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="min-h-55 flex-1 w-full rounded-sm" />
        </div>
      </div>

      <div className="mx-0! my-0!">
        <div className="flex w-full items-center justify-end gap-3">
          <Skeleton className="h-11 w-24 rounded-sm" />
          <Skeleton className="h-11 w-24 rounded-sm" />
        </div>
      </div>
    </div>
  )
}
