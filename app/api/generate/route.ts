import OpenAI from "openai";
import { NextResponse } from "next/server";

import { generateContentFormSchema } from "@/lib/validations/contents";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function buildPrompt(values: {
  type: string
  title: string
  prompt: string
  tone?: string
  targetAudience?: string
  keywords?: string
}) {
  return `
You are an AI writing assistant.

Generate a ${values.type.replaceAll("_", " ")} with the following requirements:

Title: ${values.title}
Prompt: ${values.prompt}
Tone: ${values.tone ?? "not specified"}
Target audience: ${values.targetAudience || "not specified"}
Keywords: ${values.keywords || "not specified"}

Return the result in clean Markdown format.

Formatting rules:
- Use # for the main title
- Use ## for section headings when needed
- Keep paragraphs short and easy to read
- Use bullet points where appropriate
- Add spacing between sections
- Do not return HTML
- Do not include explanations outside the final content
`.trim()
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = generateContentFormSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid form data.",
          issues: parsed.error.flatten(),
        },
        { status: 400 }
      )
    }

    const values = parsed.data

    const response = await client.responses.create({
      model: "gpt-5.4",
      input: buildPrompt(values),
    })

    return NextResponse.json({
      title: values.title,
      type: values.type,
      tone: values.tone,
      targetAudience: values.targetAudience,
      output: response.output_text,
    })
  } catch (error) {
    console.error("Generate API error:", error)
    if ((error as any)?.status === 429) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please try again later.",
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      {
        error: "Failed to generate content.",
      },
      { status: 500 }
    )
  }
}
