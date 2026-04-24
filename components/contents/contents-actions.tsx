import { ContentItem, ContentStatus } from "@/lib/types/content"
import { Archive, ArchiveRestore, BookmarkCheck, CircleCheck, EllipsisVertical, Eye, Globe, Pencil, Trash2 } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

function ContentsActionTrigger() {
  return (
    <Button variant="ghost">
      <EllipsisVertical />
    </Button>
  )
}

export default function ContentsActions({
  item,
  variant,
  align = 'center',
  onView,
  onEdit,
  onReady,
  onDelete,
  onRestore,
  onArchived,
  onPublish
}: {
  item: ContentItem;
  variant: ContentStatus;
  align?: "center" | "start" | "end" | undefined;
  onView?: (e: ContentItem) => void;
  onEdit?: (e: ContentItem) => void;
  onReady?: (e: ContentItem) => void;
  onDelete?: (e: ContentItem) => void;
  onRestore?: (e: ContentItem) => void;
  onArchived?: (e: ContentItem) => void;
  onPublish?: (e: ContentItem) => void;
}) {

  if (variant === 'draft') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <ContentsActionTrigger />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40 py-2 px-1"
          align={align}>
          <DropdownMenuItem
            onClick={() => onView && onView(item)}>
            <div className="flex items-center gap-2">
              <Eye />
              <p>View</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onEdit && onEdit(item)}>
            <div className="flex items-center gap-2">
              <Pencil />
              <p>Edit</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onReady && onReady(item)}>
            <div className="flex items-center gap-2">
              <CircleCheck />
              <p>Mark as Ready</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete && onDelete(item)}>
            <div className="flex items-center gap-2">
              <Trash2 />
              <p>Delete</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === 'ready') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <ContentsActionTrigger />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40 py-2 px-1"
          align={align}>
          <DropdownMenuItem
            onClick={() => onView && onView(item)}>
            <div className="flex items-center gap-2">
              <Eye />
              <p>View</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onEdit && onEdit(item)}>
            <div className="flex items-center gap-2">
              <Pencil />
              <p>Edit</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onPublish && onPublish(item)}>
            <div className="flex items-center gap-2">
              <Globe />
              <p>Publish</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onArchived && onArchived(item)}>
            <div className="flex items-center gap-2">
              <Archive />
              <p>Archived</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete && onDelete(item)}>
            <div className="flex items-center gap-2">
              <Trash2 />
              <p>Delete</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === 'published') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <ContentsActionTrigger />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-40 py-2 px-1"
          align={align}>
          <DropdownMenuItem
            onClick={() => onView && onView(item)}>
            <div className="flex items-center gap-2">
              <Eye />
              <p>View</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onArchived && onArchived(item)}>
            <div className="flex items-center gap-2">
              <Archive />
              <p>Archived</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete && onDelete(item)}>
            <div className="flex items-center gap-2">
              <Trash2 />
              <p>Delete</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === 'archived') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <ContentsActionTrigger />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-40 py-2 px-1"
          align={align}>
          <DropdownMenuItem
            onClick={() => onView && onView(item)}>
            <div className="flex items-center gap-2">
              <Eye />
              <p>View</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onRestore && onRestore(item)}>
            <div className="flex items-center gap-2">
              <ArchiveRestore />
              <p>Restore Default</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete && onDelete(item)}>
            <div className="flex items-center gap-2">
              <Trash2 />
              <p>Delete</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return ''
}
