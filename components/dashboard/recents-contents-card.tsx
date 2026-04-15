import type { DashboardRecentContentItem } from "@/lib/types/dashboard"

import { FileText } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function DashboardRecentsContentsCard({ data }: { data: DashboardRecentContentItem[] }) {
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

          <Button variant="link" className="text-xs font-medium text-primary">
            View all
          </Button>
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
                <p className="truncate text-sm font-medium">
                  {content.title}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{content.type}</span>
                  <span>•</span>
                  <span>{content.createdAt}</span>
                </div>
              </div>
            </div>

            <Badge
              variant={
                content.status === "published" ? "default" : "secondary"
              }
            >
              {content.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
