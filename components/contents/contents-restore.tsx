import { useEffect, useState } from "react"
import { ContentItem, ContentStatus } from "@/lib/types/content"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contentsStatusFormSchema, ContentsStatusFormValues } from "@/lib/validations/contents"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArchiveRestore } from "lucide-react"

export default function ContentsRestore({ open, item, onCancel, onConfirm }: {
  open: boolean;
  item: ContentItem | undefined;
  onCancel?: (open: boolean) => void;
  onConfirm?: (item: ContentItem) => void | Promise<void>;
}) {
  const defaultValues = {
    status: undefined
  }
  const [content, setContent] = useState<{
    status?: ContentStatus
  }>(defaultValues)
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContentsStatusFormValues>({
    resolver: zodResolver(contentsStatusFormSchema),
    defaultValues,
    mode: "onSubmit"
  })
  const onClear = () => {
    reset(defaultValues)
    onCancel?.(open)
  }
  const onSubmit = async (values: ContentsStatusFormValues) => {
    if (!item) return

    const updatedItem = {
      ...item,
      ...values,
    }

    await onConfirm?.(updatedItem)

    onClear()
  }

  useEffect(() => {
    if (open && item) {
      reset({
        status: item.status
      })
    }
  }, [open, item, reset])

  return (
    <Dialog
      open={open}>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col p-0 gap-0!">
        <DialogHeader className="px-6 pt-6 gap-0!">
          <DialogTitle>
            <div className="flex gap-1 items-center justify-center">
              Restore Content?
            </div>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form
          id="form-edit"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <ArchiveRestore className="mx-auto h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground text-center w-full">This will move "<b>{item?.title}</b>" back to your active workspace. You can find it in your main dashboard again.</p>
            {/* Status */}
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Input
                  { ...field }
                  type="hidden"
                  disabled
                  className="rounded-sm"
                />
              )}
            />
            <div className="flex w-full items-center justify-center gap-3">
              <Button
                className={`${isSubmitting ? "bg-muted-foreground cursor-not-allowed" : ""} transition-all ease-in-out duration-300 rounded-sm`}
                size="lg"
                variant="ghost"
                disabled={isSubmitting}
                type="button"
                onClick={onClear}>
                Cancel
              </Button>
              <Button
                className={`${isSubmitting ? "bg-muted-foreground cursor-not-allowed" : "hover:opacity-100 focus:opacity-100 opacity-80"} rounded-sm`}
                size="lg"
                type="submit"
                disabled={isSubmitting}>
                Restore
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
