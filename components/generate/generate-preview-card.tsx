import { useRef, useState, useEffect } from "react"
import { useGenerateContent } from "@/contexts/generate-context"
import { ideaTypes, ideaStatus } from "@/lib/data/generate"
import { relativeDate } from "@/lib/utils/date-format"
import { getContents, saveContent } from "@/lib/api/content"
import type { ContentStatus } from "@/lib/types/content"

import { CircleCheckBig, CircleX, LoaderCircle, Pencil, Save } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import GeneratePreviewStatus from "./statuses/generate-preview-status"
import GeneratePreviewEditor from "./generate-preview-editor"
import GeneratePreviewDiscardDialog from "./generate-preview-discard-dialog"
import GeneratePreviewToolbar from "./generate-preview-toolbar"

export default function GeneratePreviewCard() {
  const { content, setContent } = useGenerateContent()
  const [showDiscardDialog, setShowDiscardDialog] = useState(false)
  const [currentContent, setCurrentContent] = useState<null | string>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false)
  const [loading, setLoading] = useState({
    draft: false,
    ready: false
  })
  const [showContent, setShowContent] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (content.data?.output) {
      setCurrentContent(content.data.output)
      setIsExpanded(false)
      setShowDiscardDialog(false)
    }
  }, [content.data?.id])
  useEffect(() => {
    if (content.isLoading) {
      setShowContent(false)
      setIsFinishing(false)
    }
  }, [content.isLoading])
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
  const onSave = async ({ status }: { status: ContentStatus }) => {
    if (!content.data) return
    setLoading({
      draft: status === 'draft',
      ready: status === 'ready'
    })
    
    try {
      const response = await getContents()
      await saveContent({
        items: [
          ...[{
            ...content.data,
            status
          }],
          ...response.data
        ],
        status
      })
      setContent({
        data: null,
        isLoading: false,
        form: {
          uniqueId: '',
          title: '',
          tone: "professional",
          type: "blog_idea",
          prompt: ''
        }
      })
    } catch(err) {
      console.log(err)
    } finally {
      setLoading({
        draft: false,
        ready: false
      })
    }
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
          <div className="relative">
            <div className="flex justify-end">
              <GeneratePreviewToolbar
                elementRef={editorRef}
                onExpand={onExpandEditor}
                onDiscard={onDiscard}
              />
            </div>
            {
              !isExpanded ?
                <GeneratePreviewEditor 
                  editorRef={editorRef}
                  content={currentContent || ''}
                  className="whitespace-pre-wrap leading-relaxed text-sm space-y-4 text-foreground outline-0 border border-muted-foreground/20 focus:border-primary p-4 rounded-md h-80 overflow-hidden overflow-y-auto dark:focus:bg-transparent focus:bg-white bg-muted transition-all relative"
                /> : null
            }
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center gap-2">
            <Button
              variant="secondary"
              size="lg"
              className="flex-1"
              disabled={loading.ready || loading.draft}
              onClick={() => onSave({ status: 'draft' })}>
              { loading.draft ? <LoaderCircle size={16} className="animate-spin" /> : null }
              <Pencil /> Draft
            </Button>
            <Button
              size="lg"
              className="flex-1"
              disabled={loading.ready || loading.draft}
              onClick={() => onSave({ status: 'ready' })}>
              { loading.ready  ? <LoaderCircle size={16} className="animate-spin" /> : null }
              <Save />Save
            </Button>
          </div>
        </CardFooter>
      </Card>

      <GeneratePreviewDiscardDialog
        open={showDiscardDialog}
        onShow={setShowDiscardDialog}
        onConfirm={onConfirmDiscard}
      />

      {/* MODAL EXPAND */}
      <Dialog
        open={isExpanded}>
        <DialogContent
          showCloseButton={false}
          className="h-[95vh] sm:max-w-360 md:max-w-360 lg:max-w-360 w-screen rounded-0">
          <DialogHeader>
            <DialogTitle>{content.data.title}</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-2">
            {
              isExpanded ?
                <GeneratePreviewEditor
                  editorRef={editorRef}
                  content={currentContent || ''}
                  className="whitespace-pre-wrap leading-relaxed text-sm space-y-4 text-foreground outline-0 border border-muted-foreground/20 focus:border-primary p-4 rounded-md overflow-hidden overflow-y-auto dark:focus:bg-transparent focus:bg-white bg-muted transition-all relative"
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
