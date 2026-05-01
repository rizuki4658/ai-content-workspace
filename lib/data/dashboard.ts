import type {
  DashboardQuickAction,
  DashboardSuggestedPrompt
} from "@/lib/types/dashboard"

export const quickActions: DashboardQuickAction[] = [
  {
    id: "1",
    title: "Generate Blog",
    description: "Create a long-form blog draft with AI assistance.",
    cta: "Start writing",
    icon: "blog",
    tone: 'persuasive',
    type: 'blog_idea',
    tags: '#blog #wordpress #writing #beginner',
    audience: 'books addict and read addict'
  },
  {
    id: "2",
    title: "Social Caption",
    description: "Generate a short caption for your next campaign.",
    cta: "Generate caption",
    icon: "social",
    tone: 'friendly',
    type: 'social_media',
    tags: '#reels #shorts #fyp #tiktok',
    audience: 'teenager genz genalfa'
  },
  {
    id: "3",
    title: "Email Draft",
    description: "Draft a welcome or promotional email in seconds.",
    cta: "Create email",
    icon: "email",
    tone: 'professional',
    type: 'email',
    tags: '#email #gmail #welcome #beginner',
    audience: 'corporate'
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
