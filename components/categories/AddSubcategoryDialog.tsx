"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X, Loader2 } from "lucide-react"

type Status = "Active" | "Inactive"

export function AddSubcategoryDialog({
    trigger,
    parentCategoryName,
    onSave,
    defaultStatus = "Active",
    initialValues,
    isEdit = false,
    isSaving: externalIsSaving = false,
    setIsSaving: setExternalIsSaving,
}: any) {
    const [internalIsSaving, setInternalIsSaving] = useState(false)
    const isSaving = setExternalIsSaving ? externalIsSaving : internalIsSaving
    const setIsSaving = setExternalIsSaving || setInternalIsSaving
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (initialValues) {
            setValues({
                name: initialValues.name || "",
                description: initialValues.description || "",
                status: initialValues.status?.toLowerCase() === "active" ? 'Active' : 'Inactive'
            })
        }
    }, [initialValues, defaultStatus])

    const [error, setError] = useState<string | null>(null)
    const [values, setValues] = useState<{ name: string; description: string; status: Status }>(
        {
            name: initialValues?.name || "",
            description: initialValues?.description || "",
            status: (() => {
                const status = initialValues?.status?.toLowerCase();
                if (status === 'active' || status === 'inactive') {
                    return status.charAt(0).toUpperCase() + status.slice(1) as Status;
                }
                return initialValues?.status?.toLowerCase() === "active" ? 'Active' : 'Inactive';
            })() || defaultStatus as Status
        }
    )

    const canSave = values.name.trim().length > 0 && values.status !== undefined

    const handleSave = async () => {
        if (!canSave || isSaving) return

        setError(null)
        setIsSaving(true)

        try {
            const payload = {
                name: values.name.trim(),
                description: values.description?.trim() || "",
                status: values.status.toLowerCase(), // Convert to lowercase for API
                ...(isEdit && initialValues?.id && { id: initialValues.id })
            }

            if (onSave) {
                await Promise.resolve(onSave({
                    ...payload,
                    status: values.status.toLowerCase()
                }))
                if (!isEdit) {
                    setValues({ name: "", description: "", status: defaultStatus })
                }
                setOpen(false)
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to save subcategory'
            setError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            if (!isOpen) {
                if (!isEdit) {
                    setValues({ name: "", description: "", status: defaultStatus })
                }
                setError(null)
            }
            setOpen(isOpen)
        }}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="p-0">
                <DialogHeader className="border-b">
                    <DialogTitle>
                        {isEdit ? 'Edit' : 'Add New'} {parentCategoryName ? 'Subcategory' : 'Category'}
                        {isEdit && initialValues?.id && ` #${initialValues.id}`}
                    </DialogTitle>
                    <DialogClose>
                        <X className="size-5" />
                    </DialogClose>
                </DialogHeader>
                <DialogBody>
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
                            {error}
                        </div>
                    )}
                    <div className="space-y-1 mb-4">
                        {parentCategoryName && (
                            <p className="text-sm text-muted-foreground">
                                Parent Category: <span className="font-medium text-foreground">{parentCategoryName}</span>
                            </p>
                        )}
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Subcategory Name *</label>
                            <Input
                                placeholder="Enter subcategory name"
                                value={values.name}
                                onChange={(e) => setValues((v) => ({
                                    ...v,
                                    name: e.target.value
                                }))}
                                disabled={isSaving}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                                placeholder="Enter description (optional)"
                                value={values.description}
                                onChange={(e) => setValues((v) => ({
                                    ...v,
                                    description: e.target.value
                                }))}
                                rows={3}
                                disabled={isSaving}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Status *</label>
                            <Select
                                value={values.status}
                                onValueChange={(value: Status) =>
                                    setValues((v) => ({ ...v, status: value }))
                                }
                                disabled={isSaving}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className="border-t">
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
                        ) : isEdit ? 'Update Subcategory' : `Add Subcategory`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
