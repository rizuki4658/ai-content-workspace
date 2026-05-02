import type { ContentItem } from "@/lib/types/content"

export interface GetContentResponse {
  data: ContentItem[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
}
