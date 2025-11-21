"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function SearchEngineListing() {
    return (
        <div className="cardBg rounded-lg border">
            <div className="space-y-6">
                <Label className="text-gray-700 font-medium">Search Engine Listing</Label>
            </div>
            <p className="text-gray-700 text-sm">Add a title and description to see how this product might appear in a search engine listing</p>
            <div className="space-y-4 mt-2">
                <div className="flex gap-2">
                    <Input
                        id="title"
                        type="text"
                        placeholder="Enter title here"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="keyword" className="text-sm text-gray-500">
                        Keyword
                    </Label>
                    <Input
                        id="keyword"
                        type="text"
                        placeholder="Enter keyword here"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="description" className="text-sm text-gray-500">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="Enter description here"
                        rows={3}
                        className="min-h-[60px]"
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchEngineListing