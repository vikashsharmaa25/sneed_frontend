"use client"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import JoditTextEditor from '@/components/JoditEditor'
import { Textarea } from '@/components/ui/textarea'

function CreateBlogBasicInfo({ formData, setFormData }: any) {
    return (
        <div className="space-y-2">
            <div className="cardBg rounded-lg border">
                <div className="space-y-2 pb-1" key="title">
                    <Label className="text-gray-700 font-medium">Title</Label>
                    <Input placeholder="Title" className="border-gray-300" value={formData.title} onChange={(e) => setFormData((v: any) => ({ ...v, title: e.target.value }))} />
                </div>
            </div>

            <div className="cardBg rounded-lg border" key="content">
                <JoditTextEditor value={formData.content} onChange={(value: any) => setFormData((v: any) => ({ ...v, content: value }))} />
            </div>

            <div className="cardBg rounded-lg border">
                <div className="space-y-2 pb-1" key="excrept">
                    <Label className="text-gray-700 font-medium">Excrept</Label>
                    <Textarea placeholder="Excrept" className="border-gray-300" value={formData.excrept} onChange={(e) => setFormData((v: any) => ({ ...v, excrept: e.target.value }))} />
                </div>
            </div>
        </div>
    )
}

export default CreateBlogBasicInfo