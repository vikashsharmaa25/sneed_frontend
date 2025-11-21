import { LucideIcon } from "lucide-react"

export type Category = {
  id: number
  name: string
  description?: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  subcategory_count: string
  product_count: string
  parent_id: number | null
}

export type CategoriesApiResponse = {
  total_count: number
  data: Category[]
  total_categories: number
  active_categories: number
  sub_categories: number
  total_items: number
}

export type AddCategoryForm = {
  name: string
  description: string
  status: "Active" | "Inactive"
}

export type Role = {
  id: string
  name: string
  system?: boolean
  description: string
  color: "violet" | "green" | "sky" | "orange" | "slate"
  users: number
  permissions: number
  tags: { label: string; count: number; permissions?: string[] }[]
  allPermissions?: string[]
}

export type StatCard = {
  id: string
  label: string
  value: number
  sublabel: string
  icon: LucideIcon
  accent: string
}

export interface RolePermissions {
  modules: {
    [moduleName: string]: {
      count: number
      permissions: string[]
    }
  }
  total_permissions_count: number
}

export interface Permission {
  id: string
  name: string
  module: string
  // Add other permission properties as needed
}

export type ApiRoleResponse = Permission[] | {
  role_permissions: {
    [roleName: string]: RolePermissions
  }
  total_users: number
  total_permissions: number
  total_roles: number
}

export interface RoleGridProps {
  data?: ApiRoleResponse
  isLoading: boolean
  error: Error | null
}

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  status: "Active" | "Draft" | "Archived"
  inventory: number
  salesChannels: string
  markets: string
  b2bCatalogs: string
  type: string
  vendor: string
  image: string
}

export interface ProductTableProps {
  products: Product[]
}
export interface StatCardProps {
  label: string
  value: string
}
export interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export interface CategoriesPageProps {
  data?: CategoriesApiResponse
  isLoading: boolean
  error: Error | null
  onSort: (field: string) => void
  sortField?: string
  sortOrder?: 'asc' | 'desc'
}
export interface CategoriesHeaderProps { }
export interface CategoryWithSubcategories extends Category {
  subcategories?: Category[]
}

export interface TruncatedTextProps {
  text: string | null | undefined
  maxLength?: number
  className?: string
  emptyPlaceholder?: string
}

export interface SubcategoryForm {
  name: string
  description: string
  status: "Active" | "Inactive"
}

export type ConfirmationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
  confirmButtonDisabled?: boolean
}

export interface MediaItem {
  id: number
  image: string
  category: string
  title: string
  description: string
  tags: string[]
  date: string
}

export interface MediaItem {
  id: number
  image: string
  category: string
  title: string
  description: string
  tags: string[]
  date: string
}

export interface MediaFiltersProps {
  filters: {
    industry: string
    fileType: string
    tags: string
    dateFrom: string
    dateTo: string
  }
  onFilterChange: (key: string, value: string) => void
}

export interface MediaCardProps {
  item: {
    id: number
    image: string
    category: string
    title: string
    description: string
    tags: string[]
    date: string
  }
  onRemove: (id: number) => void
}

export interface MediaSearchBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export interface MediaViewControlsProps {
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
}

export interface RoleCardProps {
  role?: Partial<Role>
}

export interface RoleData {
  id: string
  name: string
  description: string
  color: string
  system: boolean
  users: number
  permissions: number
  tags: Array<{
    label: string
    count: number
  }>
}

export interface InternalNotes {
  internal_tags: string[];
  confidence_score: number;
}

export interface KnowledgeBaseItem {
  id: string;
  title: string;
  summary: string;
  problem: string;
  solution: string | string[];
  category: string;
  tags: string[];
  language: string;
  last_updated: string;
  author: string;
  file_key?: string;
  related_info: any[];
  region: string[];
  internal_notes?: InternalNotes;
}

export interface KnowledgeBaseTableProps {
  items: KnowledgeBaseItem[];
  onEdit: (item: KnowledgeBaseItem) => void;
  onDelete: (id: string) => void;
  totalItems?: number;
}

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
}

export interface KnowledgeBaseHeaderProps {
  onAddNew: () => void;
}
