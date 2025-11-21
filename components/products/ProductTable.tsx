"use client"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductTableProps } from "@/types/interface"


export const ProductTable = ({ products }: ProductTableProps) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">
                        </TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Inventory</TableHead>
                        <TableHead>Sales channels</TableHead>
                        <TableHead>Markets</TableHead>
                        <TableHead>B2B catalogs</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Vendor</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <Checkbox />
                            </TableCell>
                            <TableCell>
                                <div className="w-10 h-10 rounded-md bg-linear-to-br from-primary/20 to-primary/40 flex items-center justify-center text-lg">
                                    {product.image}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-muted-foreground">{product.sku}</div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={product.status === "Active" ? "secondary" : "outline"}
                                    className={product.status !== "Active" ? "bg-orange-50 text-orange-700 border-orange-200" : ""}
                                >
                                    {product.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="font-medium">{product.inventory}</TableCell>
                            <TableCell className="text-muted-foreground">{product.salesChannels}</TableCell>
                            <TableCell className="text-muted-foreground">{product.markets}</TableCell>
                            <TableCell className="text-muted-foreground">{product.b2bCatalogs}</TableCell>
                            <TableCell className="text-muted-foreground">{product.category}</TableCell>
                            <TableCell className="text-muted-foreground">{product.type}</TableCell>
                            <TableCell className="text-muted-foreground">{product.vendor}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
