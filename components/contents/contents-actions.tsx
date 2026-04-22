import { ContentItem, ContentStatus } from "@/lib/types/content"
import { EllipsisVertical } from "lucide-react"

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
        <DropdownMenuContent className="w-40" align={align}>
          <DropdownMenuItem onClick={() => onView && onView(item)}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit && onEdit(item)}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onReady && onReady(item)}>Mark as Ready</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete && onDelete(item)}>Delete</DropdownMenuItem>
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
        <DropdownMenuContent className="w-40" align={align}>
          <DropdownMenuItem onClick={() => onView && onView(item)}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit && onEdit(item)}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onPublish && onPublish}>Publish</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onArchived && onArchived(item)}>Archived</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete && onDelete(item)}>Delete</DropdownMenuItem>
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
        <DropdownMenuContent className="w-40" align={align}>
          <DropdownMenuItem onClick={() => onView && onView(item)}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onArchived && onArchived(item)}>Archived</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete && onDelete(item)}>Delete</DropdownMenuItem>
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
        <DropdownMenuContent className="w-40" align={align}>
          <DropdownMenuItem onClick={() => onView && onView(item)}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRestore && onRestore(item)}>Restore Default</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete && onDelete(item)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return ''
}
