import { useEffect } from "react"
import { ContentItem } from "@/lib/types/content"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contentsEditFormSchema, ContentsEditFormValues } from "@/lib/validations/contents"
import { ideaStatus } from "@/lib/data/generate"
import { renderIconStatus } from "./contents-helper"

import {
  Field,
  FieldLabel,
  FieldError
} from "@/components/ui/field"
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DrawerFooter } from "@/components/ui/drawer"
import { DialogFooter } from "@/components/ui/dialog"

import { Save } from 'lucide-react'

type ContentEditFormProps = {
  item?: ContentItem
  onSubmit: (values: ContentsEditFormValues) => void | Promise<void>
  onCancel: () => void
  FooterComponent: typeof DialogFooter | typeof DrawerFooter
}

export default function ContentsEditForm({
  item,
  onSubmit,
  onCancel,
  FooterComponent,
}: ContentEditFormProps) {
  const defaultValues: ContentsEditFormValues = {
    title: '',
    output: '',
    status: 'draft',
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContentsEditFormValues>({
    resolver: zodResolver(contentsEditFormSchema),
    defaultValues,
    mode: "onSubmit",
  })

  useEffect(() => {
    if (!item) return

    reset({
      title: item.title,
      output: item.output,
      status: item.status,
    })
  }, [item, reset])

  return (
    <form
      id="form-edit"
      autoComplete="off"
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 space-y-6">
        {item?.prompt ? (
          <Field className="gap-1">
            <FieldLabel className="text-xs" htmlFor="content-prompt">
              Prompt
            </FieldLabel>
            <Input
              value={item.prompt}
              id="content-prompt"
              placeholder="Prompt..."
              className="rounded-sm"
              readOnly
              disabled
            />
          </Field>
        ) : null}

        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-5">
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="gap-1" data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs" htmlFor="content-title">
                    Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="content-title"
                    placeholder="Enter a working title..."
                    className="rounded-sm"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="col-span-6 sm:col-span-2 md:col-span-2 lg:col-span-1">
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel className="text-xs">Status</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="content-status"
                      className="w-full rounded-sm"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select content status">
                        <div className="text-sm flex items-center gap-1.5">
                          {renderIconStatus(field.value, "h-3! w-3!")}
                          <div className="truncate flex-1">
                            {ideaStatus[field.value]}
                          </div>
                        </div>
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent
                      position="popper"
                      align="end"
                      className="rounded-sm"
                    >
                      {(Object.keys(ideaStatus) as Array<keyof typeof ideaStatus>).map(
                        (key) => (
                          <SelectItem key={key} value={key}>
                            <div className="text-sm flex items-center gap-2">
                              {renderIconStatus(key, "h-3! w-3!")}
                              {ideaStatus[key]}
                            </div>
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError
                      className="text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </div>
        </div>

        <Controller
          name="output"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex min-h-0 flex-1 flex-col gap-1">
              <FieldLabel className="text-xs" htmlFor="content-output">
                Output
              </FieldLabel>
              <Textarea
                {...field}
                id="content-output"
                rows={8}
                placeholder="Generated content here..."
                className="min-h-[220px] flex-1 resize-none rounded-sm"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-xs"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
      </div>

      <FooterComponent className="mx-0! my-0!">
        <div className="flex w-full items-center justify-end gap-3">
          <Button
            className={`${isSubmitting ? "bg-muted-foreground cursor-not-allowed" : ""} transition-all ease-in-out duration-300 rounded-sm`}
            size="lg"
            variant="outline"
            disabled={isSubmitting}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            className={`${isSubmitting ? "bg-muted-foreground cursor-not-allowed" : "hover:opacity-100 focus:opacity-100 opacity-80"} rounded-sm`}
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            <Save />
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </FooterComponent>
    </form>
  )
}
