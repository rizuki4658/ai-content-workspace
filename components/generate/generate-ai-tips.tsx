import { Lightbulb } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

export default function GenerateWriteTipsCard({ data }: { data: string[] }) {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400" />
            <CardTitle className="text-base">Content Tips</CardTitle>
          </div>

          <CardDescription className="text-sm">
            Write clearer prompts to get more structured, relevant, and high-quality AI-generated content.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <ul className="h-150 overflow-x-hidden overflow-y-auto space-y-4 px-4 list-disc">
          {data.map((tip, i) => (
            <li key={`${i}_generate_tips`}>{tip}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
