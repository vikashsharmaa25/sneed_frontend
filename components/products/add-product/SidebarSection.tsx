import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const SidebarSection = () => (
    <div className="space-y-2">
        <CategorySection />
        <StatusSection />
        <SalesChannelsSection />
        <OrganizationSection />
    </div>
)

const StatusSection = () => (
    <div className="cardBg rounded-lg border">
        <div className="space-y-2 pb-1">
            <Label className="text-gray-700 font-medium">Status</Label>
            <div className="border border-gray-300 rounded px-3 py-2 bg-gray-50">
                <p className="text-gray-700">Active</p>
            </div>
        </div>
    </div>
)

const SalesChannelsSection = () => (
    <div className="cardBg rounded-lg border">
        <div className="space-y-2 pb-1">
            <Label className="text-gray-700 font-medium">Sales channels</Label>
            <div className="space-y-2 text-sm">
                <p className="text-gray-700">Online Store</p>
                <p className="text-gray-700">Point of Sale</p>
            </div>
        </div>
    </div>
)

const CategorySection = () => (
    <div className="cardBg rounded-lg border">
        <div className="space-y-2 pb-1">
            <Label className="text-gray-700 font-medium">Category</Label>
            <Select>
                <SelectTrigger className="w-full border-gray-300">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="home">Home & Living</SelectItem>
                </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-2">Select Category</p>
            <Select>
                <SelectTrigger className="w-full border-gray-300">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="cat1">Category 1</SelectItem>
                    <SelectItem value="cat2">Category 2</SelectItem>
                </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
                Determines tax rates and adds metadata to improve search, filters, and cross-channel sales
            </p>
        </div>
    </div>
)

const OrganizationSection = () => (
    <div className="cardBg rounded-lg border">
        <div className="space-y-2 pb-1">
            <Label className="text-gray-700 font-medium">Organization</Label>

            {["Product type", "Vendor", "Collections", "Tags"].map((label) => (
                <div key={label} className="space-y-2">
                    <span className="text-sm text-gray-600">{label}</span>
                    <Input placeholder="" className="border-gray-300" />
                </div>
            ))}
        </div>
    </div>
)
