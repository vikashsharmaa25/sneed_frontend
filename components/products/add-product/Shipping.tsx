"use client"

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import AddPackageDialog from './AddPackageDialog'

export default function Shipping() {
    const [weight, setWeight] = useState('0.0')
    const [weightUnit, setWeightUnit] = useState('LB')
    const [packageType, setPackageType] = useState('Store default • Bubble Mailer - 11 × 8 × 1 in, 0.05 lb')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <div className="cardBg rounded-lg border">
            <div className="space-y-6">
                <Label className="text-gray-700 font-medium">Shipping</Label>
                <div className="space-y-3">
                    <Label htmlFor="product-type" className="text-sm font-medium text-gray-700">
                        Physical product
                    </Label>
                    <Input
                        id="product-type"
                        value="Physical product"
                        className="bg-gray-50 text-gray-600"
                        readOnly
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="package" className="text-sm font-medium text-gray-700">
                                Package
                            </Label>
                            <Button variant="ghost" size="icon" className="h-5 w-5 p-0" onClick={() => setIsDialogOpen(true)}>
                                <PlusCircle className="h-4 w-4 text-blue-600" />
                            </Button>
                        </div>

                        <AddPackageDialog
                            open={isDialogOpen}
                            onOpenChange={setIsDialogOpen}
                        />

                        <Select value={packageType} onValueChange={setPackageType}>
                            <SelectTrigger id="package" className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Store default • Bubble Mailer - 11 × 8 × 1 in, 0.05 lb">
                                    Store default • Bubble Mailer - 11 × 8 × 1 in, 0.05 lb
                                </SelectItem>
                                <SelectItem value="Small Box - 6 × 4 × 2 in, 0.10 lb">
                                    Small Box - 6 × 4 × 2 in, 0.10 lb
                                </SelectItem>
                                <SelectItem value="Medium Box - 12 × 9 × 6 in, 0.25 lb">
                                    Medium Box - 12 × 9 × 6 in, 0.25 lb
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
                            Product weight
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                id="weight"
                                type="number"
                                step="0.1"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="flex-1"
                            />
                            <Select value={weightUnit} onValueChange={setWeightUnit}>
                                <SelectTrigger className="w-24">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LB">LB</SelectItem>
                                    <SelectItem value="KG">KG</SelectItem>
                                    <SelectItem value="OZ">OZ</SelectItem>
                                    <SelectItem value="G">G</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                        Country
                    </Button>
                    <Button
                        variant="secondary"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                        HS Code
                    </Button>
                </div>
            </div>
        </div>
    )
}