"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileText, Archive, Loader2, FileJson } from 'lucide-react'
import { onExportMarkdown, onExportJSON } from '@/lib/utils/export'
import { ContentItem } from '@/lib/types/content'

export default function SettingsExportSection({ data }: {
  data: ContentItem[];
}) {
  const [isExportingZip, setIsExportingZip] = useState(false)
  const [isExportingPdf, setIsExportingPdf] = useState(false)
  const [isExportingJSON, setIsExportingJSON] = useState(false)

  const onExportZip = async () => {
    setIsExportingZip(true)
    try {
      await onExportMarkdown(data)
    } finally {
      setIsExportingZip(false)
    }
  }

  const onExportingJSON = async () => {
    setIsExportingJSON(true)
    try {
      await onExportJSON(data)
    } finally {
      setIsExportingJSON(false)
    }
  }

  const onExportPdf = async () => {
    setIsExportingPdf(true)
    try {
      const { pdf } = await import('@react-pdf/renderer')
      const { default: SettingsMyDocument } = await import('./SettingsMyDocument')
      
      const blob = await pdf(<SettingsMyDocument data={data} />).toBlob()
      
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "ai-content-data.pdf"
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("PDF Export Error:", error)
    } finally {
      setIsExportingPdf(false)
    }
  }

  return (
    <div className="flex flex-col bg-muted gap-4 p-4 rounded-lg">
      <Button 
        variant="outline" 
        size="lg"
        disabled={isExportingJSON || !data?.length}
        onClick={onExportingJSON}>
        <FileJson className="w-4 h-4 mr-2 text-yellow-600" />
        Export JSON
      </Button>
      <div className="flex bg-muted gap-4 rounded-lg">
        <Button
          variant="outline"
          size="lg"
          onClick={onExportZip}
          disabled={isExportingZip || !data?.length}
          className="flex-1">
          {isExportingZip ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Archive className="w-4 h-4 mr-2" />}
          {isExportingZip ? "Packing..." : "Export ZIP"}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onExportPdf}
          disabled={isExportingPdf || !data?.length}
          className="flex-1">
          {isExportingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
          {isExportingPdf ? "Generating..." : "Export PDF"}
        </Button>
      </div>
    </div>
  )
}
