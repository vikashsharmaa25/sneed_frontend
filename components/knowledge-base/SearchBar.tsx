import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function SearchBar({
    searchQuery,
    onSearchChange,
    onFilterClick,
    placeholder = "Search articles, tags, or categories..."
}: any) {
    return (
        <Card className="p-4">
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline" className="gap-2" onClick={onFilterClick}>
                    <Filter className="w-4 h-4" />
                    Filter
                </Button>
            </div>
        </Card>
    );
}
