import { SettingPrefrenceFormSchema } from "@/lib/validations/settings"
import { ContentTone, ContentType } from "./content"

export type Preference = {
  id: string
  type: ContentType
  tone: ContentTone
  theme: SettingPrefrenceFormSchema['theme']
  updatedAt?: string
}
