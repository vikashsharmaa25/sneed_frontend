"use client";
import React, { useState } from "react";
import { Plus, Download, Upload, Users, CheckCircle, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "./StatsCard";
import UserTable from "./UserTable";
import { userManagementData } from "@/data/users";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { AddUserDialog } from "./AddUserDialog";
import { UserDetailsDialog } from "./UserDetailsDialog";

export default function UserManagement() {
    const [users, setUsers] = useState<any>(userManagementData.users);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<any>(null);
    const [isUserDetailsDialogOpen, setIsUserDetailsDialogOpen] = useState(false);
    const [userToView, setUserToView] = useState<any>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<any>(null);

    const stats = {
        total: users.length,
        active: users.filter((u: any) => u.status.toLowerCase() === "active").length,
        pending: users.filter((u: any) => u.status.toLowerCase() === "pending").length,
        admins: users.filter((u: any) => u.role.toLowerCase() === "admin").length,
    };

    const handleDeleteClick = (user: any) => {
        setUserToDelete(user);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            setUsers(users.filter((u: any) => u.id !== userToDelete.id));
            setUserToDelete(null);
        }
        setIsDeleteDialogOpen(false);
    };

    const handleAddUser = (newUser: any) => {
        setUsers([...users, newUser]);
    };

    const handleEditClick = (user: any) => {
        setUserToEdit(user);
        setIsEditDialogOpen(true);
    };

    const handleViewClick = (user: any) => {
        setUserToView(user);
        setIsUserDetailsDialogOpen(true);
    };

    return (
        <>
            <div className="max-w-7xl mx-auto py-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-lg font-bold">User Management</h1>
                    <div className="flex gap-3">
                        <Button variant="outline"><Download className="w-4 h-4" /> Export</Button>
                        <Button variant="outline"><Upload className="w-4 h-4" /> Import</Button>
                        <Button
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => setIsAddDialogOpen(true)}
                        >
                            <Plus className="w-4 h-4" /> Add User
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <StatsCard title="Total Users" value={stats.total} subtitle="This month" icon={Users} color="bg-purple-100 text-purple-600" />
                    <StatsCard title="Active Users" value={stats.active} subtitle="Currently online" icon={CheckCircle} color="bg-green-100 text-green-600" />
                    <StatsCard title="Pending" value={stats.pending} subtitle="Awaiting approval" icon={Clock} color="bg-yellow-100 text-yellow-600" />
                    <StatsCard title="Admins" value={stats.admins} subtitle="Full access" icon={Shield} color="bg-blue-100 text-blue-600" />
                </div>

                <div className="bg-white rounded-lg border overflow-hidden">
                    <UserTable
                        users={users}
                        onDelete={handleDeleteClick}
                        onEdit={handleEditClick}
                        onView={handleViewClick}
                    />
                </div>
            </div>

            <ConfirmationDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                title="Delete User"
                description={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
                onConfirm={handleConfirmDelete}
                confirmText="Delete"
                variant="destructive"
            />

            <AddUserDialog
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onAddUser={handleAddUser}
            />

            <UserDetailsDialog
                open={isUserDetailsDialogOpen}
                onOpenChange={setIsUserDetailsDialogOpen}
                user={userToView}
            />
        </>
    );
}
