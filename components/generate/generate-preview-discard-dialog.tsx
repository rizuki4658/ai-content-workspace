import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { TriangleAlert } from "lucide-react"
import { Dispatch, SetStateAction } from "react";

export default function GeneratePreviewDiscardDialog({
  open, onShow, onConfirm
}: {
  open: boolean;
  onShow: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onShow}>
      <AlertDialogContent className="rounded-md" size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div>
              <div className="flex justify-center text-destructive"><TriangleAlert size={32} /></div>
              <p>Are you sure?</p>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            You have unsaved changes in your editor. If you discard now, your edits will be lost forever.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-sm">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-sm"
          >
            Discard Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
