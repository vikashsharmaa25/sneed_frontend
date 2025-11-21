import React from "react"
import { Card, CardContent } from "@/components/ui/card"

export function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="mt-1 text-2xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  )
}
