import { getStoredContents } from "../storage/content"
import { ContentItem } from "@/lib/types/content";
import type { DashboardStatsResponse, DashboardSummaryResponse } from "@/lib/types/dashboard";
import { ideaTypes, promptSuggestions } from "@/lib/data/generate";
import { quickActions } from "@/lib/data/dashboard";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchDashboardStats(): Promise<DashboardStatsResponse> {
  try {
    await wait(800)

    const response = getStoredContents()
    const contents = response?.data ?? []

    const sortedContents = [...contents].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    const countBy = (
      data: typeof contents,
      key: "status" | "type"
    ): Record<string, number> => {
      return data.reduce<Record<string, number>>((acc, item) => {
        const value = item[key]

        if (!value) return acc

        acc[value] = (acc[value] || 0) + 1

        return acc
      }, {})
    }

    const statusCounts = countBy(contents, "status")
    const typeCounts = countBy(contents, "type")

    const totalDraft = statusCounts.draft || 0
    const totalReady = statusCounts.ready || 0

    const topType =
      Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-"

    const latestContent = sortedContents[0]
    const latestPublishedContent = sortedContents.find(
      (item) => item.status === "published"
    )

    return {
      total: contents.length,

      content: latestContent,
      content_published: latestPublishedContent,

      counts: {
        status: statusCounts,
        types: typeCounts,
      },

      stats: [
        {
          id: "generated",
          title: "generated",
          value: contents.length,
          trend: "+8 vs yesterday",
          trendType: "positive",
          icon: "file",
          details: [
            { label: "Peak time", value: "14:00" },
            { label: "Top type", value: ideaTypes[topType as keyof typeof ideaTypes] },
          ],
          note: `Most of today’s generated content came from ${ideaTypes[topType as keyof typeof ideaTypes]} requests.`,
        },
        {
          id: "drafts",
          title: "Drafts",
          value: totalDraft,
          trend: `${totalDraft} need review`,
          trendType: "negative",
          icon: "draft",
          details: [
            { label: "Ready to publish", value: `${totalReady}` },
            { label: "Needs editing", value: `${totalDraft}` },
          ],
          note:
            "A few draft items are waiting for final review before they can be published.",
        },
      ],
    }
  } catch (error) {
    return {
      total: 0,
      content: undefined,
      content_published: undefined,
      counts: undefined,
      stats: undefined,
    }
  }
}

export async function fetchContentDistribution(): Promise<DashboardSummaryResponse> {
  try {
    const response = getStoredContents()
    const total = response?.data.length || 0
    const safePercent = (count: number) => total ? Number(((count / total) * 100).toFixed(2)) : 0

    const blog = safePercent(response?.data.filter(item => item.type === 'blog_idea')?.length)
    const caption = safePercent(response?.data.filter(item => item.type === 'caption')?.length)
    const email = safePercent(response?.data.filter(item => item.type === 'email')?.length)
    const product = safePercent(response?.data.filter(item => item.type === 'product_description')?.length)
    const socialMedia = safePercent(response?.data.filter(item => item.type === 'social_media')?.length)

    await wait(800)

    return {
      blog_idea: blog,
      caption: caption,
      email: email,
      product_description: product,
      social_media: socialMedia,
      total
    }
  } catch (error) {
    return {
      blog_idea: 0,
      caption: 0,
      email: 0,
      product_description: 0,
      social_media: 0,
      total: 0
    }
  }
}

export async function fetchRecentContents(): Promise<ContentItem[]> {
  try {
    const response = getStoredContents()
    const contents = response?.data ?? []
  
    const sortedContents = [...contents].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    await wait(800)

    return sortedContents.slice(0, 3)
  } catch (error) {
    return []
  }
}

export async function fetchRecentActivities() {
  try {
    const response = getStoredContents()
    const contents = response?.data ?? []
  
    const sortedContents = [...contents].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.updatedAt).getTime()
    )
    await wait(800)

    return sortedContents.slice(0, 3)
  } catch (error) {
    return []
  }
}

export async function fetchQuickActions() {
  await wait(500)
  return quickActions
}

export async function fetchSuggestedPrompts() {
  try {
    await wait(500)
    return promptSuggestions?.slice(0, 3)
  } catch (error) {
    return []
  }
}
