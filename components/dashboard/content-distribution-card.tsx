import { DashboardContentDistribution } from "@/lib/types/dashboard"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import DashboardContentDistributionChart from "./content-distribution-chart"

export default function DashboardContentDistributionCard({ data, total }: {
  data: DashboardContentDistribution[];
  total?: number
}) {
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
        <DashboardContentDistributionChart data={data} total={total} />
      </CardContent>
    </Card>
  )
}
