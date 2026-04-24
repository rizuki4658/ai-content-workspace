import { Skeleton } from "@/components/ui/skeleton"

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@/components/ui/table'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export function ContentsTableSkeleton() {
  return (
    <div className="hidden md:block overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: 5 }).map((_, nHeader) => (
              <TableHead key={nHeader}>
                <Skeleton className="h-6" />
              </TableHead>
            ))}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 9 }).map((_, nRow) => (
            <TableRow key={`${nRow}`}>
              {Array.from({ length: 5 }).map((_, nCell) => (
                <TableCell
                  key={`${nRow}_${nCell}`}>
                  <Skeleton className="h-10" />
                </TableCell>
              ))}
              <TableCell width="40px">
                <Skeleton className="h-10" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function ContentsListSkeleton() {
  return (
    <div className="block md:hidden space-y-4">
      {Array.from({ length: 10 }).map((_, n) => (
        <Card key={n}>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between gap-1">
                <div className="flex w-full items-center gap-1">
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-8 w-10/12" />
                </div>
                <Skeleton className="w-10 h-10" />
              </div>
            </CardTitle>
            <CardDescription>
              <div className="w-full">
                <Skeleton className="h-8" />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full justify-between gap-1">
              <div className="flex w-full items-center gap-1">
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-8 w-1/4" />
              </div>
              <Skeleton className="h-8 w-1/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
