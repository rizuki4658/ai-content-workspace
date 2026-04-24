import React from "react"

export function formatContentText(rawText: string | null | undefined) {
  if (!rawText || typeof rawText !== 'string') return null

  const parts = rawText.split(/(\*\*.*?\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const content = part.slice(2, -2)
      return (
        <strong key={index} className="font-bold text-foreground inline-block">
          {content}
        </strong>
      )
    }

    return part
  })
}
