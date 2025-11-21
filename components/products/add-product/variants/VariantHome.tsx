"use client"

import { Label } from '@/components/ui/label'
import VariantDialog from './VariantDialog'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'

function VariantHome() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    return (
        <>
            <div className="cardBg rounded-lg border">
                <div className="flex items-center gap-2">
                    <Label className="text-gray-700 font-medium">Variants</Label>
                    <Button variant="ghost" size="icon" className="h-5 w-5 p-0" onClick={() => setIsDialogOpen(true)}>
                        <PlusCircle className="h-4 w-4 text-blue-600" />
                    </Button>
                </div>
                <p className="text-gray-700 text-sm mt-2">Add variant like size and color etc</p>
            </div>
            <VariantDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
    )
}

export default VariantHome