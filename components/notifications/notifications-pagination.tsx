import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

import type { useNotificationsPaginated } from "@/hooks/use-notifications"

type NotificationsPaginatedData = NonNullable<
  ReturnType<typeof useNotificationsPaginated>["data"]
>

type NotificationsPaginationProps = {
  meta?: NotificationsPaginatedData["meta"]
  onPrev: () => void
  onNext: () => void
}

export default function NotificationsPagination({
  meta,
  onPrev,
  onNext,
}: NotificationsPaginationProps) {
  if (!meta) return null

  return (
    <div className="w-full flex items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        Showing {meta.from} to {meta.to} of {meta.total} entries
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className={`${!meta?.hasPrev && "cursor-not-allowed opacity-50"}`}
          disabled={!meta?.hasPrev}
          onClick={onPrev}
        >
          <ChevronLeft />
          Prev
        </Button>

        <Button
          variant="outline"
          className={`${!meta?.hasNext && "cursor-not-allowed opacity-50"}`}
          disabled={!meta?.hasNext}
          onClick={onNext}
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}