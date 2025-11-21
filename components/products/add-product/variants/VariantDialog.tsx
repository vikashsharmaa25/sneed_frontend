'use client'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter, DialogBody } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import VariantForm from './VariantForm'
import { Separator } from '@/components/ui/separator'

function VariantDialog({ open, onOpenChange }: any) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Product Variant</DialogTitle>
                    <DialogClose>
                        <X className="size-5" />
                    </DialogClose>
                </DialogHeader>

                <Separator />

                <DialogBody>
                    <VariantForm />
                </DialogBody>
                <DialogFooter>
                    <div className="space-x-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button onClick={() => onOpenChange(false)}>Add</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default VariantDialog