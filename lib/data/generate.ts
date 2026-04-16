import type { ContentType, ContentTone, ContentStatus } from "@/lib/types/content"

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
