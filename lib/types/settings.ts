import { SettingPrefrenceFormSchema } from "../validations/settings"
import { ContentTone, ContentType } from "./content"

export type Preference = {
  type: ContentType
  tone: ContentTone
  theme: SettingPrefrenceFormSchema['theme']
}
