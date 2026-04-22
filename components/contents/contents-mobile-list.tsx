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
import { Star } from "lucide-react"
import ContentsActions from "./contents-actions"

export default function ContentsMobileList({
  data
}: {
  data: ContentItem[]
}) {
  return (
    <div className="block md:hidden space-y-4">
      {data.map(item => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon-sm">
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
      ))}
    </div>
  )
}
