import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning"
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
      default: "bg-primary text-primary border-transparent",
      secondary: "bg-muted text-foreground border-transparent",
      outline: "bg-transparent text-foreground border",
      success: "bg-emerald-50 text-emerald-700 border-emerald-200",
      warning: "bg-[#FFD6A7]/50 text-[#CA3500] border-[#FFD6A7]",
    }
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"
