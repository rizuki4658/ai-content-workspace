import { DashboardContentDistribution } from "@/lib/types/dashboard"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import DashboardContentDistributionChart from "./content-distribution-chart"

function BaseTemplate({ data }: { data: DashboardContentDistribution[] }) {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle className="text-base">
          Content Distribution
        </CardTitle>
        <CardDescription>
          Breakdown of generated content by type.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-center h-65">
        <DashboardContentDistributionChart data={data} />
      </CardContent>
    </Card>
  )
}

function SkeletonTemplate() {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle className="text-base">
          <Skeleton className="w-1/3 h-6" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-1/2 h-5" />
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-center h-65">
        <Skeleton className="w-48 h-48 rounded-full" />
      </CardContent>
    </Card>
  )
}

export default function DashboardContentDistributionCard({ data, loading }: {
  data: DashboardContentDistribution[];
  loading?: boolean
}) {
  return (
    loading ? <SkeletonTemplate /> : <BaseTemplate data={data} />
  )
}
