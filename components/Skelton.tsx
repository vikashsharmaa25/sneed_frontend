"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function RoleCardSkeleton() {
  return (
    <div className="border border-muted/60 rounded-lg p-5 space-y-4 bg-white">
      <div className="flex items-start gap-3">
        {/* Icon Box */}
        <Skeleton className="h-10 w-11 rounded-xl" />

        <div className="flex-1 space-y-2">
          {/* Title */}
          <Skeleton className="h-4 w-32" />
          {/* Description */}
          <Skeleton className="h-3 w-56" />

          {/* Tags */}
          <div className="mt-3 flex gap-2">
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-5 w-14 rounded-md" />
          </div>

          {/* Users & Permissions */}
          <div className="mt-4 flex gap-6">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      {/* Separator */}
      <Skeleton className="w-full" />

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}

// Skeleton for the header section
export function CategoriesHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Skeleton className="h-7 w-48" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
  )
}

// Skeleton for stat cards
export function StatCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-8 w-16" />
    </div>
  )
}

// Skeleton for the category table
export function CategoryTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10 p-3">
              <Skeleton className="h-4 w-4" />
            </TableHead>
            <TableHead className="p-3">
              <Skeleton className="h-4 w-32" />
            </TableHead>
            <TableHead className="p-3">
              <Skeleton className="h-4 w-24" />
            </TableHead>
            <TableHead className="p-3">
              <Skeleton className="h-4 w-28" />
            </TableHead>
            <TableHead className="p-3">
              <Skeleton className="h-4 w-24" />
            </TableHead>
            <TableHead className="p-3">
              <Skeleton className="h-4 w-16" />
            </TableHead>
            <TableHead className="p-3 text-right">
              <Skeleton className="h-4 w-16 ml-auto" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index} className="hover:bg-muted/50">
              <TableCell className="p-3">
                <Skeleton className="h-4 w-4" />
              </TableCell>
              <TableCell className="p-3">
                <Skeleton className="h-5 w-40" />
              </TableCell>
              <TableCell className="p-3">
                <Skeleton className="h-4 w-full max-w-[200px]" />
              </TableCell>
              <TableCell className="p-3">
                <Skeleton className="h-4 w-8" />
              </TableCell>
              <TableCell className="p-3">
                <Skeleton className="h-4 w-8" />
              </TableCell>
              <TableCell className="p-3">
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>
              <TableCell className="p-3">
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Skeleton for pagination
export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-32" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-20" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  )
}

// Combined skeleton for the entire categories page
export function CategoriesPageSkeleton() {
  return (
    <div className="space-y-4">
      <CategoriesHeaderSkeleton />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      <CategoryTableSkeleton rows={8} />
      <PaginationSkeleton />
    </div>
  )
}

// Skeleton for table page
export function TableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-6 w-32" />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10 p-3">
              <Skeleton className="h-4 w-4" />
            </TableHead>
            <TableHead className="p-3">
              <Skeleton className="h-4 w-full" />
            </TableHead>
            <TableHead className="p-3">
              <Skeleton className="h-4 w-full" />
            </TableHead>
            <TableHead className="p-3">
              <Skeleton className="h-4 w-full" />
            </TableHead>
            <TableHead className="p-3">
              <Skeleton className="h-4 w-full" />
            </TableHead>
            <TableHead className="p-3">
              <Skeleton className="h-4 w-full" />
            </TableHead>
            <TableHead className="p-3 text-right">
              <Skeleton className="h-4 w-16 ml-auto" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 12 }).map((_, index) => (
            <TableRow key={index} className="hover:bg-muted/50">
              <TableCell className="p-3">
                <Skeleton className="h-4 w-4" />
              </TableCell>
              <TableCell className="p-3">
                <Skeleton className="h-5 w-full" />
              </TableCell>
              <TableCell className="p-3">
                <Skeleton className="h-4 w-full max-w-[200px]" />
              </TableCell>
              <TableCell className="p-3">
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell className="p-3">
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell className="p-3">
                <Skeleton className="h-6 w-full rounded-full" />
              </TableCell>
              <TableCell className="p-3">
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-6 w-full rounded" />
                  <Skeleton className="h-6 w-full rounded" />
                  <Skeleton className="h-6 w-full rounded" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
