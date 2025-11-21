"use client"

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Package, Mail, Box, X } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'

export default function AddPackageDialog({ open, onOpenChange }: any) {
    const [selectedTab, setSelectedTab] = useState('custom')
    const [selectedPackageType, setSelectedPackageType] = useState('box')
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [dimensionUnit, setDimensionUnit] = useState('CM')
    const [packageWeight, setPackageWeight] = useState('')
    const [packageWeightUnit, setPackageWeightUnit] = useState('KG')
    const [packageName, setPackageName] = useState('')
    const [useAsDefault, setUseAsDefault] = useState(false)

    const handleAddPackage = () => {
        console.log({
            selectedTab,
            selectedPackageType,
            dimensions: { length, width, height, unit: dimensionUnit },
            weight: { value: packageWeight, unit: packageWeightUnit },
            packageName,
            useAsDefault
        })
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="">
                <DialogHeader className="border-b">
                    <DialogTitle>Add package</DialogTitle>
                    <DialogClose>
                        <X className="size-5" />
                    </DialogClose>
                </DialogHeader>

                <DialogBody className="overflow-y-auto my-scroll">
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant={selectedTab === 'custom' ? 'default' : 'outline'}
                            className={selectedTab === 'custom' ? '' : 'bg-white'}
                            onClick={() => setSelectedTab('custom')}
                        >
                            Custom package
                        </Button>
                        <Button
                            variant={selectedTab === 'carrier' ? 'default' : 'outline'}
                            className={selectedTab === 'carrier' ? '' : 'bg-white'}
                            onClick={() => setSelectedTab('carrier')}
                        >
                            Carrier package
                        </Button>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">Package type</Label>
                        <div className="grid grid-cols-3 gap-3">
                            <Button
                                variant={selectedPackageType === 'box' ? 'default' : 'outline'}
                                className={`justify-start gap-2 ${selectedPackageType === 'box' ? '' : 'bg-white'}`}
                                onClick={() => setSelectedPackageType('box')}
                            >
                                <Package className="h-4 w-4" />
                                Box
                            </Button>
                            <Button
                                variant={selectedPackageType === 'envelope' ? 'default' : 'outline'}
                                className={`justify-start gap-2 ${selectedPackageType === 'envelope' ? '' : 'bg-white'}`}
                                onClick={() => setSelectedPackageType('envelope')}
                            >
                                <Mail className="h-4 w-4" />
                                Envelope
                            </Button>
                            <Button
                                variant={selectedPackageType === 'soft' ? 'default' : 'outline'}
                                className={`justify-start gap-2 ${selectedPackageType === 'soft' ? '' : 'bg-white'}`}
                                onClick={() => setSelectedPackageType('soft')}
                            >
                                <Box className="h-4 w-4" />
                                Soft package
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">Length</Label>
                            <Input
                                type="number"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">Width</Label>
                            <Input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">Height</Label>
                            <Input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">&nbsp;</Label>
                            <Select value={dimensionUnit} onValueChange={setDimensionUnit}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CM">CM</SelectItem>
                                    <SelectItem value="IN">IN</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">Weight</Label>
                            <Input
                                type="number"
                                value={packageWeight}
                                onChange={(e) => setPackageWeight(e.target.value)}
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">&nbsp;</Label>
                            <Select value={packageWeightUnit} onValueChange={setPackageWeightUnit}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="KG">KG</SelectItem>
                                    <SelectItem value="LB">LB</SelectItem>
                                    <SelectItem value="G">G</SelectItem>
                                    <SelectItem value="OZ">OZ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                    <div className="space-y-2">
                        <Label className="text-sm text-gray-600">Package name</Label>
                        <Input
                            value={packageName}
                            onChange={(e) => setPackageName(e.target.value)}
                            placeholder="Enter package name"
                        />
                    </div>


                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="default"
                                checked={useAsDefault}
                                onChange={(e) => setUseAsDefault(e.target.checked)}
                            />
                            <label
                                htmlFor="default"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Use as default package
                            </label>
                        </div>
                        <p className="text-sm text-gray-500">
                            Used to calculate rates at checkout and pre-selected when buying labels
                        </p>
                    </div>
                </DialogBody>

                <div className="px-6">
                    <div className="h-px w-full bg-border" />
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleAddPackage}>
                        Add package
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}