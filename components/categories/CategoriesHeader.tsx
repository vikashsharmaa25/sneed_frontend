import React from "react"
import { Button } from "@/components/ui/button"
import { Upload, MoreHorizontal, Plus } from "lucide-react"
import { AddCategoryDialog } from "./AddCategoryDialog"

export function CategoriesHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-xl font-semibold">Manage Category</h1>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="size-4" /> Export
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <MoreHorizontal className="size-4" /> More Action
        </Button>
        <AddCategoryDialog
          trigger={
            <Button size="sm" className="text-white gap-2">
              <Plus className="size-4" /> Add Category
            </Button>
          }
        />
      </div>
    </div>
  )
}
