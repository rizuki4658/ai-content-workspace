import { ContentItem } from "@/lib/types/content"
import { ContentsEditFormValues } from "@/lib/validations/contents"
import { relativeDate } from "@/lib/utils/date-format"
import { useMediaQuery } from "@/hooks/use-media-query"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import ContentsEditForm from "./contents-edit-form"

export default function ContentsEdit({ open, item, onClose, onSave }: {
  open: boolean;
  item: ContentItem | undefined;
  onClose?: (open: boolean) => void;
  onSave?: (item: ContentItem) => void | Promise<void>;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  const onCancel = () => {
    onClose?.(false)
  }

  const onSubmit = async (values: ContentsEditFormValues) => {
    if (!item) return

    await onSave?.({
      ...item,
      ...values,
    })

    onClose?.(false)
  }

  if (isMobile) {
    return (
      <Drawer open={open} direction="right">
        <DrawerContent className="max-w-none! w-screen!">
          <DrawerHeader>
            <DrawerTitle>
              <div className="text-lg flex gap-1 items-center justify-between">
                Edit
                <span className="text-xs text-muted-foreground text-right">
                  updated at: <br />
                  {relativeDate(item?.updatedAt || '')}
                </span>
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <ContentsEditForm
            item={item}
            onSubmit={onSubmit}
            onCancel={onCancel}
            FooterComponent={DrawerFooter}
          />
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
        <DialogHeader className="p-6 border-b gap-0!">
          <DialogTitle>
            <div className="text-lg flex gap-1 items-center justify-between">
              Edit
              <span className="text-xs text-muted-foreground text-right">
                updated at: <br />
                {relativeDate(item?.updatedAt || '')}
              </span>
            </div>
          </DialogTitle>
          <DialogDescription>
            <span>Manage your content generated here!</span>
          </DialogDescription>
        </DialogHeader>

        <ContentsEditForm
          item={item}
          onSubmit={onSubmit}
          onCancel={onCancel}
          FooterComponent={DialogFooter}
        />
      </DialogContent>
    </Dialog>
  )
}
