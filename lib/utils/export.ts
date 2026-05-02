import { ContentItem } from "@/lib/types/content";
import { ideaTones, ideaTypes } from "@/lib/data/generate";

// src/lib/utils/export-helpers.ts
export const onExportMarkdown = async (data: ContentItem[]) => {
  const JSZip = (await import("jszip")).default
  const zip = new JSZip()
  const folder = zip.folder("export")

  data.forEach((item, index) => {
    folder?.file(`${item.title || (index + 1)}.md`, `# ${item.title}\n\n\n# Type: ${ideaTypes[item.type]}\n# Tone: ${ideaTones[item.tone as keyof typeof ideaTones]}\n# Target Audience: ${item.targetAudience || '-'}\n# Keywords: ${item.keywords || '-'}\n# Prompt: ${item.prompt || '-'}\n\n\n\n${item.output}`)
  })

  const blob = await zip.generateAsync({ type: "blob" })
  
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "ai-content-workspace.zip"
  a.click()
  window.URL.revokeObjectURL(url)
}

export const onExportJSON = (data: any[]) => {
  const jsonString = JSON.stringify(data, null, 2)
  
  const blob = new Blob([jsonString], { type: "application/json" })
  
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  
  const date = new Date().toISOString().split('T')[0]
  link.download = `ai-content-backup-${date}.json`
  
  document.body.appendChild(link)
  link.click()
  
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
