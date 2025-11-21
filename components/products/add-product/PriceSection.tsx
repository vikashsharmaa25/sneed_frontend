import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export const PriceSection = () => (
  <div className="cardBg rounded-lg border">
    <div className="space-y-4 pb-1">
      <Label className="text-gray-700 font-medium">Price</Label>
      <div className="space-y-2">
        <span className="text-sm text-gray-600">Price</span>
        <Input type="number" placeholder="0.00" className="border-gray-300" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {['Compare at', 'Unit price', 'Cost Per Item', 'Profit', 'Margin'].map((label) => (
          <Button key={label} variant="outline" size="sm" className="text-gray-600 bg-transparent">
            {label}
          </Button>
        ))}
      </div>
    </div>
  </div>
)
