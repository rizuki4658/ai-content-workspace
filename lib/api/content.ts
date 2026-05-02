import type { ContentFilter, ContentItem, ContentStatus, ContentType } from "@/lib/types/content"
import { db } from "@/lib/db"
import { GetContentResponse } from "@/lib/storage/content"
import { toast } from "sonner"
import { getExcerpt } from "@/components/contents/contents-helper"

export async function getContents(params: ContentFilter = {}): Promise<GetContentResponse> {
  try {
    const page = params.page || 1
    const limit = params.limit || 10
    const query = params.search || undefined
    const type = params.type && params.type !== 'all' ? params.type : undefined
    const status = params.status && params.status !== 'all' ? params.status : undefined
    const sortBy = params.by && params.by !== 'all' ? params.by : undefined
    const offset = (page - 1) * limit

    let collection = db.contents.toCollection()

    if (query || type || status) {
      collection = db.contents.filter((item) => {
        const matchesSearch = query 
          ? item.title.toLowerCase().includes(query.toLowerCase()) 
          : true;
        const matchesType = type ? item.type === type : true
        const matchesStatus = status ? item.status === status : true
        
        return matchesSearch && matchesType && matchesStatus
      })
    }
    const totalCount = await collection.count()

    let finalData;
    if (sortBy === 'oldest') {
      finalData = await collection.sortBy('createdAt')
    } else if (sortBy === 'title') {
      finalData = await collection.sortBy('title')
    } else if (sortBy === 'recently_updated') {
      finalData = await collection.sortBy('updatedAt')
    } else {
      finalData = await collection.reverse().sortBy('createdAt')
    }
    const paginatedData = finalData.slice(offset, offset + limit)
    const totalPages = Math.ceil(totalCount / limit)

    return {
      data: paginatedData,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages
      }
    }
  } catch (error) {
    return { data: [] }
  }
}

export async function getAllContents(): Promise<ContentItem[] | undefined> {
  try {
    const result = await db.contents
      .reverse()
      .sortBy('createdAt')

    return result
  } catch (error) {
    return undefined
  }
}

export async function getContentById(id?: ContentItem["id"]): Promise<ContentItem | undefined> {
  try {
    if (!id) return undefined;

    const result = await db.contents.get(id)

    return result
  } catch (error) {
    return undefined
  }
}

export async function saveContent({
  items,
  status
}: { items: ContentItem[]; status: ContentStatus; }) {
  try {

    await db.contents.bulkPut(items)
    
    const message = status === 'draft' 
      ? `Content saved as draft for further editing.` 
      : `Content finalized and ready for use.`;

    return toast.success(message, {
      position: 'top-center'
    })

  } catch (error) {
    return toast.error(`Unable to save content. Please try again!`, { 
      position: 'top-center' 
    })
  }
}

export async function setFavorite(id: string | number, item: ContentItem) {
  try {
    await db.contents.update(id, { favorite: item.favorite })
    
    const actionLabel = item.favorite ? 'added to favorites' : 'removed from favorites'
    
    return toast.success(`"${getExcerpt(item.title, 40)}" ${actionLabel}`, {
      position: 'top-center',
      duration: 1000
    })
  } catch (error) {
    return toast.error("Something went wrong.", { position: 'top-center' })
  }
}

export async function setStatus(id: string | number, item: ContentItem) {
  try {
    await db.contents.update(id, { status: item.status })
    
    const statusLabel = item.status.charAt(0).toUpperCase() + item.status.slice(1)
    
    return toast.success(`Moved to ${statusLabel}`, {
      position: 'top-center',
      duration: 2000
    });
  } catch (error) {
    return toast.error("Something went wrong.", { position: 'top-center' })
  }
}

export async function editContent(id: string | number, item: ContentItem) {
  try {
    await db.contents.update(id, item)

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

export async function deleteContent(id: string | number) {
  try {
    await db.contents.delete(id)
    
    return toast.success(`Content was removed!`, {
      position: 'top-center',
      duration: 2000
    });
  } catch (error) {
    return toast.error("Unable to delete item.", { position: 'top-center' })
  }
}
