"use client";

import { useState } from "react";
import { BlogHeader } from "./BlogHeader";
import { BlogSearch } from "./BlogSearch";
import { BlogTable } from "./BlogTable";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBlog, getBlogs } from "@/apis/all-apis";
import { TableSkeleton } from "../Skelton";
import { Pagination } from "../common/Pagination";
import { ConfirmationDialog } from "../common/ConfirmationDialog";

export default function BlogMain() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const { data: blogsData, isLoading } = useQuery({
        queryKey: ["blogs", currentPage, pageSize],
        queryFn: () =>
            getBlogs({
                page: currentPage,
                limit: pageSize,
            }),
    });
    const totalItems = blogsData?.total_count;
    const totalPages = Math.ceil(totalItems / pageSize);

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteBlog(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success("Blog deleted successfully");
            setBlogToDelete(null);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete blog");
        },
    });

    const handleDeleteClick = (id: string) => {
        setBlogToDelete(id);
    };

    const handleConfirmDelete = () => {
        if (blogToDelete) {
            deleteMutation.mutate(blogToDelete);
        }
    };

    if (isLoading) return <TableSkeleton />;

    return (
        <div>
            <BlogHeader />

            <BlogSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onFilterChange={setFilter}
                onSearch={() => setCurrentPage(1)}
            />

            <BlogTable
                blogs={blogsData?.data || []}
                onEdit={(id: string) => toast(`Editing ${id}`)}
                onView={(id: string) => toast(`Viewing ${id}`)}
                onDelete={handleDeleteClick}
            />

            <ConfirmationDialog
                open={!!blogToDelete}
                onOpenChange={(open) => !open && setBlogToDelete(null)}
                title="Delete Blog Post"
                description="Are you sure you want to delete this blog post? This action cannot be undone."
                onConfirm={handleConfirmDelete}
                confirmText={deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                cancelText="Cancel"
                variant="destructive"
                confirmButtonDisabled={deleteMutation.isPending}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={(page) => setCurrentPage(page)}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setCurrentPage(1);
                }}
            />
        </div>
    );
}
