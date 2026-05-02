import { toast } from "sonner"
import { Preference } from "@/lib/types/settings"
import { ContentItem } from "@/lib/types/content"

const STORAGE_KEY = process.env.PREFERENCE_STORAGE_KEY || 'ai-content-workspace-preference'
const STORAGE_KEY_CONTENTS = process.env.CONTENTS_STORAGE_KEY || 'ai-content-workspace-contents'

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

function getStoredPreferences() {
  if (typeof window === "undefined") return null

  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function setStoredPreference(preference: Preference) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preference))
}

export async function getPreference(): Promise<Preference> {
  await wait(500)

  const response = getStoredPreferences()
  return response
}

export async function setPreference(
  payload: Preference
): Promise<Preference> {
  try {
    await wait(300)
  
    const newPreference: Preference = payload
  
    setStoredPreference(newPreference)

    toast.success('New Preference has been saved', { position: 'top-center' })

    return newPreference
  } catch (error) {
    toast.error('New Preference failed to save', { position: 'top-center' })

    return payload
  }
}

export async function deleteAllContent() {
  try {
    localStorage.setItem(STORAGE_KEY_CONTENTS, JSON.stringify([]))
    await wait(1500)

    toast.success('All content has beed deleted!', { position: 'top-center' })
  } catch (error) {
    toast.error('Something went wrong', { position: 'top-center' }) 
  }
}

export async function importContent(data: ContentItem[]) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONTENTS)

    if (!raw) return []
    await wait(1500)

    try {
      const parsed = JSON.parse(raw)
      localStorage.setItem(STORAGE_KEY_CONTENTS, JSON.stringify([...parsed, ...data]))
    } catch {
      toast.error('Import has been failed!', { position: 'top-center' })
    }

    toast.success('All content has beed imported!', { position: 'top-center' })
  } catch (error) {
    toast.error('Something went wrong', { position: 'top-center' }) 
  }
}