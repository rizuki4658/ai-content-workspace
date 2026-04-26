import type { ContentFilter, ContentItem, ContentStatus, ContentType } from "@/lib/types/content"
import {
  getStoredContents,
  getPaginatedContents,
  saveStoredContents,
  upsertContentItem,
  removeContentItem,
  GetContentResponse
} from "@/lib/storage/content"
import { toast } from "sonner"
import { getExcerpt } from "@/components/contents/contents-helper"

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getContents(params: ContentFilter = {}): Promise<GetContentResponse> {

  try {
    const page = params.page || 1
    const limit = params.limit || 1
    const query = params.search || ''
    const type = params.type || ''
    const status = params.status || ''
    const sortBy = params.by || ''

    const response = limit || query || type || status || sortBy ? getPaginatedContents({
      query,
      page,
      limit,
      type,
      status,
      sortBy
    }) : getStoredContents()

    await wait(1500)

    return response
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

export async function setFavorite(id: string, item: ContentItem) {
  try {
    await wait(500)
    upsertContentItem(id, item)
    
    const actionLabel = item.favorite ? 'added to favorites' : 'removed from favorites'
    
    return toast.success(`"${getExcerpt(item.title, 40)}" ${actionLabel}`, {
      position: 'top-center',
      duration: 1000
    })
  } catch (error) {
    return toast.error("Something went wrong. Please try again.", { 
      position: 'top-center' 
    })
  }
}

export async function setStatus(id: string, item: ContentItem) {
  try {
    await wait(500)
    upsertContentItem(id, item)
    
    const statusLabel = item.status.charAt(0).toUpperCase() + item.status.slice(1)
    const shortTitle = getExcerpt(item.title, 30)
    
    return toast.success(`"${shortTitle}" moved to ${statusLabel}`, {
      position: 'top-center',
      duration: 2000
    })
  } catch (error) {
    return toast.error("Something went wrong. Please try again.", { 
      position: 'top-center' 
    })
  }
}

export async function editContent(id: string, item: ContentItem) {
  try {
    await wait(500)
    upsertContentItem(id, item)
    
    return toast.success(`"${getExcerpt(item.title, 40)}" was updated!`, {
      position: 'top-center',
      duration: 1000
    })
  } catch (error) {
    return toast.error("Something went wrong. Please try again.", { 
      position: 'top-center' 
    })
  }
}

export async function deleteContent(id: ContentItem["id"], item: ContentItem) {
  try {
    await wait(500)
    removeContentItem(id)
    
    return toast.success(`"${getExcerpt(item.title, 40)}" was removed!`, {
      position: 'top-center',
      duration: 2000
    })
  } catch (error) {
    return toast.error("Something went wrong. Please try again.", { 
      position: 'top-center' 
    })
  }
}
