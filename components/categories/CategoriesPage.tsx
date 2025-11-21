"use client"

import React from "react"
import { CategoriesHeader } from "./CategoriesHeader"
import { StatCard } from "./StatCard"
import { CategoryTable } from "./CategoryTable"
import { Pagination } from "@/components/common/Pagination"
import type { CategoriesPageProps } from "@/types/interface"
import { transformCategoriesToHierarchy } from "@/lib/category-utils"
import { CategoriesPageSkeleton } from "../Skelton"

export default function CategoriesPage({
  data,
  isLoading,
  error,
  onSort,
  sortField,
  sortOrder
}: CategoriesPageProps) {

  if (isLoading) {
    return <CategoriesPageSkeleton />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-destructive">Error: {error.message}</div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  const hierarchicalData = React.useMemo(() => {
    return transformCategoriesToHierarchy(data.data)
  }, [data.data])

  return (
    <div className="space-y-4">
      <CategoriesHeader />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Categories" value={data.total_count} />
        <StatCard label="Active Categories" value={data.active_categories} />
        <StatCard label="Sub Categories" value={data.sub_categories} />
        <StatCard label="Total Items" value={data.total_items} />
      </div>
      <div className="rounded-md border">
        <CategoryTable 
          data={hierarchicalData} 
          onSort={onSort}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      </div>
    </div>
  )
}
