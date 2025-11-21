"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X, Loader2 } from "lucide-react"
import { AddCategoryForm } from "@/types/interface"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory } from "@/apis/all-apis"
import { toast } from "sonner"


export function AddCategoryDialog({
  trigger,
  onSave,
  defaultStatus = "Active",
  initialValues,
  isEdit = false,
}: any) {
  const [open, setOpen] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [values, setValues] = React.useState<AddCategoryForm>({
    name: initialValues?.name || "",
    description: initialValues?.description || "",
    status: initialValues?.status || defaultStatus,
  })

  const canSave = values.name.trim().length > 0

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data: any) => {
      onSave?.(data)
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const handleSave = async () => {
    if (!canSave || isSaving) return

    setIsSaving(true)
    try {
      const payload = {
        categoryLanguageTranslations: [
          {
            languageCodeId: 1,
            name: values.name.trim(),
            description: values.description?.trim() || "",
          },
        ],
        status: values.status.toLowerCase() === "active" ? "active" : "inactive",
      }

      if (isEdit && initialValues?.id) {
        await Promise.resolve(onSave?.({
          ...values,
          ...payload,
          id: initialValues.id
        }))
      } else {
        await mutation.mutateAsync(payload)
      }

      if (!isEdit) {
        setValues({ name: "", description: "", status: defaultStatus })
      }
      setOpen(false)
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to save category"
      toast.error(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  React.useEffect(() => {
    if (initialValues) {
      setValues({
        name: initialValues.name || "",
        description: initialValues.description || "",
        status:
          initialValues.status?.toLowerCase() === "active"
            ? "Active"
            : "Inactive",
      })
    }
  }, [initialValues])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="border-b">
          <DialogTitle>{isEdit ? 'Edit' : 'Add New'} Category</DialogTitle>
          <DialogClose>
            <X className="size-5" />
          </DialogClose>
        </DialogHeader>

        <DialogBody>
          <div className="space-y-1">
            <label className="text-sm font-medium">Name *</label>
            <Input
              placeholder="Enter category name"
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Enter category description"
              value={values.description}
              onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Status *</label>
            <Select
              value={values.status}
              onValueChange={(val) => setValues((v) => ({ ...v, status: val as AddCategoryForm["status"] }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogBody>

        <div className="px-6">
          <div className="h-px w-full bg-border" />
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={!canSave || isSaving}
            className="min-w-[120px]"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEdit ? 'Updating...' : 'Saving...'}
              </>
            ) : isEdit ? 'Update Category' : 'Add Category'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
