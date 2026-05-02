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
  userEmail?: string;
};

export type PromptSuggestionItem = {
  id: string | number;
  label: string;
  prompt: string;
  type: ContentType;
  tone?: ContentTone;
  targetAudience?: string;
  keywords?: string;
}

export type ContentFilter = {
  search?: string;
  limit?: number;
  page?: number;
  status?: ContentStatus | "all";
  type?: ContentType | "all";
  by?: string
}

export type GenerateApiResponse = {
  title: string;
  type: ContentItem["type"];
  tone?: ContentItem["tone"];
  targetAudience?: string;
  output: string;
}
