import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const DescriptionSection = () => (
  <div className="cardBg rounded-lg border">
    <div className="space-y-3 pb-1">
      <div className="flex items-center justify-between">
        <Label className="text-gray-700 font-medium">Description</Label>
        <div className="w-5 h-5 rounded bg-purple-500 flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
      </div>
      <Textarea placeholder="Enter product description" rows={4} className="border-gray-300" />
    </div>
  </div>
)
