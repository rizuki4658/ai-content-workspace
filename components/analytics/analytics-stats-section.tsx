import {
  Card,
  CardContent
} from "@/components/ui/card"
import { contentStatusColorMap } from "@/lib/data/contents"
import { contentStatusIconMap } from "@/components/contents/contents-helper"
import { Layers, LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { GetAnalyticsResponse } from "@/lib/types/analytics"
import AnalyticsStatsSkeleton from "./skeletons/analytics-stats-skeleton"

export function Icon ({
  className,
  icon
}: {
  className?: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}) {
  const Icon = icon
  return className ? <Icon className={className} /> : <Icon />
}

const getStatConfig = (type: string, count: number) => {
  const configs = {
    total: {
      label: "Total Content",
      desc: count > 0 ? "Across all saved contents" : "No contents saved yet",
      color: 'bg-primary/10 text-primary',
      icon: Layers
    },
    draft: {
      label: "Draft",
      desc: count > 0 ? `${count} items need review` : "All caught up!",
      color: contentStatusColorMap['draft'],
      icon: contentStatusIconMap['draft']
    },
    ready: {
      label: "Ready",
      desc: count > 0 ? "Approved for publishing" : "No content ready yet",
      color: contentStatusColorMap['ready'],
      icon: contentStatusIconMap['ready']
    },
    published: {
      label: "Published",
      desc: count > 0 ? "Successfully live" : "Nothing published yet",
      color: contentStatusColorMap['published'],
      icon: contentStatusIconMap['published']
    }
  }

  return configs[type as keyof typeof configs]
}

export default function AnalyticsStatsSection({
  data,
  loading,
  fetching
}: {
  data: GetAnalyticsResponse['stats'];
  loading: boolean;
  fetching: boolean;
}) {
  return (
    !loading && !fetching ? <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.keys(data || {}).map((key) => (
        <Card key={key} className="rounded-sm p-0! block!">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-md ${getStatConfig(key, Number(data?.[key as keyof typeof data] || 0)).color}`}>
                  <Icon
                    className="h-6 w-6"
                    icon={getStatConfig(key, Number(data?.[key as keyof typeof data] || 0)).icon}
                  />
                </div>
                <div className="text-xl font-semibold">
                  {data?.[key as keyof typeof data]}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">{getStatConfig(key, Number(data?.[key as keyof typeof data] || 0)).label}</p>
                <p className="text-xs text-muted-foreground">{getStatConfig(key, Number(data?.[key as keyof typeof data] || 0)).desc}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div> : <AnalyticsStatsSkeleton />
  )
}
