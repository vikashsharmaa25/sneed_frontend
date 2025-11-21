import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export const MediaSection = () => (
  <div className="cardBg rounded-lg border">
    <div className="space-y-3 pb-1">
      <Label className="text-gray-700 font-medium block mb-4">Media</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-white">
        <Upload className="mx-auto h-8 w-8 text-blue-500 mb-3" />
        <p className="text-blue-600 font-medium">Upload files</p>
        <p className="text-gray-500 text-sm">No file chosen</p>
        <p className="text-blue-600 text-sm mt-1 cursor-pointer">Select existing</p>
        <p className="text-xs text-gray-500 mt-4">Accepts images, videos, or 3D models</p>
      </div>
    </div>
  </div>
)
