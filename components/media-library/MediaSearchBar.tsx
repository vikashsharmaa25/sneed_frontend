import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { MediaSearchBarProps } from '@/types/interface'

export const MediaSearchBar = ({ searchQuery, onSearchChange }: MediaSearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search media..."
          className="pl-10 pr-4 py-2 w-full"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  )
}
