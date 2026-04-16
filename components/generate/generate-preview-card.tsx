import { useRef, useState, useEffect } from "react"
import { useGenerateContent } from "@/contexts/generate-context"
import { ideaTypes, ideaStatus } from "@/lib/data/generate"
import { relativeDate } from "@/lib/utils/date-format"

import { Copy, Maximize2, RefreshCcw, Trash2, Check, TriangleAlert, Pencil, Save } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import GeneratePreviewStatus from "./statuses/generate-preview-status"

const normalizeText = (text: string) => {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/\r?\n|\r/g, "\n")
    .trim()
}// components/generate/editor-content.tsx
interface EditorContentProps {
  content: string;
  editorRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export function EditorContent({ content, editorRef, className }: EditorContentProps) {
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

export default function GeneratePreviewCard() {
  const { content, setContent } = useGenerateContent()
  const [isCopied, setIsCopied] = useState(false)
  const [showDiscardDialog, setShowDiscardDialog] = useState(false)
  const [currentContent, setCurrentContent] = useState<null | string>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (content.data?.output) {
      setCurrentContent(content.data.output)
      setIsExpanded(false)
      setShowDiscardDialog(false)
      setIsCopied(false)
    }
  }, [content.data?.id])
  useEffect(() => {
    if (content.isLoading) {
      setShowContent(false)
      setIsFinishing(false)
    }
  }, [content.isLoading])
  const onSave = ({ draft }: { draft: boolean }) => {
    if (editorRef.current && content.data) {
      const updatedContent = editorRef.current.innerText

      setContent({
        data: {
          ...content.data,
          output: updatedContent
        },
        ...(!!content?.form && {form: { ...content.form }}),
        isLoading: false
      })
    }
  }
  const onCopy = async () => {
    if (!editorRef.current) return

    await navigator.clipboard.writeText(editorRef.current.innerText)
    setIsCopied(true)

    setTimeout(() => setIsCopied(false), 2000)
  }
  const onDiscard = async () => {
    if (!editorRef.current) return

    const currentContent = editorRef.current.innerText.trim()
    const originalContent = content.data?.output.replace(/\*\*/g, '').trim() || ''
    const finalCurrent = currentContent.replace(/\u00a0/g, ' ')
    const finalOriginal = originalContent.replace(/\u00a0/g, ' ')

    const isChanged = finalCurrent !== finalOriginal

    if (isChanged) {
      setShowDiscardDialog(true)
    } else setContent({
      ...(!!content?.form && {form: { ...content.form }}),
      data: null,
      isLoading: false
    })
  }
  const onConfirmDiscard = () => {
    setContent({
      ...(!!content?.form && {form: { ...content.form }}),
      data: null,
      isLoading: false
    })
    setShowDiscardDialog(false)
  }
  const onExpandEditor = () => {
    if (!editorRef.current) return
    setCurrentContent(editorRef.current.innerText)
    setIsExpanded(true)
  }
  const onBlurEditor = () => {
    if (!editorRef.current) return
    setCurrentContent(editorRef.current.innerText)
    setIsExpanded(false)
  }

  if (content.isLoading || (content.data && !showContent)) {
    return (
      <GeneratePreviewStatus
        type="loading"
        isFinished={!content.isLoading && !!content.data}
        onComplete={() => setShowContent(true)}
      />
    )
  }

  if (!content.data) {
    return (
      <GeneratePreviewStatus />
    )
  }
  return (
    <>
      <Card className="rounded-sm">
        <CardHeader className="mb-4 border-b gap-0">
          <CardTitle className="text-sm mb-0">
            <h5 className="font-semibold text-lg leading-4">{content.data?.title}</h5>
          </CardTitle>
          <CardDescription>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground">
              <li className="inline-flex items-center gap-1">{ideaTypes[content?.data?.type as keyof typeof ideaTypes]}</li>
              <li>&bull;</li>
              <li className="inline-flex items-center gap-1">{ideaStatus[content.data?.status as keyof typeof ideaStatus]}</li>
              <li>&bull;</li>
              <li>{relativeDate(content.data?.createdAt || '')}</li>
            </ol>
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <p>{isExpanded}</p>
          <div className="relative">
            <div className="absolute z-0 -top-7 right-2">
              <div className="w-full flex items-center mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`bg-muted rounded-none border-0 rounded-tl-sm`}
                  onClick={onCopy}>
                  {isCopied ? <Check /> : <Copy /> }
                  {isCopied ? 'Copied!' : 'Copy Content' }
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-muted rounded-none border-0"
                  onClick={onExpandEditor}>
                  <Maximize2 /> Expand
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="rounded-none border-0 rounded-tr-sm"
                  onClick={onDiscard}>
                  <Trash2 /> Discard
                </Button>
              </div>
            </div>
            {
              !isExpanded ?
                <EditorContent 
                  editorRef={editorRef}
                  content={currentContent || ''}
                  className="whitespace-pre-wrap leading-relaxed text-sm space-y-4 text-foreground outline-0 border border-muted-foreground/20 focus:border-primary p-4 rounded-md h-80 overflow-hidden overflow-y-auto dark:focus:bg-transparent focus:bg-white bg-muted transition-all z-10 relative"
                /> : null
            }
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center gap-2">
            <Button variant="secondary" size="lg" className="flex-1"><Pencil /> Draft</Button>
            <Button size="lg" className="flex-1"><Save />Save</Button>
          </div>
        </CardFooter>
      </Card>
      <AlertDialog
        open={showDiscardDialog}
        onOpenChange={setShowDiscardDialog}>
        <AlertDialogContent className="rounded-md" size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div>
                <div className="flex justify-center text-destructive"><TriangleAlert size={32} /></div>
                <p>Are you sure?</p>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              You have unsaved changes in your editor. If you discard now, your edits will be lost forever.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-sm">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={onConfirmDiscard}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-sm"
            >
              Discard Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* MODAL EXPAND */}
      <Dialog
        open={isExpanded}>
        <DialogContent showCloseButton={false} className="h-[95vh] sm:max-w-360 md:max-w-360 lg:max-w-360 w-screen rounded-0">
          <DialogHeader>
            <DialogTitle>{content.data.title}</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-2">
            {
              isExpanded ?
                <EditorContent
                  editorRef={editorRef}
                  content={currentContent || ''}
                  className="whitespace-pre-wrap leading-relaxed text-sm space-y-4 text-foreground outline-0 border border-muted-foreground/20 focus:border-primary p-4 rounded-md overflow-hidden overflow-y-auto dark:focus:bg-transparent focus:bg-white bg-muted transition-all z-10 relative"
                /> : null
            }
          </div>

          <div className="flex justify-end gap-2 border-t pt-4">
             <Button variant="outline" size="lg" onClick={onBlurEditor}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )    
}
