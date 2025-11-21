'use client'

import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger, DialogBody, DialogClose, DialogHeader } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import MediaLibraryForm from './MediaLibraryForm'

function MediaLibraryDialog({ open, setOpen }: any) {
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='max-w-[800px] mx-auto overflow-y-scroll my-scroll'>
                    <DialogHeader>
                        <DialogTitle>Upload Media</DialogTitle>
                        <DialogClose>
                            <X className="size-5" />
                        </DialogClose>
                    </DialogHeader>

                    <Separator />

                    <DialogBody>
                        <MediaLibraryForm open={open} setOpen={setOpen} />
                    </DialogBody>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default MediaLibraryDialog