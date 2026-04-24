import { useEffect, useState } from "react"
import { ContentItem, ContentStatus } from "@/lib/types/content"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contentsEditFormSchema, ContentsEditFormValues } from "@/lib/validations/contents"
import { ideaStatus } from "@/lib/data/generate"
import { renderIconStatus } from "./contents-helper"
import { relativeDate } from "@/lib/utils/date-format"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export default function ContentsEdit({ open, item, onClose, onSave }: {
  open: boolean;
  item: ContentItem | undefined;
  onClose?: (open: boolean) => void;
  onSave?: (item: ContentItem) => void | Promise<void>;
}) {
  const defaultValues = {
    title: undefined,
    output: undefined,
    status: undefined
  }
  const [content, setContent] = useState<{
    title?: string;
    output?: string;
    status?: ContentStatus
  }>(defaultValues)
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContentsEditFormValues>({
    resolver: zodResolver(contentsEditFormSchema),
    defaultValues,
    mode: "onSubmit"
  })
  const onClear = () => {
    reset(defaultValues)
    onClose?.(open)
  }
  const onSubmit = async (values: ContentsEditFormValues) => {
    if (!item) return

    const updatedItem = {
      ...item,
      ...values,
    }

    await onSave?.(updatedItem)

    onClear()
  }

  useEffect(() => {
    if (open && item) {
      reset({
        title: item.title,
        output: item.output,
        status: item.status
      })
    }
  }, [open, item, reset])

  return (
    <Dialog
      open={open}>
      <DialogContent
        showCloseButton={false}
        className="max-w-none! w-[70vw] flex flex-col p-0 gap-0!">
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

        <form
          id="form-edit"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {item?.prompt ? <Field className="gap-1">
              <FieldLabel className="text-xs" htmlFor="content-prompt">Prompt</FieldLabel>
                <Input
                  value={item?.prompt}
                  id="content-prompt"
                  placeholder="Prompt..."
                  className="rounded-sm"
                  readOnly
                  disabled
                />
              </Field> : null
            }
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-5">
                {/* Title */}
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field className="gap-1" data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-xs" htmlFor="content-title">Title</FieldLabel>
                      <Input
                        { ...field }
                        id="content-title"
                        placeholder="Enter a working title..."
                        className="rounded-sm"
                        aria-invalid={fieldState.invalid}
                      />
                      { fieldState.invalid && <FieldError className="text-xs" errors={[fieldState.error]} /> }
                    </Field>
                  )}
                />
              </div>
              <div className="col-span-6 sm:col-span-2 md:col-span-2 lg:col-span-1">
                {/* Content Status */}
                <Controller
                  name="status"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel className="text-xs">Status</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger
                          id="content-status"
                          className="w-full rounded-sm"
                          aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Select content status">
                            <div className="text-sm flex items-center gap-1.5">
                              {renderIconStatus(field.value, 'h-3! w-3!')}
                              <div className="truncate flex-1">
                                {ideaStatus[field.value]}
                              </div>
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent position="popper" align="end" className="rounded-sm">
                          {(Object.keys(ideaStatus) as Array<keyof typeof ideaStatus>).map((key) => (
                            <SelectItem key={key} value={key}>
                              <div className="text-sm flex items-center gap-2">
                                {renderIconStatus(key, 'h-3! w-3!')}
                                {ideaStatus[key]}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      { fieldState.invalid && <FieldError className="text-xs" errors={[fieldState.error]} /> }
                    </Field>
                  )}
                />
              </div>
            </div>
            {/* Output */}
            <Controller
              name="output"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel className="text-xs" htmlFor="content-output">Output</FieldLabel>
                  <Textarea
                    { ...field }
                    id="content-output"
                    rows={8}
                    placeholder="Generated content here..."
                    className="rounded-sm max-h-80"
                    aria-invalid={fieldState.invalid}
                  />
                  { fieldState.invalid && <FieldError className="text-xs" errors={[fieldState.error]} /> }
                </Field>
              )}
            />
          </div>

          <DialogFooter className="mx-0! my-0!">
            <div className="flex w-full items-center justify-end gap-3">
              <Button
                className={`${isSubmitting ? "bg-muted-foreground cursor-not-allowed" : ""} transition-all ease-in-out duration-300 rounded-sm`}
                size="lg"
                variant="outline"
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
                <Save />
                Save
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
