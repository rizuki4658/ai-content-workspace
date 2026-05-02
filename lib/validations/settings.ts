import { z } from "zod"

import { contentToneSchema, contentTypeSchema } from "./contents"


export const settingThemeSchema = z.enum([
  "system",
  "dark",
  "light"
])

export const settingPrefrenceFormSchema = z.object({
  type: contentTypeSchema,
  tone: contentToneSchema,
  theme: settingThemeSchema
})

export type SettingPrefrenceFormSchema = z.infer<
  typeof settingPrefrenceFormSchema
>