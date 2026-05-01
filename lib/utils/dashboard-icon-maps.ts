import {
  Sparkles,
  FileText,
  PenTool,
  CheckCircle2,
  Lightbulb,
  FilePenLineIcon as FilePenLine,
  Megaphone,
  Mail
} from "lucide-react"

export const statIconMap = {
  file: FileText,
  draft: PenTool
}

export const activityIconMap = {
  draft: Sparkles,
  published: CheckCircle2,
  ready: Lightbulb
}

export const quickActionIconMap = {
  blog: FilePenLine,
  social: Megaphone,
  email: Mail
}
