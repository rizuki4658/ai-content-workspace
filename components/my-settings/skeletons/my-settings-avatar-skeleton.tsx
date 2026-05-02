import { CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MySettingsAvatarSkeleton() {
  return (
    <CardTitle className="pt-4">
      <div className="flex flex-col justify-center items-center">
        <div className="relative">
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>
      </div>
    </CardTitle>
  )
}
