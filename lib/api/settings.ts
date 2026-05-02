import { toast } from "sonner"
import { Preference } from "../types/settings"

const STORAGE_KEY = process.env.PREFERENCE_STORAGE_KEY || 'ai-content-workspace-preference'

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
