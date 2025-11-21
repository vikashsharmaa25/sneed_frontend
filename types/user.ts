export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: UserStatus;
  department: string;
  lastActive: string;
  avatar?: string;
}

export interface UserFormData extends Omit<User, 'id' | 'lastActive'> {}

export interface UsersToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onAddUser: () => void;
}

export interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onView: (userId: string) => void;
}

export interface UserFormProps {
  user?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (user: UserFormData) => void;
}
