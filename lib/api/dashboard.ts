import { db } from "@/lib/db"

import { ContentItem } from "@/lib/types/content";
import type { DashboardStatsResponse, DashboardSummaryResponse } from "@/lib/types/dashboard";
import { ideaTypes, promptSuggestions } from "@/lib/data/generate";
import { quickActions } from "@/lib/data/dashboard";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchDashboardStats(): Promise<DashboardStatsResponse> {
  try {
    // 1. Ambil semua data dari Dexie secara async
    const contents = await db.contents.toArray();

    // 2. Sortir untuk mencari data terbaru (descending)
    const sortedContents = [...contents].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // 3. Helper function buat hitung jumlah berdasarkan key (tetap sama logikanya)
    const countBy = (
      data: typeof contents,
      key: "status" | "type"
    ): Record<string, number> => {
      return data.reduce<Record<string, number>>((acc, item) => {
        const value = item[key];
        if (!value) return acc;
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      }, {});
    };

    const statusCounts = countBy(contents, "status");
    const typeCounts = countBy(contents, "type");

    const totalDraft = statusCounts.draft || 0;
    const totalReady = statusCounts.ready || 0;

    // Cari tipe yang paling sering muncul
    const topTypeEntry = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0];
    const topType = topTypeEntry ? topTypeEntry[0] : "-";
    const topTypeLabel = ideaTypes[topType as keyof typeof ideaTypes] || topType;

    const latestContent = sortedContents[0];
    const latestPublishedContent = sortedContents.find(
      (item) => item.status === "published"
    );

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
          trend: "+8 vs yesterday", // Ini bisa lo bikin dinamis nanti
          trendType: "positive",
          icon: "file",
          details: [
            { label: "Peak time", value: "14:00" },
            { label: "Top type", value: topTypeLabel },
          ],
          note: `Most of today’s generated content came from ${topTypeLabel} requests.`,
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
          note: "A few draft items are waiting for final review before they can be published.",
        },
      ],
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats from IndexedDB:", error);
    return {
      total: 0,
      content: undefined,
      content_published: undefined,
      counts: { status: {}, types: {} },
      stats: [],
    };
  }
}

export async function fetchContentDistribution(): Promise<DashboardSummaryResponse> {
  try {
    const contents = await db.contents.toArray()
    const total = contents.length || 0
    
    const safePercent = (count: number) => total ? Number(((count / total) * 100).toFixed(2)) : 0

    const blog = safePercent(contents.filter(item => item.type === 'blog_idea').length)
    const caption = safePercent(contents.filter(item => item.type === 'caption').length)
    const email = safePercent(contents.filter(item => item.type === 'email').length)
    const product = safePercent(contents.filter(item => item.type === 'product_description').length)
    const socialMedia = safePercent(contents.filter(item => item.type === 'social_media').length)

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
    const result = await db.contents
      .reverse()
      .limit(3)
      .toArray()

    return result
  } catch (error) {
    console.error("Fetch Recent Contents Error:", error)
    return []
  }
}

export async function fetchRecentActivities() {
  try {
    const result = await db.contents
      .orderBy('updatedAt') 
      .reverse()
      .limit(3)
      .toArray()

    return result
  } catch (error) {
    console.error("Fetch Recent Activities Error:", error)
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
