import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SettingsDataManagementCardDeleteSkeleton() {
  return <Skeleton className="w-full h-10" />
}

export function SettingsDataManagementCardExportSkeleton() {
  return <div className="flex bg-muted/10 gap-4 p-4 rounded-lg">
    <Skeleton className="flex-1 h-10" />
    <Skeleton className="flex-1 h-10" />
  </div>
}

export default function SettingsPreferenceDataManagementSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-1/3 h-6" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-1/2 h-4" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SettingsDataManagementCardExportSkeleton />
        <SettingsDataManagementCardDeleteSkeleton />
      </CardContent>
    </Card>
  )
}