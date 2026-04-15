import type { ContentItem, ContentStatus } from "@/lib/types/content"
import type { GenerateContentFormValues } from "@/lib/validations/contents"

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildOutput(values: GenerateContentFormValues) {
  const audienceText = values.targetAudience
    ? ` for ${values.targetAudience}`
    : ""

  const toneText = values.tone ? ` in a ${values.tone} tone` : ""

  return `# ${values.title}

Here is a generated ${values.type.replaceAll("_", " ")}${audienceText}${toneText}.

${values.prompt}

This content is designed to feel clear, relevant, and aligned with your requested direction. You can now refine, save, or publish it based on your workflow.`
}

export async function generateContent(
  values: GenerateContentFormValues
): Promise<ContentItem> {
  await wait(1800)

  // Optional: simulate random failure
  if (Math.random() < 0.15) {
    throw new Error("Failed to generate content. Please try again.");
  }

  const now = new Date().toISOString()
  const status: ContentStatus = "ready"

  return {
    id: crypto.randomUUID(),
    title: values.title,
    type: values.type,
    prompt: values.prompt,
    output: buildOutput(values),
    status,
    favorite: false,
    tone: values.tone,
    targetAudience: values.targetAudience || undefined,
    createdAt: now,
    updatedAt: now,
  }
}
