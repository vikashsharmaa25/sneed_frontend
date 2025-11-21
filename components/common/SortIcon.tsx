import React from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

interface SortIconProps {
  field: string
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  className?: string
}

export function SortIcon({ field, sortField, sortOrder, className = "size-4 ml-1 inline-block" }: SortIconProps) {
  if (sortField !== field) {
    return <ArrowUpDown className={className} />
  }
  
  return sortOrder === 'asc' 
    ? <ArrowUp className={className} /> 
    : <ArrowDown className={className} />
}
