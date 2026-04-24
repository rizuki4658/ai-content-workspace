import Link from "next/link"
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

export default function ContentsMobileList({
  data,
  onFavorite
}: {
  data: ContentItem[];
  onFavorite: (item: ContentItem) => void
}) {
  return (
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
  )
}
