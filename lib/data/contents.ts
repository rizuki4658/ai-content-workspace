import { ContentItem } from "@/lib/types/content"

export const contentHeaders: { name: string; key: keyof ContentItem }[] = [{
    "name": "Title",
    "key": "title"
  }, {
    "name": "Type",
    "key": "type"
  }, {
    "name": "Tone",
    "key": "tone"
  }, {
    "name": "Status",
    "key": "status"
  }, {
    "name": "Updated at",
    "key": "updatedAt"
}]

export const contentTypeColorMap = {
  blog_idea: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  caption: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  email: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  product_description: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  social_media: "bg-green-500/10 text-green-500 border-green-500/20",
}

export const contentToneColorMap = {
  professional: "text-slate-600",
  casual: "text-yellow-600",
  friendly: "text-emerald-600",
  persuasive: "text-red-500",
  bold: "text-indigo-500",
  default: ""
}

export const contentStatusColorMap = {
  draft: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  ready: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  published: "bg-green-500/10 text-green-600 border-green-500/20",
  archived: "bg-muted text-muted-foreground border-muted-foreground/20",
}

export const contentTypeColorChartMap = {
  blog_idea: '#A70CFA',
  caption: '#F6339A',
  email: '#2B7FFF',
  product_description: '#FF6900',
  social_media: '#00C950'
}
