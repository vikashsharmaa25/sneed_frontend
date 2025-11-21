export const userManagementData = {
  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'active',
      lastActive: '2025-11-05T10:30:00Z',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Manager',
      status: 'active',
      lastActive: '2025-11-04T15:45:00Z',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: '3',
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
      role: 'Developer',
      status: 'inactive',
      lastActive: '2025-11-03T09:15:00Z',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      role: 'Designer',
      status: 'suspended',
      lastActive: '2025-10-30T14:20:00Z',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      id: '5',
      name: 'Michael Wilson',
      email: 'michael.w@example.com',
      role: 'Developer',
      status: 'active',
      lastActive: '2025-11-05T08:10:00Z',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    }
  ],

  roles: [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'viewer', label: 'Viewer' }
  ],

  statuses: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ]
};
