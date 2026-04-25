import { z } from "zod"

export const contentTypeSchema = z.enum([
  "blog_idea",
  "caption",
  "email",
  "product_description",
  "social_media",
])

export const contentToneSchema = z.enum([
  "professional",
  "casual",
  "friendly",
  "persuasive",
  "bold",
])


export const contentStatusSchema = z.enum([
  "draft",
  "ready",
  "published",
  "archived"
])

export const generateContentFormSchema = z.object({
  type: contentTypeSchema,
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title must be less than 100 characters."),
  prompt: z
    .string()
    .trim()
    .min(10, "Prompt must be at least 10 characters.")
    .max(2000, "Prompt must be less than 2000 characters."),
  tone: contentToneSchema.optional(),
  targetAudience: z
    .string()
    .trim()
    .max(100, "Target audience must be less than 100 characters.")
    .optional()
    .or(z.literal("")),
  keywords: z
    .string()
    .trim()
    .max(100, "Keywords must be less than 200 characters.")
    .optional()
    .or(z.literal("")),
})

export const contentsEditFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title must be less than 100 characters."),
  output: z
    .string()
    .trim()
    .min(100, "Content must be at least 100 characters."),
  status: contentStatusSchema
})

export const contentsDeleteFormSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "ID is required")
})


export const contentsStatusFormSchema = z.object({
  status: contentStatusSchema
})

export type GenerateContentFormValues = z.infer<
  typeof generateContentFormSchema
>

export type ContentsEditFormValues = z.infer<
  typeof contentsEditFormSchema
>

export type ContentsStatusFormValues = z.infer<
  typeof contentsStatusFormSchema
>

export type ContentsDeleteFormValues = z.infer<
  typeof contentsDeleteFormSchema
>
