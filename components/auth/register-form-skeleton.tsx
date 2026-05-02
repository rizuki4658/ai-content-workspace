import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function RegisterFormSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md px-4 py-10 sm:px-8">
        <CardHeader className="space-y-1">
          <CardTitle className="flex flex-col items-center justify-center gap-4">
            <Skeleton className="h-16 w-16 rounded-xl" />
            <Skeleton className="h-6 w-56" />
          </CardTitle>

          <CardDescription className="flex justify-center">
            <Skeleton className="h-4 w-64" />
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
