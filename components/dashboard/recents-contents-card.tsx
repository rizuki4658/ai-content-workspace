import type { ContentItem } from "@/lib/types/content"
import { relativeDate } from "@/lib/utils/date-format"
import { renderBadge } from "../contents/contents-helper"

import { FileText } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardRecentsContentsCard({ data }: { data: ContentItem[] }) {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Recent Contents</CardTitle>
            </div>

            <CardDescription>
              Recently generated and updated content in your workspace.
            </CardDescription>
          </div>

          <Link href="/contents">
            <Button variant="link" className="text-xs font-medium text-primary">
              View all
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {data.map((content) => (
          <div
            key={content.id}
            className="group flex items-start justify-between gap-3 rounded-md border p-3 transition hover:bg-muted"
          >
            <div className="flex min-w-0 items-start gap-3">
              <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />

              <div className="min-w-0 space-y-1">
                <Link href={`/contents?id=${content.id}`}>
                  <Button
                    variant="link"
                    className="dark:text-white text-black block truncate text-sm font-medium px-0! h-auto!">
                    {content.title}
                  </Button>
                </Link>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{renderBadge({ item: content as any, key: 'type' })}</span>
                  <span>•</span>
                  <span>{relativeDate(content.createdAt)}</span>
                </div>
              </div>
            </div>

            {renderBadge({ item: content as any, key: 'status' })}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
