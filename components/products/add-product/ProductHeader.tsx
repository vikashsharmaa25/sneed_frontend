import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export const ProductHeader = () => (
  <div className="cardBg flex items-center justify-between rounded-lg">
    <h1 className="">Add Product</h1>
    <div className="flex items-center gap-3">
      <Button variant="outline" className="text-gray-600 bg-accent">
        Export
      </Button>
      <Button variant="outline" className="text-gray-600 flex items-center gap-2 bg-accent">
        More Action
        <ChevronDown className="h-4 w-4" />
      </Button>
      <Button className="bg-red-600 hover:bg-red-700 text-white">Add Product</Button>
    </div>
  </div>
)
