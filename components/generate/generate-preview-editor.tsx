interface GeneratePreviewEditorProps {
  content: string;
  editorRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export default function EditorContent({ content, editorRef, className }: GeneratePreviewEditorProps) {
  return (
    <div
      ref={editorRef}
      contentEditable={true}
      suppressContentEditableWarning={true}
      className={className}
    >
      {content?.split(/(\*\*.*?\*\*)/g).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            part.replace(/\*\*/g, '')
          )
        }

        return part
      }) || null}
    </div>
  )
}
