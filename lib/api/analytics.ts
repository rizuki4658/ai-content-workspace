import { db } from "@/lib/db"
import { GetAnalyticsResponse } from "@/lib/types/analytics"

export async function getAnalytics(): Promise<GetAnalyticsResponse> {
  try {
    // 1. Ambil semua data dari Dexie
    const contents = await db.contents.toArray()
    const total = contents.length || 0

    // 2. Kalkulasi Stats (Status)
    const draft = contents.filter(item => item.status === 'draft').length
    const ready = contents.filter(item => item.status === 'ready').length
    const published = contents.filter(item => item.status === 'published').length

    // 3. Kalkulasi Distribution (Type)
    const safePercent = (count: number) => total ? Number(((count / total) * 100).toFixed(2)) : 0
    
    const distribution = {
      blog_idea: safePercent(contents.filter(item => item.type === 'blog_idea').length),
      caption: safePercent(contents.filter(item => item.type === 'caption').length),
      email: safePercent(contents.filter(item => item.type === 'email').length),
      product_description: safePercent(contents.filter(item => item.type === 'product_description').length),
      social_media: safePercent(contents.filter(item => item.type === 'social_media').length),
      total
    }

    // 4. Sorting untuk Recents & Insights
    const sorted = [...contents].sort((a, b) => 
      new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
    )

    // 5. Helper functions untuk Analytics
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
    const latest = sorted[0] || null
    const topTone = getMax(tones)
    const topType = getMax(types)

    // 6. Return response tanpa wait
    return {
      stats: {
        total,
        draft,
        ready,
        published
      },
      distribution,
      summary: {
        recents: sorted.slice(0, 5),
        insights: [
          {
            label: 'Most used type',
            description: topType ? `${topType.value} items` : '-',
            type: topType?.name,
          }, 
          {
            label: 'Most used tone',
            description: topTone ? `${topTone.value} items` : '-',
            type: topTone?.name,
          }, 
          latest && {
            label: 'Latest content',
            description: latest.title,
            type: latest.prompt,
          }
        ].filter(Boolean) as any[]
      }
    }
  } catch (error) {
    console.error("Analytics Error:", error)
    return {
      stats: { total: 0, draft: 0, ready: 0, published: 0 },
      distribution: { blog_idea: 0, caption: 0, email: 0, product_description: 0, social_media: 0, total: 0 },
      summary: { recents: [], insights: [] }
    }
  }
}
