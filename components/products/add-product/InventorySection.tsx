import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const InventorySection = () => (
  <div className="cardBg rounded-lg border">
    <div className="space-y-4 pb-1">
      <Label className="text-gray-700 font-medium">Inventory</Label>

      <div className="space-y-2">
        <span className="text-sm text-gray-600">Inventory tracked</span>
        <div className="border border-gray-300 rounded px-3 py-2 bg-gray-50">
          <Input placeholder="Inventory tracked" className="border-0 bg-transparent p-0" />
        </div>
        <p className="text-xs text-gray-500">Inventory will be stocked at</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-gray-600 block mb-2">Location</span>
          <Select>
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="SCS HQ - Gosling" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="loc1">SCS HQ - Gosling</SelectItem>
              <SelectItem value="loc2">Warehouse 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <span className="text-sm text-gray-600 block mb-2">Quantity</span>
          <Input type="number" placeholder="0" className="border-gray-300" />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        {['SKU', 'Barcode', 'Sell when out of stock (off)'].map((label) => (
          <Button key={label} variant="outline" size="sm" className="text-gray-600 bg-transparent">
            {label}
          </Button>
        ))}
      </div>
    </div>
  </div>
)
