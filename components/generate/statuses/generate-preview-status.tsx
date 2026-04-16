"use client"

import * as React from "react"
import { SiOpenai } from "react-icons/si"
import { X } from "lucide-react"

import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface LoadingTemplateProps {
  isFinished: boolean;
  onComplete: () => void;
}

function EmptyTemplate() {
  return (
    <CardContent className="flex flex-col items-center justify-center min-h-100 h-full gap-2">
      <SiOpenai size={56} className="opacity-10" />
      <div className="text-center max-w-xs space-y-1">
        <p className="text-muted-foreground/50">No content generated yet</p>
        <p className="text-muted-foreground/50 text-xs">Fill in the form and generate content to preview your AI-powered result here.</p>
      </div>
    </CardContent>
  )
}

function FailedTemplate() {
  return (
    <CardContent className="flex flex-col items-center justify-center h-full gap-2">
      <div className="relative">
        <SiOpenai size={56} className="opacity-10" />
        <div className="z-0 absolute -top-1 -right-1 bg-muted-foreground/10 rounded-full">
          <X className="text-white"  />
        </div>
      </div>
      <div className="text-center max-w-xs space-y-1">
        <p className="text-muted-foreground/50">Generated is failed. Please try again!</p>
      </div>
    </CardContent>
  )
}

function LoadingTemplate({
  isFinished,
  onComplete
}: LoadingTemplateProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (!isFinished) {
          if (prev >= 90) return prev
          return prev + 2
        } else {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10
        }
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isFinished])

  // Efek trigger onComplete hanya jika sudah 100%
  React.useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(onComplete, 300)
      return () => clearTimeout(timeout)
    }
  }, [progress, onComplete])

  return (
    <CardContent className="flex flex-col items-center justify-center h-full min-h-100 gap-6 animate-in fade-in duration-500">
      <SiOpenai size={56} className="animate-pulse spin-out" />

      <div className="text-center max-w-xs space-y-4">
        <div className="space-y-1">
          <p className="font-medium text-sm flex items-center justify-center gap-0.5">
            Generating your content
            <span className="w-2 flex justify-start">
              <span className="after:content-[''] after:animate-[dots_1.5s_steps(4,end)_infinite]"></span>
            </span>
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Our AI is crafting the best result for you. Please wait a moment.
          </p>
        </div>
        <Progress value={progress} className="h-1 w-full bg-muted" />
      </div>
    </CardContent>
  )
}

export default function GeneratePreviewStatus({ type, isFinished, onComplete }: { type?: "failed" | "loading" | null; isFinished?: boolean; onComplete?: () => void }) {
  if (type === "failed") return (
    <Card>
      <FailedTemplate />
    </Card>
  )
  if (type === "loading") return (
    <Card>
      <LoadingTemplate isFinished={isFinished || false} onComplete={onComplete || (() => {})} />
    </Card>
  )

  return (
    <Card>
      <EmptyTemplate />
    </Card>
  )
}
