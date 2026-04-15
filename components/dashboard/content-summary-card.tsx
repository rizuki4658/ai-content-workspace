import { DashboardContentDistribution } from "@/lib/types/dashboard"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

export default function DashboardContentSummaryCard({
  data
}: {
  data: DashboardContentDistribution[]
}) {
  const sorted = [...data].sort((a, b) => b.value - a.value)
  const top = sorted[0]
  
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle className="text-base">
          Content Types
        </CardTitle>
      </CardHeader>
  
      <CardContent className="flex h-65 flex-col justify-between space-y-4">
        <div className="space-y-4">
          {data.map((item) => {
            const isTop = item.name === top?.name
  
            return (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="truncate text-muted-foreground">
                      {item.name}
                    </span>
                    {isTop ? (
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                        Top
                      </span>
                    ) : null}
                  </div>
  
                  <span className="font-medium text-foreground">
                    {item.value}%
                  </span>
                </div>
  
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.fill,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
  
        <div className="rounded-md bg-muted p-3">
          <p className="text-xs leading-5 text-muted-foreground">
            {top?.name} is currently the dominant content type with {top?.value}% of
            total generated output.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
