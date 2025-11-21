'use client'

import React, { useState } from "react"
import CategoriesPage from "@/components/categories/CategoriesPage"
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/apis/all-apis";
import type { CategoriesApiResponse } from "@/types/interface";

export default function Page() {
    const [sortField, setSortField] = useState<string>('created_at')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

    const { data: categoriesData, isLoading, error } = useQuery<CategoriesApiResponse>({
        queryKey: ["categories", sortField, sortOrder],
        queryFn: () => getCategories({
            sort_by: sortField,
            sort_order: sortOrder,
        }),
    });

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortOrder('asc')
        }
    }

    return (
        <>
            <CategoriesPage
                data={categoriesData}
                isLoading={isLoading}
                error={error}
                onSort={handleSort}
                sortField={sortField}
                sortOrder={sortOrder}
            />
        </>
    )
}
