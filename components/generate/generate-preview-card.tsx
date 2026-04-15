import { useGenerateContent } from "@/contexts/generate-context"

export default function GeneratePreviewCard() {
  const { content } = useGenerateContent()

  return (
    <div>
      <p>{content?.title}</p>
    </div>
  )
}
