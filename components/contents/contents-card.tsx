"use client"

import type { ContentFilter, ContentItem } from "@/lib/types/content"
import { useDebounce } from "@/hooks/use-debounce"

import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ideaStatus, ideaTypes } from "@/lib/data/generate"
import { contentHeaders } from "@/lib/data/contents"

import { deleteContent, editContent, getContents, setFavorite, setStatus } from "@/lib/api/content"
import { GetContentResponse } from "@/lib/storage/content"

import {
  Card,
  CardContent
} from "@/components/ui/card"
import ContentsFilter from "./contents-filter"
import ContentsTable from "./contents-table"
import ContentsMobileList from "./contents-mobile-list"
import ContentsPagination from "./contents-pagination"
import ContentsSkeletonCard from "./contents-skeleton"
import { ContentsListSkeleton, ContentsTableSkeleton } from "./skeletons/contents-table-list-skeleton"

export default function ContentsMain() {
  const defaultFilterValue: ContentFilter = {
    search: '',
    status: 'all',
    type: 'all',
    by: 'all'
  }
  const [filter, setFilter] = useState<ContentFilter>(defaultFilterValue)
  const debouncedSearch = useDebounce(filter.search, 500)
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()
  const { data, isLoading, isFetching, isError } = useQuery<GetContentResponse>({
    queryKey: ['contents', {
      search: debouncedSearch,
      status: filter.status,
      type: filter.type,
      by: filter.by,
      page
    }],
    queryFn: () => getContents({
      search: debouncedSearch,
      status: filter.status,
      type: filter.type,
      by: filter.by,
      page,
      limit: 10
    }),
  })
  const { mutateAsync: updateContent } = useMutation({
    mutationFn: async ({
      id,
      updates,
      type,
      apiFn,
    }: {
      id: string
      updates: Partial<ContentItem>
      type: 'favorite' | 'edit' | 'delete' | 'status'
      apiFn: (id: string, data: any) => Promise<any>
    }) => {
      return await apiFn(id, updates)
    },

    onMutate: async (newVariable) => {
      await queryClient.cancelQueries({ queryKey: ['contents'] })

      const previousContents = queryClient.getQueriesData<GetContentResponse>({
        queryKey: ['contents'],
      })

      queryClient.setQueriesData<GetContentResponse>(
        { queryKey: ['contents'] },
        (old) => {
          if (!old) return old

          if (newVariable.type === 'delete') return {
            ...old,
            data: old.data.filter(item => item.id !== newVariable.id)
          }

          return {
            ...old,
            data: old.data.map((item) =>
              item.id === newVariable.id
                ? {
                  ...item,
                  ...newVariable.updates
                }
                : item
            ),
          }
        }
      )

      return { previousContents }
    },

    onError: (_err, _variables, context) => {
      context?.previousContents?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },

    onSettled: (_, error, variables) => {
      if (error) return

      const isTargetAction = ['edit', 'delete', 'status'].includes(variables.type)
      
      const status = variables.updates?.status || variables.updates?.status
      const isNotReadyOrPublish = !['ready', 'published'].includes(status || '')

      if (isTargetAction && isNotReadyOrPublish) {
        queryClient.invalidateQueries({ queryKey: ['contents'] })
      }
    },
  })

  const onClear = () => {
    setFilter({...defaultFilterValue})
    queryClient.invalidateQueries({ queryKey: ['contents'] })
  }

  const onFavorite = async (item: ContentItem) => {
    await updateContent({
      id: item.id,
      updates: {
        ...item,
        favorite: !item.favorite,
        updatedAt: new Date().toISOString()
      },
      type: 'favorite',
      apiFn: setFavorite
    })
  }

  const onEdit = async (item: ContentItem) => {
    await updateContent({
      id: item.id,
      updates: {
        ...item,
        title: item.title,
        output: item.output,
        status: item.status,
        updatedAt: new Date().toISOString()
      },
      type: 'edit',
      apiFn: editContent
    })
  }

  const onReady = async (item: ContentItem) => {
    await updateContent({
      id: item.id,
      updates: {
        ...item,
        status: 'ready',
        updatedAt: new Date().toISOString()
      },
      type: 'status',
      apiFn: setStatus
    })
  }

  const onPublish = async (item: ContentItem) => {
    await updateContent({
      id: item.id,
      updates: {
        ...item,
        status: 'published',
        updatedAt: new Date().toISOString()
      },
      type: 'status',
      apiFn: setStatus
    })
  }

  const onArchived = async (item: ContentItem) => {
    await updateContent({
      id: item.id,
      updates: {
        ...item,
        status: 'archived',
        updatedAt: new Date().toISOString()
      },
      type: 'status',
      apiFn: setStatus
    })
  }

  const onRestore = async (item: ContentItem) => {
    await updateContent({
      id: item.id,
      updates: {
        ...item,
        status: 'draft',
        updatedAt: new Date().toISOString()
      },
      type: 'status',
      apiFn: setStatus
    })
  }

  const onDelete = async (id: ContentItem["id"], item: ContentItem) => {
    await updateContent({
      id: item.id,
      updates: item,
      type: 'delete',
      apiFn: deleteContent
    })
  }

  if (isLoading) return <ContentsSkeletonCard />

  return (
    <Card>
      <CardContent>
        <div className="space-y-10">
          <ContentsFilter
            value={filter}
            status={ideaStatus}
            types={ideaTypes}
            onChange={(newFilter) => setFilter(newFilter)}
            onClear={onClear}
          />

          <div className="space-y-4">
            {!isFetching ? <>
                <ContentsTable
                  headers={contentHeaders}
                  data={data?.data || []}
                  onFavorite={onFavorite}
                  onEditContent={onEdit}
                  onReadyContent={onReady}
                  onPublishContent={onPublish}
                  onArchivedContent={onArchived}
                  onRestoreContent={onRestore}
                  onDeleteContent={onDelete}
                />
                <ContentsMobileList
                  data={data?.data || []}
                  onFavorite={onFavorite}
                />
              </> : <>
                <ContentsTableSkeleton />
                <ContentsListSkeleton />
              </>
            }
            <ContentsPagination
              meta={data?.meta}
              page={page}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
