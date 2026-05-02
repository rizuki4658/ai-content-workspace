"use client"

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Sector
} from "recharts"

import type { DashboardContentDistribution } from "@/lib/types/dashboard"

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

export default function DashboardContentDistributionChart({
  data,
  total
}: {
  data: DashboardContentDistribution[];
  total?: number;
}) {

  return !!total ? (
    <div className="h-65 w-full flex items-center justify-center relative">
      <ResponsiveContainer width={200} height={200}>
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            paddingAngle={0.2}
            dataKey="value"
            stroke="none"
            zIndex={1}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex w-full flex-wrap justify-center gap-x-4 gap-y-2">
          {data.map((item) => (
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
  ) : (
    <div className="h-65 w-full flex items-center justify-center relative">
      <div className="h-40 w-40 rounded-full bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No content yet</p>
      </div>
    </div>
  )
}
