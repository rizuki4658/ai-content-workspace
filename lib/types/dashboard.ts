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

export type DashboardStats = {
  id: string;
  title: string;
  value: number;
  trend: string;
  trendType: string;
  icon: string;
  details: {
      label: string;
      value: string;
  }[];
  note: string;
}

export type DashboardRecentContents = {
  id: string;
  title: string;
  type: string;
  status: string;
  createdAt: string;
}

export type DashboardRecentActivities = {
  key: string;
  title: string;
  message: string;
  time: string;
}

export type DashboardQuickActions = {
  id: string;
  title: string;
  description: string;
  cta: string;
  icon: string;
}

export type DashboardSuggestedPrompts = {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export type DashboardContentDistribution = {
  name: string;
  value: number;
  fill: string;
}
