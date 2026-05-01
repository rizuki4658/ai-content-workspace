import type { GenerateContentFormValues } from "@/lib/validations/contents"
import type { ContentItem, GenerateApiResponse, PromptSuggestionItem } from "@/lib/types/content"
import { DashboardQuickAction } from "@/lib/types/dashboard"
import { quickActions } from "@/lib/data/dashboard"

import { generateId } from "@/lib/utils/generator-id"
import { writingTips, promptSuggestions } from "@/lib/data/generate"

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
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

export async function fetchSuggestedPrompts() {
  await wait(500)
  return promptSuggestions
}

export async function fetchSuggestedPromptById(id: PromptSuggestionItem['id']): Promise<PromptSuggestionItem | undefined> {
  try {
    const response = promptSuggestions.find(prompt => prompt.id === id)
    await wait(500)

    return response
  } catch (error) {
    return undefined
  }
}

export async function fetchQuicActionById(id: string | number): Promise<DashboardQuickAction | undefined> {
  try {
    const response = quickActions.find(act => act.id === id.toString())
    await wait(500)

    return response
  } catch (error) {
    return undefined
  }
}

export async function fetchWriteTips() {
  await wait(500)
  return writingTips
}

