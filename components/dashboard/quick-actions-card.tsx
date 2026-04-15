import { DashboardQuickActions } from "@/lib/types/dashboard";

import { Zap, FilePenLine } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { quickActionIconMap } from "@/lib/utils/dashboard-icon-maps"

export default function DashboardQuickActionsCard({ data }: { data: DashboardQuickActions[] }) {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </div>
          <CardDescription>
            Start a new task faster with common content workflows.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3">
        {data.map((action) => {
          const Icon =
            quickActionIconMap[
              action.icon as keyof typeof quickActionIconMap
            ] || FilePenLine

          return (
            <div
              key={action.id}
              className="flex items-start justify-between gap-4 rounded-md border p-4 transition hover:bg-muted"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-primary/10 p-2 text-primary">
                  <Icon className="h-4 w-4" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>

              <Button size="sm" variant="secondary">
                {action.cta}
              </Button>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
