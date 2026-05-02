import type { ContentType, ContentTone, ContentStatus, PromptSuggestionItem } from "@/lib/types/content"
import { SettingPrefrenceFormSchema } from "../validations/settings"

export const ideaTypes: Record<ContentType, string> = {
  "blog_idea": "Blog Idea",
  "caption": "Caption",
  "email": "Email",
  "product_description": "Product Description",
  "social_media": "Social Media"
}

export const ideaTones: Record<ContentTone, string> = {
  "bold": "Bold",
  "casual": "Casual",
  "friendly": "Friendly",
  "persuasive": "Persuasive",
  "professional": "Professional"
}

export const ideaStatus: Record<ContentStatus, string> = {
  "draft": "Draft",
  "ready": "Ready",
  "published": "Published",
  "archived": "Archived"
}

export const ideaThemes: Record<SettingPrefrenceFormSchema['theme'], string> = {
  "system": "System",
  "dark": "Dark",
  "light": "Light",
}

export const promptSuggestions: PromptSuggestionItem[] = [
  {
    id: "1",
    label: "Startup AI Blog",
    prompt: "Write a blog post about AI tools for startup founders",
    type: "blog_idea",
    tone: "friendly"
  },
  {
    id: "2",
    label: "Product Launch Caption",
    prompt: "Create an engaging Instagram caption for a product launch",
    type: "caption",
    tone: "persuasive",
  },
  {
    id: "3",
    label: "Welcome Email",
    prompt: "Draft a welcome email for new users after signup",
    type: "email",
    tone: "professional"
  },
  {
    id: "4",
    label: "Product Description",
    prompt: "Write a compelling product description for an ecommerce gadget highlighting its key features and benefits",
    type: "product_description",
  },
  {
    id: "5",
    label: "Social Media Post",
    prompt: "Create a LinkedIn post about productivity and remote work tips",
    type: "social_media",
  }
]

export const writingTips: string[] = [
  "Define your audience clearly (e.g., 'startup founders' vs 'tech hobbyists') to get the right depth.",
  "Specify the desired output format, like 'use bullet points' or 'keep paragraphs under 3 sentences'.",
  "Provide context or a 'persona' for the AI, such as 'Act as an expert copywriter with 10 years of experience'.",
  "Use 'Negative Constraints' to save time, for example: 'Avoid using corporate jargon or buzzwords'.",
  "Include a call-to-action (CTA) goal so the AI knows exactly what you want the reader to do next.",
  "Ask the AI to 'show, don't tell' by using descriptive scenarios instead of just stating facts.",
  "Set a word count limit or reading time target to ensure the content fits your specific platform.",
  "Request a 'hook' at the beginning to grab attention and a summary at the end for better retention.",
  "Specify the language style, such as 'Standard Indonesian' (formal) or 'Gen-Z slang' (casual/trendy).",
  "Ask the AI to provide 3 different variations of a headline so you can choose the most compelling one."
]
