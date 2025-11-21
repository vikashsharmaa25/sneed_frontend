"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { StatCardProps } from "@/types/interface"

const StatCard = ({ label, value }: StatCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <p className="text-xs text-muted-foreground">{label}</p>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-semibold">{value}</p>
    </CardContent>
  </Card>
)

export const ProductStats = () => {
  const stats = [
    { label: "Average sell-through rate", value: "5" },
    { label: "Products by days of inventory remaining", value: "4" },
    { label: "ABC product analysis", value: "14" },
    { label: "Total items", value: "830" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 cardBg mb-2">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
