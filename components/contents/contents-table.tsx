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
import { Star } from "lucide-react";
import ContentsActions from "./contents-actions"

export default function ContentsTable({
  headers,
  data,
}: {
  headers: { name: string; key: keyof ContentItem }[],
  data: ContentItem[]
}) {
  const renderCellValue = (item: ContentItem, key: keyof ContentItem) => {
    const value = item[key]

    switch (key) {
      case 'title':
        return (
          <div className="flex items-start gap-2">
            <Button variant="ghost" size="icon-sm" className="w-auto h-auto leading-0">
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

  return (
    <div className="hidden md:block overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
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
        </TableHeader>
        <TableBody>
          {data.map((d, n) => (
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
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
