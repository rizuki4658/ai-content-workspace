"use client"

import { toast } from "sonner"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { generateContentFormSchema, type GenerateContentFormValues } from "@/lib/validations/contents"
import { generateContent } from "@/lib/server/generate"
import { useGenerateContent } from "@/contexts/generate-context"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
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
import { Globe, RefreshCcw } from "lucide-react"

const defaultValues: GenerateContentFormValues = {
  type: "blog_idea",
  title: "",
  prompt: "",
  tone: "professional",
  targetAudience: "",
  keywords: ""
}

export default function GenerateFormCard() {
  const { setContent } = useGenerateContent()
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<GenerateContentFormValues>({
    resolver: zodResolver(generateContentFormSchema),
    defaultValues,
    mode: "onSubmit"
  })

  const onSubmit = async (values: GenerateContentFormValues) => {
    try {
      const result = await generateContent(values)

      toast.success(`“${result.title}” is ready.`, {
        duration: 1000,
        position: "top-center"
      })

      setContent(result)
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to generate content.",
        {
          duration: 1000,
          position: "top-center",
        }
      )
      setContent(null)
    }
  }

  const onClear = () => {
    reset(defaultValues)
    setContent(null)
    toast.info("Form has been cleared.", { position: "top-center", duration: 1000 })
  }

  return (
    <Card className="rounded-sm">
      <CardHeader className="mb-4">
        <CardTitle>Generate Content</CardTitle>
        <CardDescription className="text-xs">
          Fill in the details below to generate AI-powered content.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-3"
          onSubmit={handleSubmit(onSubmit)}>
          {/* Content Type */}
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel className="text-xs" htmlFor="content-type">Content Type</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}>
                  <SelectTrigger
                    id="content-type"
                    className="w-full max-w-64 rounded-sm"
                    aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="rounded-sm">
                    <SelectItem value="blog_idea">Blog Idea</SelectItem>
                    <SelectItem value="caption">Caption</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="product_description">Product Description</SelectItem>
                    <SelectItem value="social_media">Social Media</SelectItem>
                  </SelectContent>
                </Select>
                { fieldState.invalid && <FieldError className="text-xs" errors={[fieldState.error]} /> }
              </Field>
            )}
          />

          {/* Title */}
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-1" data-invalid={fieldState.invalid}>
                <FieldLabel className="text-xs" htmlFor="content-title">Content Title</FieldLabel>
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

          {/* Prompt */}
          <Controller
            name="prompt"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel className="text-xs" htmlFor="prompt">Prompt</FieldLabel>
                <Textarea
                  { ...field }
                  id="prompt"
                  rows={8}
                  placeholder="Describe what you want to generate. Include audience, tone, and key points..."
                  className="rounded-sm"
                  aria-invalid={fieldState.invalid}
                />
                { fieldState.invalid && <FieldError className="text-xs" errors={[fieldState.error]} /> }
              </Field>
            )}
          />

          {/* Tone + Audience */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="tone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel className="text-xs" htmlFor="tone">Tone</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}>
                    <SelectTrigger
                      id="tone"
                      className="w-full rounded-sm"
                      aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="rounded-sm">
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="persuasive">Persuasive</SelectItem>
                    </SelectContent>
                  </Select>
                  { fieldState.invalid && <FieldError className="text-xs" errors={[fieldState.error]} /> }
                </Field>
              )}
            />

            <Controller
              name="targetAudience"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel className="text-xs" htmlFor="audience">Audience</FieldLabel>
                  <Input
                    { ...field }
                    id="audience"
                    placeholder="e.g. startup founders"
                    className="rounded-sm"
                    aria-invalid={fieldState.invalid}
                  />
                  { fieldState.invalid && <FieldError className="text-xs" errors={[fieldState.error]} /> }
                </Field>
              )}
            />
          </div>

          {/* Keywords */}
          <Controller
            name="keywords"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel className="text-xs" htmlFor="keywords">Keywords (Optional)</FieldLabel>
                <Input
                  { ...field }
                  id="keywords"
                  placeholder="e.g. AI, growth, automation"
                  className="rounded-sm"
                  aria-invalid={fieldState.invalid}
                />
                { fieldState.invalid && <FieldError className="text-xs" errors={[fieldState.error]} /> }
              </Field>
            )}
          />

          {/* Actions */}
          <div className="flex w-full items-center gap-3 pt-2">
            <Button
              className={`flex-1 ${isSubmitting ? "bg-muted-foreground cursor-not-allowed" : "hover:opacity-100 focus:opacity-100 opacity-80"} rounded-sm`}
              size="lg"
              type="submit"
              disabled={isSubmitting}>
              <Globe />
              Generate Content
            </Button>
            <Button
              className={`${isSubmitting ? "bg-muted-foreground cursor-not-allowed" : "bg-destructive/50 hover:bg-destructive"} transition-all ease-in-out duration-300 rounded-sm`}
              size="icon-lg"
              type="button"
              disabled={isSubmitting}
              onClick={onClear}>
              <RefreshCcw />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
