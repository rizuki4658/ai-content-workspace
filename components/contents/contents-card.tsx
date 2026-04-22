"use client"

import { useEffect, useState } from "react"
import { ideaStatus, ideaTypes } from "@/lib/data/generate"
import { contentHeaders } from "@/lib/data/contents"

import { getContents } from "@/lib/api/content"
import { ContentItem } from "@/lib/types/content"
import { GetContentResponse } from "@/lib/storage/content"

import {
  Card,
  CardContent
} from "@/components/ui/card"
import ContentsFilter from "./contents-filter"
import ContentsTable from "./contents-table"
import ContentsMobileList from "./contents-mobile-list"
import ContentsPagination from "./contents-pagination"

export default function ContentsMain() {
  const [search, setSearch] = useState('')
  const [items, setItems] = useState<ContentItem[]>([])
  const [meta, setMeta] = useState<GetContentResponse["meta"]>({
    total: 1,
    page: 1,
    limit: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  })
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState({
    filter: false,
    init: false
  })

  const onLoading = (key: keyof typeof loading = 'init', value: boolean = false) => {
   setLoading(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const onFetch = async () => {
    onLoading('init', true)
    const response = await getContents({ limit: 10, page: 1, search })
    setMeta(response.meta)
    setItems(response.data)
    onLoading('init', false)
  }

  useEffect(() => {
    setMounted(true)
    onFetch()
  }, [])

  if (!mounted) return null;

  return (
    <Card>
      <CardContent>
        {loading.init ? 'Loading...' :
        <div className="space-y-10">
          <ContentsFilter
            value={''}
            status={ideaStatus}
            types={ideaTypes}
            onChange={() => console.log('change filter')}
            onClear={() => console.log('reset filter')}
          />

          <div className="space-y-4">
            <ContentsTable
              headers={contentHeaders}
              data={items}
            />
            <ContentsMobileList
              data={items}
            />
            <ContentsPagination />
          </div>
        </div>}
      </CardContent>
    </Card>
  )
}
