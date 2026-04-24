import { Card, CardContent } from "@/components/ui/card"
import ContentsFilterSkeleton from "./skeletons/contents-filter-skeleton"
import ContentsPaginationSkeleton from "./skeletons/contents-pagination-skeleton"
import { ContentsTableSkeleton, ContentsListSkeleton } from "./skeletons/contents-table-list-skeleton"

export default function ContentsSkeletonCard() {
  return (
    <Card>
      <CardContent>
        <div className="space-y-10">
          <ContentsFilterSkeleton />

          <div className="space-y-4">
            <ContentsTableSkeleton />
            <ContentsListSkeleton />
            <ContentsPaginationSkeleton />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}