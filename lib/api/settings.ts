import { db } from "@/lib/db"
import { toast } from "sonner"
import { Preference } from "@/lib/types/settings"
import { ContentItem } from "@/lib/types/content"

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))


export async function getPreference(): Promise<Preference> {
  const DEFAULT_PREFERENCE: Preference = {
    id: "settings",
    type: "blog_idea",
    tone: "professional",
    theme: "system"
  };

  try {
    const result = await db.userPreference.toCollection().first()
    
    return result || DEFAULT_PREFERENCE
  } catch (error) {
    console.error("Failed to get preferences:", error)
    return DEFAULT_PREFERENCE
  }
}

export async function setPreference(
  payload: Preference
): Promise<Preference> {
  try {
    const dataToSave = {
      ...payload,
      id: 'settings',
      updatedAt: new Date().toISOString()
    };

    await db.userPreference.put(dataToSave)
    toast.success('Preference updated', { position: 'top-center' })
    return payload;
  } catch (error) {
    console.error("Failed to set preferences:", error);
    toast.error('Failed to save preference', { position: 'top-center' })
    return payload;
  }
}

export async function deleteAllContent() {
  try {
    await db.contents.clear()

    await wait(1000)

    toast.success('All content has been deleted!', { position: 'top-center' })
  } catch (error) {
    console.error("Delete all failed:", error);
    toast.error('Something went wrong while deleting', { position: 'top-center' })
  }
}

export async function importContent(data: ContentItem[]) {
  try {
    if (!data || data.length === 0) return

    await wait(1500)

    const dataToImport = data.map(({ id, ...rest }) => ({
      ...rest,
      userEmail: localStorage.getItem("currentUserEmail"), 
      updatedAt: new Date().toISOString()
    }))

    await db.contents.bulkAdd(dataToImport as ContentItem[])

    toast.success(`${data.length} items have been imported!`, { position: 'top-center' })
  } catch (error) {
    console.error("Import failed:", error);
    toast.error('Import has failed! Check your data format.', { position: 'top-center' })
  }
}
