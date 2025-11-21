"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Eye, Edit, Trash2, Tag, Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { TruncatedText } from "../common/TruncatedText";
import { formatDate } from "@/lib/formatDate";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function BlogTable({
    blogs = [],
    onView,
    onDelete,
    isLoading = false,
    className
}: any) {
    const router = useRouter();
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                <p className="text-gray-600">Loading blogs...</p>
            </div>
        );
    }

    if (!isLoading && blogs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border">
                <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No blogs found</h3>
                <p className="text-gray-500 mt-1">Get started by creating a new blog post</p>
            </div>
        );
    }

    return (
        <div className={cn("bg-white rounded-lg border overflow-hidden", className)}>
            <div className="overflow-x-auto">
                <Table className="w-full">
                    <TableHeader className="bg-gray-50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="font-semibold">Title</TableHead>
                            <TableHead className="font-semibold">Content</TableHead>
                            <TableHead className="font-semibold">Url</TableHead>
                            <TableHead className="font-semibold">Tags</TableHead>
                            <TableHead className="sticky right-0 bg-gray-50 shadow-[0_0_8px_rgba(0,0,0,0.05)] z-10 w-[120px] text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {blogs.map((blog: any) => {

                            return (
                                <TableRow
                                    key={blog.id}
                                    className="group hover:bg-gray-50 transition-colors"
                                >
                                    <TableCell className="py-3">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900 group-hover:text-blue-600">
                                                <TruncatedText
                                                    text={blog.title}
                                                    maxLength={40}
                                                />
                                            </span>
                                            {blog.author && (
                                                <span className="text-xs text-gray-500 mt-1 flex items-center">
                                                    by {blog.author}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>

                                    <TableCell className="py-3">
                                        <TruncatedText
                                            text={blog.content.replace(/<[^>]*>?/gm, '')}
                                            className="text-sm text-gray-600"
                                            maxLength={60}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {blog.blogUrl && (
                                            <a
                                                href={blog.blogUrl.startsWith('http') ? blog.blogUrl : `https://${blog.blogUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-xs text-blue-600 hover:underline mt-1"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink className="h-3 w-3 mr-1" />
                                                View Post
                                            </a>
                                        )}
                                    </TableCell>

                                    <TableCell className="py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {blog.tags?.slice(0, 2).map((tag: any) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                                                >
                                                    <Tag className="h-3 w-3 mr-1" />
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {blog.tags && blog.tags.length > 2 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{blog.tags.length - 2}
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>

                                    <TableCell className="py-3 sticky right-0 bg-white shadow-[0_0_8px_rgba(0,0,0,0.05)] z-10">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onView(blog.id);
                                                }}
                                                className="h-8 w-8 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                                                title="View"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.push(`/dashboard/blog/${blog.id}`);
                                                }}
                                                className="h-8 w-8 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDelete(blog.id);
                                                }}
                                                className="h-8 w-8 text-gray-500 hover:bg-red-50 hover:text-red-600"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
