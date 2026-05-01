import { useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ContentItem } from "@/lib/types/content"

import {
  getExcerpt,
  renderBadge
} from "./contents-helper"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { ServerOff, Star } from "lucide-react"
import ContentsActions from "./contents-actions"
import ContentsView from "@/components/contents/contents-view"
import ContentsEdit from "@/components/contents/contents-edit"
import ContentsArchived from "@/components/contents/contents-archived"
import ContentsRestore from "@/components/contents/contents-restore"
import ContentsDelete from "@/components/contents/contents-delete"

export default function ContentsMobileList({
  editId,
  data,
  onFavorite,
  onEditContent,
  onReadyContent,
  onPublishContent,
  onArchivedContent,
  onRestoreContent,
  onDeleteContent
}: {
  editId?: string;
  data: ContentItem[];
  onFavorite: (item: ContentItem) => void;
  onEditContent?: (item: ContentItem) => void | Promise<void>;
  onReadyContent?: (item: ContentItem) => void | Promise<void>;
  onPublishContent?: (item: ContentItem) => void | Promise<void>;
  onArchivedContent?: (item: ContentItem) => void | Promise<void>;
  onRestoreContent?: (item: ContentItem) => void | Promise<void>;
  onDeleteContent?: (id: ContentItem["id"], item: ContentItem) => void | Promise<void>;
}) {
  const router = useRouter()
  const [content, setContent] = useState<{
    openView: boolean;
    openEdit: boolean;
    openArchived: boolean;
    openRestore: boolean;
    openDelete: boolean;
    item: ContentItem | undefined
  }>({
    openView: false,
    openEdit: false,
    openArchived: false,
    openRestore: false,
    openDelete: false,
    item: undefined
  })

  const onView = (item: ContentItem, key: "openView" | "openEdit" | "openArchived" | "openRestore" | "openDelete") => {
    setContent({
      openView: key === "openView",
      openEdit: key === "openEdit",
      openArchived: key === "openArchived",
      openRestore: key === "openRestore",
      openDelete: key === "openDelete",
      item
    })
  }
  
  const onEdit = async (item: ContentItem) => {
    await onEditContent?.(item)

    setContent({
      openView: false,
      openEdit: false,
      openArchived: false,
      openRestore: false,
      openDelete: false,
      item: undefined
    })
  }
  
  const onReady = (item: ContentItem) => {
    onReadyContent?.(item)
  }
  
  const onDelete = async (id: ContentItem["id"], item: ContentItem) => {
    await onDeleteContent?.(id, item)
  }
  
  const onRestore = async (item: ContentItem) => {
    await onRestoreContent?.(item)
  }
  
  const onArchived = async (item: ContentItem) => {
    await onArchivedContent?.(item)
  }
  
  const onPublish = (item: ContentItem) => {
    onPublishContent?.(item)
  }

  const onCloseDialog = () => {
    setContent({
      openView: false,
      openEdit: false,
      openArchived: false,
      openRestore: false,
      openDelete: false,
      item: undefined
    })
    router.replace("/contents", { scroll: false })
  }

  return (
    <>
      <div className="block md:hidden space-y-4">
        {!!data.length ? data.map(item => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onFavorite(item) }>
                      <div className={item.favorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}>
                        <Star fill={item.favorite ? 'currentColor' : 'none'} color="currentColor" />
                      </div>
                    </Button>
                    <p className="text-base">{item.title}</p>
                  </div>
                  <ContentsActions
                    item={item}
                    variant={item.status}
                    align="end"
                    onView={() => onView(item, 'openView')}
                    onEdit={() => onView(item, 'openEdit')}
                    onReady={onReady}
                    onDelete={() => onView(item, 'openDelete')}
                    onRestore={() => onView(item, 'openRestore')}
                    onArchived={() => onView(item, 'openArchived')}
                    onPublish={onPublish}
                  />
                </div>
              </CardTitle>
              <CardDescription>
                <div className="w-full">
                  <p className="text-xs">{getExcerpt(item.output)}</p>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between gap-1">
                <div className="flex items-center gap-1">
                  {renderBadge({item, key: 'type'})}
                  {renderBadge({item, key: 'tone'})}
                </div>
                {renderBadge({item, key: 'status'})}
              </div>
            </CardContent>
          </Card>
        )) : <div className="flex flex-col h-80 justify-center items-center text-center p-6 border-2 border-dashed rounded-xl border-muted/20">
          <div className="bg-muted/10 p-6 rounded-full mb-4">
            <ServerOff className="w-12 h-12 text-muted-foreground/60" />
          </div>
          <h3 className="text-xl font-semibold text-muted-foreground">No content found</h3>
          <p className="text-muted-foreground mt-2 mb-6 whitespace-normal max-w-96 w-full">
            Your workspace is empty. Start generating AI content to see them listed here.
          </p>
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link href="/generate">
              Generate First Content
            </Link>
          </Button>
        </div>}
      </div>
      {data.length ?
        <>
          <ContentsView
            open={content.openView}
            item={content.item}
            onClose={onCloseDialog}
          />
          <ContentsEdit
            open={content.openEdit}
            item={content.item}
            onSave={onEdit}
            onClose={onCloseDialog}
          />
          <ContentsArchived
            open={content.openArchived}
            item={content.item}
            onConfirm={onArchived}
            onCancel={onCloseDialog}
          />
          <ContentsRestore
            open={content.openRestore}
            item={content.item}
            onConfirm={onRestore}
            onCancel={onCloseDialog}
          />
          <ContentsDelete
            open={content.openDelete}
            item={content.item}
            onConfirm={onDelete}
            onCancel={onCloseDialog}
          />
        </> : null
      }
    </>
  )
}
