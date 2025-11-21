"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2, Loader2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "./StatusBadge"
import { AddSubcategoryDialog } from "./AddSubcategoryDialog"
import { createCategory, updateCategory } from "@/apis/all-apis"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { SortIcon } from "@/components/common/SortIcon"
import { TruncatedText } from "@/components/common/TruncatedText"
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog"
import { deleteCategory } from "@/apis/all-apis"
import { AddCategoryDialog } from "./AddCategoryDialog"

export function CategoryTable({ data, onSort, sortField, sortOrder }: any) {
  const queryClient = useQueryClient()
  const [expanded, setExpanded] = useState<any>({})
  const [editingItem, setEditingItem] = useState<any>(null)
  const [deletingItem, setDeletingItem] = useState<any>(null)
  const [updatingId, setUpdatingId] = useState<string | number | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const updateMutation = useMutation({
    mutationFn: async ({ id, values }: { id: any; values: any }) => {
      setIsSaving(true)
      setUpdatingId(id);
      try {
        const payload = {
          categoryLanguageTranslations: [
            {
              languageCodeId: 1,
              name: values.name,
              description: values.description || "",
            }
          ],
          status: values.status?.toLowerCase()
        };
        return await updateCategory(id, payload);
      } finally {
        setUpdatingId(null);
        setIsSaving(false)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success("Category updated successfully");
      setEditingItem(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update category");
    }
  })

  const createSubcategoryMutation = useMutation({
    mutationFn: async ({ parentId, values }: { parentId: number | string; values: any }) => {
      const payload = {
        categoryLanguageTranslations: [
          {
            languageCodeId: 1,
            name: values.name?.trim(),
            description: values.description?.trim() || "",
          },
        ],
        parentId,
        status: values.status?.toLowerCase()
      }
      return await createCategory(payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success("Subcategory created successfully")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create subcategory")
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: any) => {
      return await deleteCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success("Item deleted successfully");
      setDeletingItem(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete item");
      // Don't close the dialog on error
    }
  });

  const handleEdit = (item: any, isSubcategory: boolean) => {
    setEditingItem({
      id: item.id,
      isSubcategory,
      parentId: isSubcategory ? item.parent_id : undefined,
    })
  }

  const handleDelete = (item: any, isSubcategory: boolean) => {
    setDeletingItem({
      id: item.id,
      name: item.name,
      isSubcategory
    })
  }

  const confirmDelete = async () => {
    if (!deletingItem) return;
    try {
      await deleteMutation.mutateAsync(deletingItem.id);
      // Dialog will be closed in onSuccess
    } catch (error) {
      // Error is handled by the mutation
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10 p-3"></TableHead>
              <TableHead className="p-3">
                <button
                  onClick={() => onSort?.('name')}
                  className="flex items-center hover:text-foreground"
                >
                  Category Name
                  <SortIcon field="name" sortField={sortField} sortOrder={sortOrder} />
                </button>
              </TableHead>
              <TableHead className="p-3">Description</TableHead>
              <TableHead className="p-3">
                <button
                  onClick={() => onSort?.('subcategory_count')}
                  className="flex items-center hover:text-foreground"
                >
                  Subcategories
                </button>
              </TableHead>
              <TableHead className="p-3">
                <button
                  onClick={() => onSort?.('product_count')}
                  className="flex items-center hover:text-foreground"
                >
                  Total Items
                </button>
              </TableHead>
              <TableHead className="p-3">
                <button
                  onClick={() => onSort?.('status')}
                  className="flex items-center hover:text-foreground"
                >
                  Status
                  <SortIcon field="status" sortField={sortField} sortOrder={sortOrder} />
                </button>
              </TableHead>
              <TableHead className="p-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((cat: any) => {
              const isOpen = expanded[cat.id] || false
              const subCount = cat.subcategories?.length || 0

              return (
                <React.Fragment key={cat.id}>
                  <TableRow className="hover:bg-muted/50">
                    <TableCell className="p-3">
                      {subCount > 0 && (
                        <button
                          onClick={() =>
                            setExpanded((prev: any) => ({
                              ...prev,
                              [cat.id]: !prev[cat.id],
                            }))
                          }
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {isOpen ? (
                            <ChevronDown className="size-4" />
                          ) : (
                            <ChevronRight className="size-4" />
                          )}
                        </button>
                      )}
                    </TableCell>
                    <TableCell className="p-3 font-medium">{cat.name}</TableCell>
                    <TableCell className="p-3 text-muted-foreground">
                      <TruncatedText text={cat.description} maxLength={30} />
                    </TableCell>
                    <TableCell className="p-3">{subCount || <span className="text-muted-foreground/50">-</span>}</TableCell>
                    <TableCell className="p-3">{cat.product_count || <span className="text-muted-foreground/50">-</span>}</TableCell>
                    <TableCell className="p-3">
                      <StatusBadge status={cat.status?.toLowerCase() === "active" ? "Active" : "Inactive"} />
                    </TableCell>
                    <TableCell className="p-3">
                      <div className="flex justify-end gap-2">
                        <AddSubcategoryDialog
                          parentCategoryName={cat.name}
                          trigger={
                            <button className="rounded p-1.5 hover:bg-muted" title="Add Subcategory">
                              <Plus className="size-4" />
                            </button>
                          }
                          onSave={(values: any) =>
                            createSubcategoryMutation.mutate({ parentId: cat.id, values })
                          }
                        />
                        <AddCategoryDialog
                          trigger={
                            <button
                              className="rounded p-1.5 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Edit Category"
                              disabled={updatingId === cat.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEdit(cat, false)
                              }}
                            >
                              {updatingId === cat.id ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <Edit2 className="size-4" />
                              )}
                            </button>
                          }
                          isEdit={true}
                          initialValues={{
                            name: cat.name,
                            description: cat.description,
                            status: cat.status?.toLowerCase() === "active" ? "active" : "inactive",
                            id: cat.id
                          }}
                          onSave={(values: any) => {
                            updateMutation.mutate({
                              id: cat.id,
                              values: {
                                name: values.name,
                                description: values.description,
                                status: values.status?.toLowerCase()
                              }
                            })
                          }}
                        />
                        <button
                          className="rounded p-1.5 hover:bg-muted text-destructive"
                          title="Delete"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(cat, false)
                          }}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {isOpen && cat.subcategories && cat.subcategories.length > 0 && (
                    <>
                      {cat.subcategories.map((sub: any) => (
                        <TableRow key={sub.id} className="bg-muted/20 hover:bg-muted/30">
                          <TableCell className="p-3"></TableCell>
                          <TableCell className="p-3">
                            <div className="flex items-center gap-2 pl-4 text-muted-foreground">
                              <span className="select-none">↳</span>
                              <span>{sub.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="p-3 text-muted-foreground">
                            <TruncatedText text={sub.description} maxLength={40} />
                          </TableCell>
                          <TableCell className="p-3">
                            <span className="text-muted-foreground/50">-</span>
                          </TableCell>
                          <TableCell className="p-3">{sub.product_count || <span className="text-muted-foreground/50">-</span>}</TableCell>
                          <TableCell className="p-3">
                            <StatusBadge status={sub.status?.toLowerCase() === "active" ? "Active" : "Inactive"} />
                          </TableCell>
                          <TableCell className="p-3">
                            <div className="flex justify-end gap-2">
                              <AddSubcategoryDialog
                                trigger={
                                  <button
                                    className="rounded p-1.5 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Edit Subcategory"
                                    disabled={updatingId === sub.id}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleEdit(sub, true)
                                    }}
                                  >
                                    {updatingId === sub.id ? (
                                      <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                      <Edit2 className="size-4" />
                                    )}
                                  </button>
                                }
                                parentCategoryName={cat.name}
                                isEdit={true}
                                initialValues={{
                                  name: sub.name,
                                  description: sub.description,
                                  status: sub.status?.toLowerCase() === "active" ? "Active" : "Inactive",
                                  id: sub.id
                                }}
                                onSave={(values: any) => updateMutation.mutate({
                                  id: sub.id,
                                  values: {
                                    name: values.name,
                                    description: values.description,
                                    status: values.status?.toLowerCase()
                                  }
                                })}
                              />
                              <button
                                className="rounded p-1.5 hover:bg-muted text-destructive"
                                title="Delete"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDelete(sub, true)
                                }}
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <ConfirmationDialog
        open={!!deletingItem}
        onOpenChange={(open) => {
          if (!open) setDeletingItem(null);
        }}
        title="Delete Category"
        description={`Are you sure you want to delete "${deletingItem?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText={deleteMutation.isPending ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        variant="destructive"
        confirmButtonDisabled={deleteMutation.isPending}
      />
    </>
  )
}
