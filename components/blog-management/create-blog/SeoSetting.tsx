"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function SeoSetting({ formData, setFormData }: any) {
    return (
        <>
            <div className="cardBg rounded-lg border">
                <Label className="text-gray-700 font-medium">Seo Setting</Label>
                <div className="space-y-2 pb-1">
                    <Label className="text-gray-700 font-medium">Seo Title</Label>
                    <Input placeholder="Title" className="border-gray-300" value={formData.seoTitle} onChange={(e) => setFormData((v: any) => ({ ...v, seoTitle: e.target.value }))} />
                </div>
                <div className="space-y-2 pb-1">
                    <Label className="text-gray-700 font-medium">Seo Description</Label>
                    <Textarea placeholder="Description" className="border-gray-300" value={formData.seoDescription} onChange={(e) => setFormData((v: any) => ({ ...v, seoDescription: e.target.value }))} />
                </div>
                <div className="space-y-2 pb-1">
                    <Label className="text-gray-700 font-medium">Seo Keywords</Label>
                    <Input placeholder="Keywords" className="border-gray-300" value={formData.seoKeywords} onChange={(e) => setFormData((v: any) => ({ ...v, seoKeywords: e.target.value }))} />
                </div>
            </div>
        </>
    )
}

export default SeoSetting