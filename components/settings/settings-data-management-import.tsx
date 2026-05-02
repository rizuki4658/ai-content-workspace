"use client"

import { useState } from "react"
import { onReadFile } from "@/lib/utils/import"
import { getExcerpt } from "@/components/contents/contents-helper"
import { formatDate } from "@/lib/utils/date-format"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { importContent } from "@/lib/api/settings"

import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload, FileJson, AlertCircle, CircleCheck, Trash2, LoaderCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SettingDataManagementImport() {
  const [data, setData] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<boolean>(false)
  const [isImporting, setIsImporting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const queryClient = useQueryClient()
  const { mutateAsync: importingContent, isPending } = useMutation({
    mutationFn: importContent,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["contents"] })

      const previousContents = queryClient.getQueriesData({
        queryKey: ["contents"],
      })

      queryClient.setQueriesData(
        { queryKey: ["contents"] },
        (old: any) => {
          if (!old) return old

          return {
            ...old,
            data: [],
            meta: old.meta
              ? {
                  ...old.meta,
                  total: 0,
                  from: 0,
                  to: 0,
                  totalPages: 1,
                  hasPrev: false,
                  hasNext: false,
                }
              : old.meta,
          }
        }
      )

      return { previousContents }
    },

    onError: (_error, _variables, context) => {
      context?.previousContents?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },

    onSuccess: () => {
      setOpen(false)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["settings-manage-data"] })
      queryClient.invalidateQueries({ queryKey: ["contents"] })
      queryClient.invalidateQueries({ queryKey: ["analytics"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard-recents-content"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard-recents-activity"] })
    },
  })

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(false)
    setIsImporting(true)
    try {
      const result = await onReadFile(file)
      setData(result)
      setIsSuccess(true)
    } catch (err: any) {
      setError(true)
      setIsSuccess(false)
    } finally {
      setIsImporting(false)
    }
  }

  const onProcceed = async () => {
    try {
      await importingContent(data)
      onOpenClose(false)
    } catch (error) {
      console.log('Error: Import has been failed!')
    }
  }

  const onOpenClose = (value: boolean) => {
    setData([])
    setIsSuccess(false)
    setIsImporting(false)
    setError(false)
    setOpen(value)
  }

  const onDiscard = () => {
    setData([])
    setIsSuccess(false)
    setIsImporting(false)
    setError(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenClose}>
      <DialogTrigger asChild>
        <Button variant="success" size="lg" className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Import Data
        </Button>
      </DialogTrigger>

      <DialogContent 
        onPointerDownOutside={(e) => e.preventDefault()}
        showCloseButton={false}
        className="max-w-[90vw]! lg:w-1/2! lg:max-w-xl!">
        <DialogHeader>
          <DialogTitle>Import Data</DialogTitle>
          <DialogDescription>
            Upload your backup .json file to restore your workspace content.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {!isSuccess && !data.length
            ? <div
              className={`${isImporting && 'animate-pulse'} flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 hover:bg-muted/50 transition-colors cursor-pointer relative`}>
              <input
                type="file"
                accept=".json"
                disabled={isImporting}
                onChange={onFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {!isImporting
                ? <FileJson className="h-10 w-10 text-muted-foreground mb-2" />
                : <LoaderCircle className="h-10 w-10 animate-spin text-muted-foreground mb-2" />
              }
              <p className="text-sm text-muted-foreground">
                {!isImporting
                  ? "Click or drag and drop your JSON file"
                  : "Please wait.."
                }
              </p>
            </div>
            : <div className="w-full overflow-auto h-80 border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tone</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Prompt</TableHead>
                    <TableHead>Output</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item?.title}</TableCell>
                      <TableCell>{item?.type}</TableCell>
                      <TableCell>{item?.status}</TableCell>
                      <TableCell>{item?.tone}</TableCell>
                      <TableCell>{formatDate(item?.createdAt)}</TableCell>
                      <TableCell>{getExcerpt(item?.prompt, 20)}</TableCell>
                      <TableCell>{getExcerpt(item?.output, 50)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          }

          {error && (
            <div className="flex items-center gap-2 p-3 text-sm bg-destructive/10 text-destructive rounded-md border border-destructive/20">
              <AlertCircle className="h-4 w-4" />
              Failed to parsing data!
            </div>
          )}

          {isSuccess && (
            <div className="flex items-center justify-between gap-2 p-3 text-sm bg-green-500/10 text-green-500 rounded-md border border-green-500/20">
              <div className="flex items-center gap-2">
                <CircleCheck className="h-4 w-4" />
                Data has been generated
              </div>
              <Button
                variant="destructive"
                onClick={onDiscard}>
                <Trash2 />
                Discard
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            disabled={isImporting || isPending}
            className={`${isImporting || isPending ? 'opacity-50' : ''}`}
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={onProcceed}
            className={`${isImporting || isPending ? 'opacity-50' : ''}`}>
            {isPending ? <LoaderCircle className="h-10 w-10 animate-spin " /> : null}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
