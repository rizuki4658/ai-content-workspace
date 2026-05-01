import type { ContentItem, ContentStatus, ContentType } from "./content"

export type TrendType = "positive" | "negative" | "neutral"

export type DashboardHeroHighlight = {
  key: string;
  label: string;
  value: string;
  meta: string;
}

export type DashboardHero = {
  title: string;
  description: string;
  highlights: DashboardHeroHighlight[];
}

export type DashboardStatDetail = {
  label: string;
  value: string;
}

export type DashboardStat = {
  id: string;
  title: string;
  value: number;
  trend: string;
  trendType: TrendType;
  icon: string;
  details: DashboardStatDetail[];
  note: string;
}

export type DashboardRecentContentItem = {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  createdAt: string;
};

export type DashboardRecentActivity = {
  key: string;
  title: string;
  message: string;
  time: string;
}

export type DashboardQuickAction = {
  id: string;
  title: string;
  description: string;
  cta: string;
  icon: string;
}

export type DashboardSuggestedPrompt = {
  id: string;
  title: string;
  description: string;
  tag: string;
};

export type DashboardContentDistribution = {
  name: string;
  value: number;
  fill: string;
}

export type DashboardOverviewData = {
  hero: DashboardHero;
  stats: DashboardStat[];
  recentContents: DashboardRecentContentItem[];
  recentActivities: DashboardRecentActivity[];
  quickActions: DashboardQuickAction[];
  suggestedPrompts: DashboardSuggestedPrompt[];
  contentDistribution: DashboardContentDistribution[];
}

export interface DashboardStatsResponse {
  total: number;
  content_published?: ContentItem;
  content?: ContentItem;
  counts?: {
      status?: Record<string, number>;
      types?: Record<string, number>;
  };
  stats?: DashboardStat[]
}

export interface DashboardSummaryResponse {
  blog_idea?: number;
  caption?: number;
  email?: number;
  product_description?: number;
  social_media?: number;
  total?: number;
}
