import type { ContentItem } from "@/lib/types/content"

const CONTENTS_STORAGE_KEY = "ai-content-workspace-contents"

export interface GetContentResponse {
  data: ContentItem[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
}

export function getStoredContents(): GetContentResponse {
  if (typeof window === "undefined") return { data: [], meta: undefined }

  const raw = window.localStorage.getItem(CONTENTS_STORAGE_KEY)
  if (!raw) return { data: [], meta: undefined } 

  try {
    const parsedData = JSON.parse(raw) as ContentItem[]
    return {
      data: parsedData || [],
      meta: undefined
    }
  } catch {
    return { data: [], meta: undefined }
  }
}

export function getPaginatedContents(page = 1, limit = 10): GetContentResponse {
  const allContents = getStoredContents()
  
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  
  const paginatedData = allContents.data.slice(startIndex, endIndex)
  
  return paginatedData.length ? {
    data: paginatedData,
    meta: {
      total: allContents.data.length,
      page,
      limit,
      totalPages: Math.ceil(allContents.data.length / limit),
      hasNextPage: endIndex < allContents.data.length,
      hasPrevPage: page > 1
    }
  } : {
    data: [],
    meta: undefined
  }
}

export function saveStoredContents(contents: ContentItem[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(CONTENTS_STORAGE_KEY, JSON.stringify(contents))
}

export function upsertContentItem(item: ContentItem) {
  // const contents = getStoredContents()
  // const index = contents.findIndex((content) => content.id === item.id)

  // if (index >= 0) {
  //   contents[index] = item
  // } else {
  //   contents.unshift(item)
  // }

  // saveStoredContents(contents)
}

export function removeContentItem(id: string) {
  // const contents = getStoredContents().filter((item) => item.id !== id)
  // saveStoredContents(contents)
}
