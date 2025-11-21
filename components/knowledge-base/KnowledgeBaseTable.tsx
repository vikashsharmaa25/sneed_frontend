import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, User, AlertCircle, Eye, Pencil, Trash2 } from 'lucide-react';
import { TruncatedText } from '@/components/common/TruncatedText';
import { formatDate } from '@/lib/formatDate';
import { KnowledgeBaseItem } from '@/types/interface';

export const KnowledgeBaseTable: React.FC<any> = ({
    items,
    onView,
    onEdit,
    onDelete,
    totalItems = 0
}) => {
    const handleRowClick = (item: KnowledgeBaseItem) => {
        onView ? onView(item) : onEdit(item);
    };

    const handleActionClick = (e: React.MouseEvent, item: KnowledgeBaseItem, action: 'edit' | 'delete') => {
        e.stopPropagation();
        if (action === 'edit') {
            onEdit(item);
        } else if (action === 'delete') {
            onDelete(item.id);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="overflow-auto border rounded-lg">
                <Table>
                    <TableHeader className="sticky top-0 bg-white z-10">
                        <TableRow className="bg-gray-50">
                            <TableHead className="font-semibold w-[250px]">Title</TableHead>
                            <TableHead className="font-semibold w-[250px]">Summary</TableHead>
                            <TableHead className="font-semibold w-[250px]">Problem</TableHead>
                            <TableHead className="font-semibold w-[140px]">Category</TableHead>
                            <TableHead className="font-semibold w-[200px]">Tags</TableHead>
                            <TableHead className="font-semibold w-[150px]">
                                Last Updated
                            </TableHead>
                            <TableHead className="sticky right-0 bg-white shadow-[0_0_8px_rgba(0,0,0,0.05)] z-10" style={{ width: '80px' }}>
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="text-center py-8 text-gray-500"
                                >
                                    No knowledge base articles found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((item: any) => (
                                <TableRow
                                    key={item.id}
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => handleRowClick(item)}
                                >
                                    <TableCell>
                                        <div className="flex items-start gap-2">
                                            <FileText className="h-4 w-4 text-blue-500 shrink-0 mt-1" />
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    <TruncatedText text={item.title} maxLength={40} />
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                    <User className="h-3 w-3 shrink-0" />
                                                    <span>{item.author || "Sneed Coding Solutions"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <TruncatedText text={item.summary} maxLength={40} />
                                    </TableCell>

                                    <TableCell>
                                        {item.problem ? (
                                            <div className="flex items-start gap-1 text-gray-600 text-sm">
                                                <AlertCircle className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                                                <TruncatedText text={item.problem} maxLength={40} />
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-sm italic">
                                                No issue reported
                                            </span>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        <Badge variant="outline" className="text-xs">
                                            {item.category || "Uncategorized"}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {Array.isArray(item.tags) &&
                                                item.tags.slice(0, 3).map((tag: any, idx: any) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="secondary"
                                                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            {item.tags?.length > 3 && (
                                                <Badge variant="outline" className="text-gray-600 text-xs">
                                                    +{item.tags.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
                                            <span>
                                                {item.last_updated
                                                    ? formatDate(item.last_updated)
                                                    : "N/A"}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="sticky right-0 bg-white shadow-[0_0_8px_rgba(0,0,0,0.05)] z-10">
                                        <div className="flex items-center justify-center gap-1">
                                            {onView && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onView(item);
                                                    }}
                                                    title="View"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                                                onClick={(e) => handleActionClick(e, item, 'edit')}
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={(e) => handleActionClick(e, item, 'delete')}
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
