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
