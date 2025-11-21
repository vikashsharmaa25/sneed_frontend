"use client";

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export function BlogSearch({
    searchQuery,
    onSearchChange,
    onFilterChange,
    onSearch,
}: any) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search posts by title, author, or content..."
                    className="pl-10 pr-4 py-2 w-full"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                />
            </div>
            <div className="flex gap-2">
                <Link href="/dashboard/blog/add-blog">
                    <Button className='bg-blue-600 text-white hover:bg-blue-700 hover:text-white'>
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Button>
                </Link>
            </div>
        </div>
    );
}