"use client";
import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function UserTable({ users, onEdit, onDelete, onView }: any) {
    const getInitials = (name: string) =>
        name.split(" ").map(n => n[0]).join("").toUpperCase();

    const getAvatarColor = (id: string) => {
        const colors = [
            'bg-teal-500', 'bg-teal-600', 'bg-teal-700',
            'bg-emerald-500', 'bg-cyan-500', 'bg-blue-500',
        ];
        return colors[parseInt(id) % colors.length];
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'Admin': return 'bg-purple-100 text-purple-700';
            case 'Manager': return 'bg-blue-100 text-blue-700';
            case 'User': return 'bg-cyan-100 text-cyan-700';
            case 'Viewer': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700';
            case 'Inactive': return 'bg-gray-100 text-gray-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user: any) => (
                    <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full ${getAvatarColor(user.id)} flex items-center justify-center text-white font-medium text-sm`}>
                                    {getInitials(user.name)}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">ID: {user.id}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="text-sm text-gray-900">{user.email}</div>
                            <div className="text-sm text-gray-500">{user.phone}</div>
                        </TableCell>
                        <TableCell>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                                {user.role}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(user.status)}`}>
                                {user.status}
                            </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{user.department}</TableCell>
                        <TableCell className="text-sm text-gray-600">{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                                <button
                                    className="p-2 hover:bg-gray-100 rounded"
                                    onClick={() => onView(user)}
                                    aria-label="View user"
                                >
                                    <Eye className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                    className="p-2 hover:bg-gray-100 rounded"
                                    onClick={() => onEdit(user)}
                                    aria-label="Edit user"
                                >
                                    <Pencil className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                    className="p-2 hover:bg-gray-100 rounded text-red-600 hover:text-red-700"
                                    onClick={() => onDelete(user)}
                                    aria-label="Delete user"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
