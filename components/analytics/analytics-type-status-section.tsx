"use client"

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Sector
} from "recharts"

import type { DashboardContentDistribution } from "@/lib/types/dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GetAnalyticsResponse } from "@/lib/api/analytics";
import { useEffect, useState } from "react";
import { ideaTypes } from "@/lib/data/generate";
import { contentTypeColorChartMap } from "@/lib/data/contents";
import AnalyticsTypeStatusSkeleton from "./skeletons/analytics-type-status-section";

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="drop-shadow-xl"
      />
    </g>
  )
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) return null

  const item = payload[0].payload as DashboardContentDistribution

  return (
    <div className="rounded-lg border border-border bg-background/95 p-3 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div 
          className="h-2 w-2 rounded-full" 
          style={{ backgroundColor: payload[0].payload.fill }} 
        />
        <p className="text-sm font-semibold text-foreground">{item.name}</p>
      </div>
      <p className="mt-1 text-xs text-muted-foreground font-medium">
        {item.value}% <span className="opacity-70">Contribution</span>
      </p>
    </div>
  )
}

export function AnalyticsTypeStatusSectionSummary({ data }: { data?: any[] }) {
  if (!data?.length) return null

  const sorted = [...data].sort((a, b) => b.value - a.value)
  const top = sorted[0]

  return (
    <div className="space-y-4 mt-2">
      <div className="space-y-4">
        {data.map((item: any) => {
          const isTop = item.name === top?.name

          return (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
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
    </div>
  )
}

export default function AnalyticsTypeStatusSection({
  data,
  loading,
  fetching
}: {
  data?: GetAnalyticsResponse['distribution'];
  loading: boolean;
  fetching: boolean;
}) {
  const [items, setItems] = useState<any>([])

  useEffect(() => {
    setItems(Object.keys(data || {}).filter(i => i !== 'total').map((key) => ({
      name: ideaTypes[key as keyof typeof ideaTypes],
      value: data?.[key as keyof typeof data],
      fill: contentTypeColorChartMap[key as keyof typeof contentTypeColorChartMap]
    })
  ))
  }, [data])

  return (
    !loading && !fetching ? <div className="grid sm:grid-cols-2 gap-6">
      <Card className="rounded-sm p-0! block!">
        <CardContent className="px-4 py-6">
          <CardHeader>
            <CardTitle>
              <p className="text-sm">Content Types</p>
            </CardTitle>
            <CardDescription>
              <p className="text-xs text-muted-foreground">Breakdown of content by type</p>
            </CardDescription>
          </CardHeader>

          <div className="h-65 w-full flex items-center justify-center relative">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  activeShape={renderActiveShape}
                  data={items}
                  cx="50%"
                  cy="50%"
                  paddingAngle={0.2}
                  dataKey="value"
                  stroke="none"
                  zIndex={1}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute -bottom-1 left-0 right-0">
              <div className="flex w-full flex-wrap justify-center gap-x-4 gap-y-2">
                {items.map((item: any) => (
                  <div 
                    key={item.name}
                    className={`flex items-center gap-2 cursor-default transition-all duration-200 hover:opacity-100 hover:scale-105 opacity-50`}>
                    <div 
                      className="h-2.5 w-2.5 rounded-full" 
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-[11px] font-medium text-foreground tracking-tight">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-sm p-0! block!">
        <CardContent className="px-4 py-6">
          <CardHeader>
            <CardTitle>
              <p className="text-sm">Content Status</p>
            </CardTitle>
            <CardDescription>
              <p className="text-xs text-muted-foreground">Distribution by workflow status</p>
            </CardDescription>
            <AnalyticsTypeStatusSectionSummary data={items} />
          </CardHeader>
        </CardContent>
      </Card>
    </div> : <AnalyticsTypeStatusSkeleton />
  )
}
