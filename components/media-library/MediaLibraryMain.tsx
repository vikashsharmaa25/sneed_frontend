'use client'

import React, { useState } from 'react'
import { MediaCard } from './MediaCard'
import { MediaFilters } from './MediaFilters'
import { MediaSearchBar } from './MediaSearchBar'
import { MediaViewControls } from './MediaViewControls'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'
import { MediaItem } from '@/types/interface'
import MediaLibraryDialog from './MediaLibraryDialog'

export function MediaLibraryMain() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [searchQuery, setSearchQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [filters, setFilters] = useState({
        industry: 'all',
        fileType: 'all',
        tags: '',
        dateFrom: 'all',
        dateTo: 'all'
    })

    const [mediaItems, setMediaItems] = useState<MediaItem[]>([
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=400',
            category: 'Electronics',
            title: 'Batch Code Printers',
            description: 'If you\'re looking to add batch codes to your products, Sneed Coding Solutions is your full batch-coding machines',
            tags: ['Sneed', 'Inkjet', 'Printer'],
            date: '11/5/2025'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400',
            category: 'Manufacturing',
            title: 'Industrial Label Printers',
            description: 'Heavy-duty label printers for industrial environments',
            tags: ['Industrial', 'Label', 'Printing'],
            date: '11/4/2025'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400',
            category: 'Retail',
            title: 'POS Printers',
            description: 'High-speed receipt printers for point of sale systems',
            tags: ['Retail', 'POS', 'Receipt'],
            date: '11/3/2025'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400',
            category: 'Warehouse',
            title: 'Barcode Scanners',
            description: 'Wireless barcode scanners for inventory management',
            tags: ['Barcode', 'Scanner', 'Inventory'],
            date: '11/2/2025'
        }
    ])

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleRemoveItem = (id: number) => {
        setMediaItems(prev => prev.filter(item => item.id !== id))
    }

    const filteredItems = mediaItems.filter(item => {
        const matchesSearch = searchQuery === '' ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesIndustry = filters.industry === 'all' ||
            item.category.toLowerCase() === filters.industry.toLowerCase()
        const matchesFileType = filters.fileType === 'all'
        const matchesTags = !filters.tags ||
            item.tags.some(tag => tag.toLowerCase().includes(filters.tags.toLowerCase()))

        return matchesSearch && matchesIndustry && matchesFileType && matchesTags
    })

    return (
        <>
            <div className='cardBg rounded-xl'>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Media Library</h1>
                        <p className="text-sm text-gray-500">Manage and organize your media files</p>
                    </div>
                    <Button onClick={() => setOpen(true)} className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Media
                    </Button>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <MediaSearchBar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                    <MediaViewControls
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                    />
                </div>

                <MediaFilters filters={filters} onFilterChange={handleFilterChange} />
            </div>

            <div className='mt-5'>
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredItems.map((item) => (
                            <MediaCard
                                key={item.id}
                                item={item}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-start gap-4">
                                <div className="w-32 h-24 bg-gray-100 rounded overflow-hidden shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded mb-2">
                                                {item.category}
                                            </span>
                                            <h3 className="text-base font-semibold text-gray-900 mb-1">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {item.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {item.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {item.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="h-8 w-8 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No media found</h3>
                        <p className="text-sm text-gray-500">
                            Try adjusting your search or filter to find what you're looking for.
                        </p>
                    </div>
                )}
            </div>

            <div>
                <MediaLibraryDialog open={open} setOpen={setOpen} />
            </div>
        </>
    )
}

export default MediaLibraryMain