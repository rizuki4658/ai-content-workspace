import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ideaTones, ideaTypes } from "@/lib/data/generate"
import { GetAnalyticsResponse } from "@/lib/api/analytics"
import { contentToneColorMap, contentTypeColorMap } from "@/lib/data/contents"
import { BrainCircuit, FileText, Volume2 } from "lucide-react"
import { relativeDate } from "@/lib/utils/date-format"
import { renderBadge } from "../contents/contents-helper"
import Link from "next/link"
import { Button } from "../ui/button"
import AnalyticsRecentsInsightsSkeleton from "./skeletons/analytics-recents-insights-skeleton"

function AnalyticsRecentsInsightsSectionDescription({ item }: { item: any }) {
  if (ideaTones?.[item?.type as keyof typeof ideaTones]) {
    return (
      <Badge
        variant="outline"
        className={contentToneColorMap?.[item?.type as keyof typeof contentToneColorMap]}>
        <Volume2 size={12} />
        <p className="text-xs font-medium">{ideaTones?.[item?.type as keyof typeof ideaTones]}</p>
      </Badge>
    )
  }

  if (ideaTypes?.[item?.type as keyof typeof ideaTypes]) {
    return (
      <Badge
        variant="secondary"
        className={contentTypeColorMap?.[item?.type as keyof typeof contentTypeColorMap]}>
        <BrainCircuit />
        <p className="text-xs font-medium">{ideaTypes?.[item?.type as keyof typeof ideaTypes]}</p>
      </Badge>
    )
  }

  return <p className="text-xs font-medium">{item?.description}</p>
}

export default function AnalyticsRecentsInsightsSection({
  data,
  loading,
  fetching
}: {
  data: GetAnalyticsResponse['summary'];
  loading: boolean;
  fetching: boolean;
}) {
  return (
    !loading && !fetching ? <div className="grid md:grid-cols-4 gap-6">
      <div className="md:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>
              <p className="text-sm">Summary</p>
            </CardTitle>
            <CardDescription>
              <p className="text-xs">
                Latest updates across your content
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data?.recents?.map((content) => (
              <div
                key={content.id}
                className="group flex items-start justify-between gap-3 rounded-md border p-3 transition hover:bg-muted"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />

                  <div className="min-w-0 space-y-1">
                    <div>
                      <Link href="/contents">
                        <Button variant="link" className="dark:text-white text-black block truncate text-sm font-medium px-0! h-auto!">
                          {content.title}
                        </Button>
                      </Link>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{renderBadge({ item: content, key: 'type' })}</span>
                      <span>•</span>
                      <span>{relativeDate(content.updatedAt)}</span>
                    </div>
                  </div>
                </div>

                {renderBadge({ item: content, key: 'status' })}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              <p className="text-sm">Insight</p>
            </CardTitle>
            <CardDescription>
              <p className="text-xs">
                Quick summary of your content patterns
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data?.insights?.map((item, key) => (
              <div
                key={key}
                className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <AnalyticsRecentsInsightsSectionDescription item={item} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div> : <AnalyticsRecentsInsightsSkeleton />
  )
}
