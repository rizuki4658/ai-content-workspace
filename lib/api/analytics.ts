
import {
  getStoredContents,
  GetContentResponse
} from "@/lib/storage/content"
import { toast } from "sonner"

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export interface GetAnalyticsResponse {
  stats?: {
    total?: number;
    draft?: number;
    ready?: number;
    published?: number;
  },
  distribution?: {
    blog_idea?: number;
    caption?: number;
    email?: number;
    product_description?: number;
    social_media?: number;
    total?: number;
  },
  summary?: {
    recents?: any[];
    insights?: any[];
  }
}

export async function getAnalytics(): Promise<GetAnalyticsResponse> {
  try {
    const response = getStoredContents()
    const total = response?.data.length || 0
    const draft = response?.data.filter(item => item.status === 'draft')?.length || 0
    const ready = response?.data.filter(item => item.status === 'ready')?.length || 0
    const published = response?.data.filter(item => item.status === 'published')?.length || 0
    const safePercent = (count: number) => total ? Number(((count / total) * 100).toFixed(2)) : 0

    const blog = safePercent(response?.data.filter(item => item.type === 'blog_idea')?.length)
    const caption = safePercent(response?.data.filter(item => item.type === 'caption')?.length)
    const email = safePercent(response?.data.filter(item => item.type === 'email')?.length)
    const product = safePercent(response?.data.filter(item => item.type === 'product_description')?.length)
    const socialMedia = safePercent(response?.data.filter(item => item.type === 'social_media')?.length)

    const sorted = response?.data?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    const countBy = (data: any[], key: "type" | "tone") => {
      const map: Record<string, number> = {}

      data.forEach((item) => {
        const value = item[key]
        if (!value) return

        map[value] = (map[value] || 0) + 1
      })

      return map
    }
    const getMax = (obj: Record<string, number>) => {
      const entries = Object.entries(obj)

      if (!entries.length) return null

      const [name, value] = entries.sort((a, b) => b[1] - a[1])[0]

      return { name, value }
    }
    const tones = countBy(sorted, 'tone')
    const types = countBy(sorted, 'type')
    const latest = sorted?.[0] || null
    const topTone = getMax(tones)
    const topType = getMax(types)

    await wait(1500)

    return {
      stats: {
        total,
        draft,
        ready,
        published
      },
      distribution: {
        blog_idea: blog,
        caption: caption,
        email: email,
        product_description: product,
        social_media: socialMedia,
        total
      },
      summary: {
        recents: sorted.slice(0, 5),
        insights: [{
          label: 'Most used type',
          description: '-',
          type: topType?.name,
        }, {
          label: 'Most used tone',
          description: '-',
          type: topTone?.name,
        }, latest && {
          label: 'Lates content',
          description: latest?.title,
          type: latest?.prompt,
        }]
      }
    }
  } catch (error) {
    toast.error(`Unable to save content. Please try again.!`, { position: 'top-center' })
    return {
      stats: {
        total: 0,
        draft: 0,
        ready: 0,
        published: 0
      },
      distribution: {
        blog_idea: 0,
        caption: 0,
        email: 0,
        product_description: 0,
        social_media: 0,
        total: 0
      },
      summary: {
        recents: [],
        insights: []
      }
    }
  }
}