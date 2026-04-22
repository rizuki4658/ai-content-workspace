import type { ContentItem, ContentStatus } from "@/lib/types/content"
import {
  getStoredContents,
  getPaginatedContents,
  saveStoredContents,
  upsertContentItem,
  removeContentItem,
  GetContentResponse
} from "@/lib/storage/content"
import { toast } from "sonner"

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getContents(params: { search?: string; limit?: number; page?: number; } = {}): Promise<GetContentResponse> {
  const queryUrl = new URLSearchParams()
  if (params.search) {
    queryUrl.append("search", params.search)
  }

  try {
    const page = parseInt(queryUrl.get("page") || "1")
    const limit = parseInt(queryUrl.get("limit") || "10")
    const query = queryUrl.get('search')

    const response = limit || query ? getPaginatedContents(page, limit) : getStoredContents()

    const result = response
    result.data = query ? response.data.filter(item => item.title.toLowerCase().includes(query?.toLowerCase())) : response.data

    await wait(1500)

    return result
  } catch (error) {
    return { data: [] }
  }
}

export async function saveContent({
  items,
  status
}: { items: ContentItem[]; status: ContentStatus; }) {
  try {
    await wait(800)
    saveStoredContents(items)
    return toast.success(status === 'draft' ? `Content saved as draft for further editing.` : `Content finalized and ready for use.`, {
      position: 'top-center'
    })
  } catch (error) {
    return toast.error(`Unable to save content. Please try again.!`, { position: 'top-center' })
  }
}
