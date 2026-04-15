export type ContentType =
  | "blog_idea"
  | "caption"
  | "email"
  | "product_description"
  | "social_media";

export type ContentStatus =
  | "draft"
  | "ready"
  | "published"
  | "archived";

export type ContentTone =
  | "professional"
  | "casual"
  | "friendly"
  | "persuasive"
  | "bold";

export type ContentItem = {
  id: string;
  title: string;
  type: ContentType;
  prompt: string;
  output: string;
  status: ContentStatus;
  favorite: boolean;
  tone?: ContentTone;
  targetAudience?: string;
  createdAt: string;
  updatedAt: string;
  keywords?: string;
};
