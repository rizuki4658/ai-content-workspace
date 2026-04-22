import type { GenerateContentFormValues } from "@/lib/validations/contents"
import type { ContentItem } from "@/lib/types/content"

import { generateId } from "@/lib/utils/generator-id"

type GenerateApiResponse = {
  title: string;
  type: ContentItem["type"];
  tone?: ContentItem["tone"];
  targetAudience?: string;
  output: string;
}

export async function generateContent(
  values: GenerateContentFormValues
): Promise<ContentItem> {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate content.");
  }

  const result = data as GenerateApiResponse

  const now = new Date().toISOString()

  return {
    id: generateId(),
    title: result.title,
    type: result.type,
    prompt: values.prompt,
    output: result.output,
    status: "ready",
    favorite: false,
    tone: result.tone,
    targetAudience: result.targetAudience || undefined,
    createdAt: now,
    updatedAt: now,
  };
}
