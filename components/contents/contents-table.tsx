"use client"

import { useState } from "react"
import Link from "next/link"

import type { ContentItem } from "@/lib/types/content"
import { relativeDate } from '@/lib/utils/date-format'

import {
  getExcerpt,
  renderBadge
} from "./contents-helper"

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@/components/ui/table'
import { Button } from "@/components/ui/button"
import { ServerOff, Star } from "lucide-react";
import ContentsActions from "./contents-actions"
import ContentsView from "@/components/contents/contents-view"
import ContentsEdit from "@/components/contents/contents-edit"
import ContentsArchived from "@/components/contents/contents-archived"
import ContentsRestore from "@/components/contents/contents-restore"
import ContentsDelete from "@/components/contents/contents-delete"

export default function ContentsTable({
  headers,
  data,
  onFavorite,
  onEditContent,
  onReadyContent,
  onPublishContent,
  onArchivedContent,
  onRestoreContent,
  onDeleteContent
}: {
  headers: { name: string; key: keyof ContentItem }[],
  data: ContentItem[];
  onFavorite: (item: ContentItem) => void;
  onEditContent?: (item: ContentItem) => void | Promise<void>;
  onReadyContent?: (item: ContentItem) => void | Promise<void>;
  onPublishContent?: (item: ContentItem) => void | Promise<void>;
  onArchivedContent?: (item: ContentItem) => void | Promise<void>;
  onRestoreContent?: (item: ContentItem) => void | Promise<void>;
  onDeleteContent?: (id: ContentItem["id"], item: ContentItem) => void | Promise<void>;
}) {
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
  const renderCellValue = (item: ContentItem, key: keyof ContentItem) => {
    const value = item[key]

    switch (key) {
      case 'title':
        return (
          <div className="flex items-start gap-2">
            <Button
              variant="ghost" size="icon-sm" className="w-auto h-auto leading-0"
              onClick={() => onFavorite(item) }>
              <div className={item.favorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}>
                <Star fill={item.favorite ? 'currentColor' : 'none'} color="currentColor" />
              </div>
            </Button>
            <div>
              <p className="font-medium opacity-80 pb-1">{value}</p>
              <div className="text-muted-foreground text-xs max-w-3xl whitespace-pre-wrap wrap-break-words">
                {getExcerpt(item.output, 200)}
              </div>
            </div>
          </div>
        )
      case 'type':
        return renderBadge({item, key})
      case 'tone':
        return renderBadge({item, key})
      case 'status':
        return renderBadge({item, key})
      case 'updatedAt':
        return (<p className="text-muted-foreground">
          {relativeDate(value as string)}
        </p>)
      default:
        return value?.toString()
    }
  }

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

  return (
    <div className="hidden md:block overflow-hidden rounded-md border">
      <Table>
        {data.length ? <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header.key}>
                <span className="text-muted-foreground">
                  {header.name}
                </span>
              </TableHead>
            ))}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader> : null}
        <TableBody>
          {data.length ? data?.map((d, n) => (
            <TableRow key={`${d.id}_${n}`}>
              {headers.map((header) => (
                <TableCell
                  key={`${d.id}_${header.key.toString()}`}
                  width={header.key === 'title' ? "480px" : "100px"}>
                  {renderCellValue(d, header.key)}
                </TableCell>
              ))}
              <TableCell width="40px">
                <ContentsActions
                  item={d}
                  variant={d.status}
                  align="end"
                  onView={() => onView(d, 'openView')}
                  onEdit={() => onView(d, 'openEdit')}
                  onReady={onReady}
                  onDelete={() => onView(d, 'openDelete')}
                  onRestore={() => onView(d, 'openRestore')}
                  onArchived={() => onView(d, 'openArchived')}
                  onPublish={onPublish}
                />
              </TableCell>
            </TableRow>
          )) : <TableRow>
            <TableCell>
              <div className="flex flex-col h-80 justify-center items-center text-center p-6 border-2 border-dashed rounded-xl border-muted/20">
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
              </div>
            </TableCell>
          </TableRow> }
        </TableBody>
      </Table>
      {data.length ?
        <>
          <ContentsView
            open={content.openView}
            item={content.item}
            onClose={() => setContent({
              openView: false,
              openEdit: false,
              openArchived: false,
              openRestore: false,
              openDelete: false,
              item: undefined
            })}
          />
          <ContentsEdit
            open={content.openEdit}
            item={content.item}
            onSave={onEdit}
            onClose={() => setContent({
              openView: false,
              openEdit: false,
              openArchived: false,
              openRestore: false,
              openDelete: false,
              item: undefined
            })}
          />
          <ContentsArchived
            open={content.openArchived}
            item={content.item}
            onConfirm={onArchived}
            onCancel={() => setContent({
              openView: false,
              openEdit: false,
              openArchived: false,
              openRestore: false,
              openDelete: false,
              item: undefined
            })}
          />
          <ContentsRestore
            open={content.openRestore}
            item={content.item}
            onConfirm={onRestore}
            onCancel={() => setContent({
              openView: false,
              openEdit: false,
              openArchived: false,
              openRestore: false,
              openDelete: false,
              item: undefined
            })}
          />
          <ContentsDelete
            open={content.openDelete}
            item={content.item}
            onConfirm={onDelete}
            onCancel={() => setContent({
              openView: false,
              openEdit: false,
              openArchived: false,
              openRestore: false,
              openDelete: false,
              item: undefined
            })}
          />
        </> : null
      }
    </div>
  )
}
