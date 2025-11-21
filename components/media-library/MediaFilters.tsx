import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { MediaFiltersProps } from '@/types/interface'

export const MediaFilters = ({ filters, onFilterChange }: MediaFiltersProps) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-700">Industry</Label>
          <Select
            value={filters.industry}
            onValueChange={(value) => onFilterChange('industry', value)}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-700">File Type</Label>
          <Select
            value={filters.fileType}
            onValueChange={(value) => onFilterChange('fileType', value)}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="document">Document</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-700">Tags</Label>
          <Input
            placeholder="Filter by tag"
            value={filters.tags}
            onChange={(e) => onFilterChange('tags', e.target.value)}
            className="w-full bg-white"
          />
        </div>
      </div>
    </div>
  )
}
