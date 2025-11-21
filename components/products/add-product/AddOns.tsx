'use client'

import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

function AddOns() {
    const [addons, setAddons] = useState([
        {
            id: 1,
            name: 'Wireless Keyboard',
            price: '$29.99',
            image: '/placeholder.jpg',
            isAdded: true
        },
        {
            id: 2,
            name: 'Wireless Keyboard',
            price: '$29.99',
            image: '/placeholder.jpg',
            isAdded: false
        },
        {
            id: 3,
            name: 'Wireless Keyboard',
            price: '$29.99',
            image: '/placeholder.jpg',
            isAdded: false
        },
        {
            id: 4,
            name: 'Wireless Keyboard',
            price: '$29.99',
            image: '/placeholder.jpg',
            isAdded: false
        },
        {
            id: 5,
            name: 'Wireless Keyboard',
            price: '$29.99',
            image: '/placeholder.jpg',
            isAdded: false
        },
        {
            id: 6,
            name: 'Wireless Keyboard',
            price: '$29.99',
            image: '/placeholder.jpg',
            isAdded: false
        }
    ])

    const toggleAddon = (id: any) => {
        setAddons(addons.map(addon =>
            addon.id === id ? { ...addon, isAdded: !addon.isAdded } : addon
        ))
    }

    const addedCount = addons.filter(addon => addon.isAdded).length

    return (
        <div className="w-full bg-white rounded-lg p-4">
            <div className="mb-4">
                <Label className="text-sm font-medium text-gray-600">Add-ons</Label>
                <p className="text-sm text-gray-500 mt-1">{addedCount} Add-on Added</p>
            </div>

            <div className="space-y-3">
                {addons.map((addon) => (
                    <div
                        key={addon.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="shrink-0 w-12 h-12 bg-white rounded border border-gray-200 overflow-hidden">
                            <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <rect x="3" y="11" width="18" height="10" rx="2" strokeWidth="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-600 truncate">
                                {addon.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-0.5">
                                {addon.price}
                            </p>
                        </div>

                        <div className="shrink-0">
                            {addon.isAdded ? (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleAddon(addon.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
                                >
                                    Remove
                                </Button>
                            ) : (
                                <Button
                                    size="sm"
                                    onClick={() => toggleAddon(addon.id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
                                >
                                    Add
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AddOns