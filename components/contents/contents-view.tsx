import { ContentItem } from "@/lib/types/content"
import { formatContentText } from "@/lib/utils/format-text"
import { useMediaQuery } from "@/hooks/use-media-query"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function ContentsView({ open, item, onClose }: {
  open: boolean;
  item: ContentItem | undefined;
  onClose: (open: boolean) => void
}) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  if (isMobile) {
    return (
      <Drawer open={open} direction="right">
        <DrawerContent className="max-w-none! w-screen!">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex items-center justify-between">
                {item?.title}
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onClose(open)}>
                    <X />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <article className="whitespace-pre-wrap wrap-break-words leading-relaxed text-muted-foreground">
              {formatContentText(item?.output || '')}
            </article>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog
      open={open}>
      <DialogContent
        showCloseButton={false}
        className="max-w-none! w-full sm:w-[90vw] lg:w-[70vw] h-full sm:h-[90dvh] flex flex-col p-0 gap-0 overflow-hidden">
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