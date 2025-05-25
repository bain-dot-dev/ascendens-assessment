"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle, Loader2 } from "lucide-react"

interface DeleteConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  title: string
  description: string
  itemName: string
  destructive?: boolean
}

export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  destructive = true,
}: DeleteConfirmationDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    setIsDeleting(true)
    try {
      await onConfirm()
      onClose()
    } catch (error) {
      console.error("Error deleting item:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {destructive && <AlertTriangle className="h-6 w-6 text-red-500" />}
            <DialogTitle className="text-zinc-100">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-zinc-400">{description}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
            <p className="text-sm text-zinc-300">
              <span className="font-medium">Item to delete:</span> {itemName}
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isDeleting}
            className={
              destructive ? "bg-red-600 hover:bg-red-700 text-white" : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
            }
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {destructive ? "Delete" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
