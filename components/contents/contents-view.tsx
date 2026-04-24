import { ContentItem } from "@/lib/types/content"
import { formatContentText } from "@/lib/utils/format-text"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function ContentsView({ open, item, onClose }: {
  open: boolean;
  item: ContentItem | undefined;
  onClose: (open: boolean) => void
}) {

  return (
    <Dialog
      open={open}>
      <DialogContent
        showCloseButton={false}
        className="max-w-none! w-[95vw] h-[95vh] flex flex-col p-0">
        <DialogHeader className="p-6">
          <DialogTitle>
            <div className="flex items-center justify-between">
              {item?.title}
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => onClose(open)}>
                  <X />
                </Button>
              </DialogClose>
            </div>
          </DialogTitle>
          <DialogDescription>
            {item?.prompt}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <article className="whitespace-pre-wrap wrap-break-words leading-relaxed text-muted-foreground">
            {formatContentText(item?.output || '')}
          </article>
        </div>
      </DialogContent>
    </Dialog>
  )
}