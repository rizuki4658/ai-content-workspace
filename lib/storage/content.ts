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

export function getPaginatedContents({
  query = '',
  page = 1,
  limit = 10,
  type = '',
  status = '',
  sortBy = ''
}): GetContentResponse {
  const allContents = getStoredContents()
  let filteredData = [...allContents.data]

  // Search by Title
  if (query) {
    filteredData = filteredData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Filter by Type
  if (type && type !== 'all') {
    filteredData = filteredData.filter(item => item.type === type)
  }

  // Filter by Status
  if (status && status !== 'all') {
    filteredData = filteredData.filter(item => item.status === status)
  }

  // SORTING
  if (sortBy && sortBy !== 'all') {
    filteredData.sort((a, b) => {
      switch (sortBy) {
        case 'all':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'recently_updated':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  
  const paginatedData = filteredData.slice(startIndex, endIndex)
  
  return paginatedData.length ? {
    data: paginatedData,
    meta: {
      total: filteredData.length,
      page,
      limit,
      totalPages: Math.ceil(filteredData.length / limit),
      hasNextPage: endIndex < filteredData.length,
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

export function upsertContentItem(id: string, item: ContentItem) {
  const contents = getStoredContents()
  const index = contents.data.findIndex((content) => content.id === id)

  if (index >= 0) {
    contents.data[index] = item
    saveStoredContents(contents.data)
  } else {
    throw Error("Something went wrong!")
  }
}

export function removeContentItem(id: string) {
  // const contents = getStoredContents().filter((item) => item.id !== id)
  // saveStoredContents(contents)
}
