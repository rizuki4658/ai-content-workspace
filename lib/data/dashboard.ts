import type {
  DashboardHero,
  DashboardStat,
  DashboardRecentContentItem,
  DashboardRecentActivity,
  DashboardQuickAction,
  DashboardSuggestedPrompt,
  DashboardContentDistribution
} from "@/lib/types/dashboard"

export const dashboardOverview: DashboardHero = {
  title: "AI Content Workspace",
  description:
    "You've generated 24 contents today. AI suggestions are helping improve your publishing consistency and engagement.",

  highlights: [
    {
      key: 'engagement',
      label: "Best Performing",
      value: "Instagram Launch Caption",
      meta: "+32% engagement",
    },
    {
      key: 'draft',
      label: "Latest Generated",
      value: "AI Startup Blog Ideas",
      meta: "Draft • 5 min ago",
    },
  ],
}

export const dashboardStats: DashboardStat[] = [
  {
    id: "generated",
    title: "Generated Today",
    value: 24,
    trend: "+8 vs yesterday",
    trendType: "positive",
    icon: "file",

    details: [
      { label: "Peak time", value: "14:00" },
      { label: "Top type", value: "Blog" },
    ],

    note:
      "Most of today’s generated content came from blog and social caption requests.",
  },
  {
    id: "drafts",
    title: "Drafts",
    value: 12,
    trend: "5 need review",
    trendType: "negative",
    icon: "draft",

    details: [
      { label: "Ready to publish", value: "2" },
      { label: "Needs editing", value: "3" },
    ],

    note:
      "A few draft items are waiting for final review before they can be published.",
  },
]

export const recentContents: DashboardRecentContentItem[] = [
  {
    id: "1",
    title: "AI Startup Blog Ideas",
    type: "blog_idea",
    status: "draft",
    createdAt: "5 min ago",
  },
  {
    id: "2",
    title: "Instagram Launch Caption",
    type: "social_media",
    status: "published",
    createdAt: "2h ago",
  },
  {
    id: "3",
    title: "Welcome Email Campaign",
    type: "email",
    status: "draft",
    createdAt: "Yesterday",
  },
]

export const recentActivities: DashboardRecentActivity[] = [
  {
    key: 'generated',
    title: "Content Generated",
    message: "AI Startup Blog Ideas has been generated successfully.",
    time: "5 min ago",
  },
  {
    key: 'published',
    title: "Content Published",
    message: "Instagram Launch Caption is now live.",
    time: "2h ago",
  },
  {
    key: 'suggest',
    title: "Suggestion",
    message: "Try generating content about AI tools for solopreneurs.",
    time: "Yesterday",
  },
]

export const quickActions: DashboardQuickAction[] = [
  {
    id: "1",
    title: "Generate Blog",
    description: "Create a long-form blog draft with AI assistance.",
    cta: "Start writing",
    icon: "blog",
  },
  {
    id: "2",
    title: "Social Caption",
    description: "Generate a short caption for your next campaign.",
    cta: "Generate caption",
    icon: "social",
  },
  {
    id: "3",
    title: "Email Draft",
    description: "Draft a welcome or promotional email in seconds.",
    cta: "Create email",
    icon: "email",
  },
]

export const suggestedPrompts: DashboardSuggestedPrompt[] = [
  {
    id: "1",
    title: "Top 5 AI tools for startups in 2026",
    description:
      "A practical article idea focused on productivity and business growth.",
    tag: "Blog Idea",
  },
  {
    id: "2",
    title: "Launch day caption for a new digital product",
    description:
      "A concise social caption with confident and engaging tone.",
    tag: "Social",
  },
  {
    id: "3",
    title: "Welcome email for new subscribers",
    description:
      "A clean and friendly onboarding email for your newsletter audience.",
    tag: "Email",
  },
]

export const contentDistribution: DashboardContentDistribution[] = [
  { name: "Blog", value: 55, fill: "#6366f1" },
  { name: "Social", value: 25, fill: "#8b5cf6" },
  { name: "Email", value: 10, fill: "#ec4899" },
  { name: "Ads", value: 10, fill: "#f43f5e" }
]