
import { Button } from "@/components/ui/button"
import { GetContentResponse } from "@/lib/storage/content"

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function ContentsPagination({
  meta,
  page,
  onPageChange
}: {
  meta: GetContentResponse["meta"];
  page: number;
  onPageChange: (newPage: number) => void
}) {
  const from = ((meta?.page || 1) - 1) * (meta?.limit || 10) + 1
  const to = Math.min((meta?.page || 1) * (meta?.limit || 10), meta?.total || 0)

  const onPrev = () => onPageChange((meta?.page || 1) - 1)
  const onNext = () => onPageChange((meta?.page || 1) + 1)

  return (
    <div className="flex items-center justify-between w-full">
      <div>
        Showing {from} to {to} of {meta?.total || 0} entries
      </div>
      <div className="flex items-center justify-end gap-x-2">
        <Button
          variant="outline"
          className={`${!meta?.hasPrevPage && 'cursor-not-allowed opacity-50'}`}
          disabled={!meta?.hasPrevPage}
          onClick={onPrev}>
          <ChevronLeft />
          Prev
        </Button>
        <Button
          variant="outline"
          className={`${!meta?.hasNextPage && 'cursor-not-allowed opacity-50'}`}
          disabled={!meta?.hasNextPage}
          onClick={onNext}>
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
