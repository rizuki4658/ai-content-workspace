
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function ContentsPagination() {
  return (
    <div className="flex items-center justify-between w-full">
      <div>
        Showing 1 to 5 of 10 entries
      </div>
      <div className="flex items-center justify-end gap-x-2">
        <Button
          variant="outline">
          <ChevronLeft />
          Prev
        </Button>
        <Button
          variant="outline">
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
