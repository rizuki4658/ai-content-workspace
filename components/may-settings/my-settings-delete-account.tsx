"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from "lucide-react"

export default function MySettingsDeleteAccount() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onDeleteAccount = async () => {
    setIsLoading(true)

    try {
      console.log("Delete account")
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onOpenChange = (value: boolean) => {
    if (isLoading) return

    setOpen(value)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full"
          size="lg"
          type="button">
          <Trash2 />
          Delete Account
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        onPointerDownOutside={(event) => event.preventDefault()}
        className="gap-0! p-10 max-w-[90vw]! md:max-w-160!"
      >
        <DialogHeader>
          <DialogTitle className="sr-only">
            Delete account
          </DialogTitle>
          <DialogDescription className="sr-only">
            Confirm permanent account deletion.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col justify-center items-center gap-4">
          <div className="bg-muted h-20 w-20 rounded-full flex justify-center items-center">
            <Trash2 size={40} className="text-destructive opacity-60" />
          </div>

          <div className="text-muted-foreground text-center space-y-2">
            <h5 className="text-xl text-foreground">
              Delete your account?
            </h5>
            <p className="text-xs">
              This action is permanent. Your profile, preferences, generated
              content, notifications, and saved workspace data will be removed.
              This cannot be undone.
            </p>
          </div>

          <div className="w-full pt-4">
            <div className="w-full flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className={`flex-1 ${isLoading ? "opacity-50" : ""}`}
                type="button"
                disabled={isLoading}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                size="lg"
                className={`flex-1 ${isLoading ? "opacity-50" : ""}`}
                type="button"
                disabled={isLoading}
                onClick={onDeleteAccount}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : null}
                Yes, Delete Account
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
