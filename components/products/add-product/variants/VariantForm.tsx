'use client'

import React, { useState } from 'react'
import { X, Upload, Trash2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function VariantForm() {
    const [variants, setVariants] = useState([
        { id: 1, name: '', price: '0.00', image: null },
        { id: 2, name: '', price: '0.00', image: null },
        { id: 3, name: '', price: '0.00', image: null }
    ])
    const [optionName, setOptionName] = useState('')

    const addVariant = () => {
        setVariants([...variants, {
            id: Date.now(),
            name: '',
            price: '0.00',
            image: null
        }])
    }

    const removeVariant = (id: any) => {
        if (variants.length > 1) {
            setVariants(variants.filter(v => v.id !== id))
        }
    }

    const updateVariant = (id: any, field: any, value: any) => {
        setVariants(variants.map(v =>
            v.id === id ? { ...v, [field]: value } : v
        ))
    }

    return (
        <>
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Option Name</Label>
                    <Input
                        placeholder="Option Name"
                        value={optionName}
                        onChange={(e) => setOptionName(e.target.value)}
                        className="w-full"
                    />
                </div>

                <div className="space-y-4">
                    {variants.map((variant, index) => (
                        <div key={variant.id} className="grid grid-cols-[100px_1fr_140px_40px] gap-4 items-center">
                            <div>
                                {index === 0 && (
                                    <Label className="text-xs font-medium text-gray-700">Variant Image</Label>
                                )}
                                <div className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer bg-gray-50">
                                    <Upload className="h-5 w-5 text-gray-400 mb-1" />
                                    <span className="text-xs text-blue-600 font-medium">upload image</span>
                                </div>
                            </div>

                            <div>
                                {index === 0 && (
                                    <Label className="text-xs font-medium text-gray-700">
                                        Variant Name <span className="text-red-500">*</span>
                                    </Label>
                                )}
                                <Input
                                    placeholder="e.g., Red - Large, 128GB"
                                    value={variant.name}
                                    onChange={(e) => updateVariant(variant.id, 'name', e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                {index === 0 && (
                                    <Label className="text-xs font-medium text-gray-700">
                                        Price <span className="text-red-500">*</span>
                                    </Label>
                                )}
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <Input
                                        type="text"
                                        value={variant.price}
                                        onChange={(e) => updateVariant(variant.id, 'price', e.target.value)}
                                        className="w-full pl-7"
                                    />
                                </div>
                            </div>

                            <div>
                                {index === 0 && <div className="h-6"></div>}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeVariant(variant.id)}
                                    disabled={variants.length === 1}
                                    className="h-10 w-10 text-gray-400 hover:text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default VariantForm