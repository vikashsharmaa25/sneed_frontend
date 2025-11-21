import React from "react"

export function StatusBadge({ status = "Active" }: { status?: "Active" | "Inactive" }) {
  const cls = status === "Active" ? "bg-muted text-foreground" : "bg-destructive/10 text-destructive"
  return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs ${cls}`}>{status}</span>
}
