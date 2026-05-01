export interface GetAnalyticsResponse {
  stats?: {
    total?: number;
    draft?: number;
    ready?: number;
    published?: number;
  },
  distribution?: {
    blog_idea?: number;
    caption?: number;
    email?: number;
    product_description?: number;
    social_media?: number;
    total?: number;
  },
  summary?: {
    recents?: any[];
    insights?: any[];
  }
}
