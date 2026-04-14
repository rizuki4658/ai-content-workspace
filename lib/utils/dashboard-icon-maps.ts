import {
  Sparkles,
  TrendingUp,
  Wand2,
  FileText,
  PenTool,
  CheckCircle2,
  Lightbulb,
  FilePenLineIcon as FilePenLine,
  Megaphone,
  Mail
} from "lucide-react"

export const highlightIconMap = {
  performance: TrendingUp,
  draft: Wand2,
}

export const statIconMap = {
  file: FileText,
  draft: PenTool
}

export const activityIconMap = {
  generated: Sparkles,
  published: CheckCircle2,
  suggest: Lightbulb
}

export const quickActionIconMap = {
  blog: FilePenLine,
  social: Megaphone,
  email: Mail
}
