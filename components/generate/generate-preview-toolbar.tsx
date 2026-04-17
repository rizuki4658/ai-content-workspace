import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

import { Copy, Maximize2, Trash2, Check } from "lucide-react"

export default function GeneratePreviewToolbar({
  elementRef,
  className,
  onExpand,
  onDiscard
}: {
  elementRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
  onExpand: () => void,
  onDiscard: () => void
}) {
  const [isCopied, setIsCopied] = useState(false)
  const onCopy = async () => {
    if (!elementRef.current) return

    await navigator.clipboard.writeText(elementRef.current.innerText)
    setIsCopied(true)

    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <ButtonGroup className={className}>
      <Button
        variant="ghost"
        size="sm"
        className={`bg-muted rounded-none border-0 rounded-tl-sm`}
        onClick={onCopy}>
        {isCopied ? <Check /> : <Copy /> }
        {isCopied ? 'Copied!' : 'Copy Content' }
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="bg-muted rounded-none border-0"
        onClick={onExpand}>
        <Maximize2 /> Expand
      </Button>
      <Button
        variant="destructive"
        size="sm"
        className="rounded-none border-0 rounded-tr-sm"
        onClick={onDiscard}>
        <Trash2 /> Discard
      </Button>
    </ButtonGroup>
  )
}