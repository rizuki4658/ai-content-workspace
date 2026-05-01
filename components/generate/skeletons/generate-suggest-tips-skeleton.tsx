import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function GenerateSuggestSkeleton() {
  return (
    <Card className="rounded-sm h-150 lg:col-span-4 md:col-span-3 col-span-6">
      <CardHeader>
        <div className="space-y-1">
          <div className="flex items-center gap-2 w-full">
            <Skeleton className="w-6 h-6" />
            <CardTitle className="text-base w-full">
              <Skeleton className="w-1/3 h-6" />
            </CardTitle>
          </div>
          <CardDescription>
            <Skeleton className="w-10/12 h-5" />
          </CardDescription>
        </div>
      </CardHeader>
  
      <CardContent className="grid gap-3">
        {Array.from({ length: 5 }).map((_, i) => {
  
          return (
            <div
              key={i}
              className="flex items-start justify-between gap-4 rounded-md border p-4"
            >
              <div className="flex w-full items-start gap-3">
                <Skeleton className="h-6 w-6" />
  
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="w-1/3 h-6" />
                  <Skeleton className="w-full h-4" />
                </div>
              </div>
  
              <Skeleton className="w-1/6 h-4" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export function GenerateTipsSkeleton() {
  return (
    <Card className="rounded-sm lg:col-span-2 md:col-span-3 col-span-6">
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-1/3" />
          </div>

          <CardDescription className="text-sm">
            <Skeleton className="h-8 w-full"/>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 h-120 overflow-x-hidden overflow-y-auto">
        <ul className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={`${i}_generate_tips`} className="space-y-1">
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default function GenerateSuggestTipsSkeleton() {
  return (
    <div className="grid gap-6 grid-cols-6">
      <GenerateSuggestSkeleton />
      <GenerateTipsSkeleton />
    </div>
  )
}
