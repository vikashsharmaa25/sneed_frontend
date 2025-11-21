import React from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

export default function Toolbar() {
  return (
    <Card className="border-muted/60">
      <CardContent className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search roles by name or description..."
            className="pl-9"
          />
        </div>
      </CardContent>
    </Card>
  )
}
