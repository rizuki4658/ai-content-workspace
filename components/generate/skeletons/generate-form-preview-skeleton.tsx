
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function GenerateFormPreviewSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="rounded-sm">
        <CardHeader className="space-y-2">
          <CardTitle>
            <Skeleton className="h-6 w-1/3" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-3 w-1/2" />
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          
          {/* Content Type */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-full" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-full" />
          </div>

          {/* Prompt */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-20 w-full" />
          </div>

          {/* Tone + Audience */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-8 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-8 w-full" />
            </div>

          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-full" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-1/3" />
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
