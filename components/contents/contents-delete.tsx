import { useEffect, useState } from "react"
import { ContentItem } from "@/lib/types/content"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contentsDeleteFormSchema, ContentsDeleteFormValues } from "@/lib/validations/contents"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function ContentsDelete({ open, item, onCancel, onConfirm }: {
  open: boolean;
  item: ContentItem | undefined;
  onCancel?: (open: boolean) => void;
  onConfirm?: (id: ContentItem["id"], item: ContentItem) => void | Promise<void>;
}) {
  const defaultValues = {
    id: undefined
  }
  const [content, setContent] = useState<{
    id?: string
  }>(defaultValues)
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContentsDeleteFormValues>({
    resolver: zodResolver(contentsDeleteFormSchema),
    defaultValues,
    mode: "onSubmit"
  })
  const onClear = () => {
    reset(defaultValues)
    onCancel?.(open)
  }
  const onSubmit = async (values: ContentsDeleteFormValues) => {
    if (!item) return

    await onConfirm?.(item.id, item)

    onClear()
  }

  useEffect(() => {
    if (open && item) {
      reset({
        id: item.id
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
              Delete Content?
            </div>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form
          id="form-edit"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <Trash2 className="mx-auto h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground text-center w-full">Are you sure you want to delete "{item?.title}"? This action <b>cannot be undone</b> and the data will be permanently removed from our servers.</p>
            {/* Status */}
            <Controller
              name="id"
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
                variant="destructive"
                className={`${isSubmitting ? "bg-muted-foreground cursor-not-allowed" : "hover:opacity-100 focus:opacity-100 opacity-80"} rounded-sm`}
                size="lg"
                type="submit"
                disabled={isSubmitting}>
                Delete
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
