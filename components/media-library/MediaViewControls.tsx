import { Grid3x3, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MediaViewControlsProps } from '@/types/interface'

export const MediaViewControls = ({ viewMode, onViewModeChange }: MediaViewControlsProps) => {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <Button
        variant={viewMode === 'grid' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onViewModeChange('grid')}
        aria-label="Grid view"
      >
        <Grid3x3 className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === 'list' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onViewModeChange('list')}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}
