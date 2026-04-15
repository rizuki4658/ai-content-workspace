import type { ContentStatus, ContentType } from "./content"

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