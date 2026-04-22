import type { ContentItem } from "@/lib/types/content"

import {
  contentTypeColorMap,
  contentToneColorMap,
  contentStatusColorMap
} from "@/lib/data/contents"
import {
  ideaStatus,
  ideaTypes,
  ideaTones
} from "@/lib/data/generate"

import { Badge } from "@/components/ui/badge"

import {
  FileText,
  CircleCheck,
  Globe,
  Archive,
  BrainCircuit,
  Volume2
} from 'lucide-react'

export function getExcerpt(text: string, length: number = 80) {
  const cleaned = text.replace(/[#*\n]/g, " ")
  return cleaned.length > length
    ? cleaned.slice(0, length) + "..."
    : cleaned
}

export const contentStatusIconMap = {
  draft: FileText,
  ready: CircleCheck,
  published: Globe,
  archived: Archive,
}

export function renderIconStatus(status: keyof typeof contentStatusIconMap) {
  const Icon = contentStatusIconMap[status]
  return <Icon />
}

export function renderBadge({
  item,
  key
}: {
  item: ContentItem;
  key: keyof ContentItem;
}) {
  const value = item[key]

  switch (key) {
    case 'type':
      return (
        <Badge
          variant="secondary"
          className={`${contentTypeColorMap[value as keyof typeof contentTypeColorMap]} text-xs`}>
          <BrainCircuit />
          {ideaTypes[value as keyof typeof ideaTypes]}
        </Badge>
      )
    case 'tone':
      return (
        <Badge
          variant="outline"
          className={`${contentToneColorMap[value as keyof typeof contentToneColorMap]} text-xs`}>
          <Volume2 size={12} />
          {ideaTones[value as keyof typeof ideaTones]}
        </Badge>
      )
    case 'status':
      return (
        <Badge
          className={`${contentStatusColorMap[value as keyof typeof contentStatusColorMap]} text-xs`}>
          {renderIconStatus(value as keyof typeof contentStatusIconMap)}
          {ideaStatus[value as keyof typeof ideaStatus]}
        </Badge>
      )
    default:
      return value?.toString()
  }
}
