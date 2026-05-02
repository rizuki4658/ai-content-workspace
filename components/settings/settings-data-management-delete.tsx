"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAllContent } from "@/lib/api/settings"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LoaderCircle, Trash, Trash2 } from "lucide-react"

export default function SettingsDataManagementDelete() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync: deletingAllContent, isPending } = useMutation({
    mutationFn: deleteAllContent,

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

  const onDelete = async () => {
    await deletingAllContent()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="lg" className="w-full">
          <Trash />
          Clear All Content
        </Button>
      </DialogTrigger>

      <DialogContent
        className="gap-0! p-10 max-w-[90vw]! md:max-w-160!"
        showCloseButton={false}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="sr-only">
            Delete all content
          </DialogTitle>
          <DialogDescription className="sr-only">
            Confirm permanent deletion of all generated content.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col justify-center items-center gap-4">
          <div className="bg-muted h-20 w-20 rounded-full flex justify-center items-center">
            <Trash2 size={40} className="text-destructive opacity-60" />
          </div>

          <div className="text-muted-foreground text-center space-y-2">
            <h5 className="text-xl text-foreground">
              Are you absolutely sure?
            </h5>
            <p className="text-xs">
              You are about to delete all data in this workspace. This process
              is irreversible, and you will lose all your generated AI content.
              We strongly recommend exporting your data as PDF, ZIP or JSON before
              proceeding.
            </p>
          </div>

          <div className="w-full flex items-center justify-center gap-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                size="lg"
                className={`flex-1 ${isPending ? "opacity-50" : ""}`}
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              variant="destructive"
              size="lg"
              className={`flex-1 ${isPending ? "opacity-50" : ""}`}
              disabled={isPending}
              onClick={onDelete}
            >
              {isPending ? <LoaderCircle className="animate-spin" /> : null}
              Yes, Delete Everything
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
