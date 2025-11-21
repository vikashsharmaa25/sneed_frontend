import React from "react";
import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, Clock, Building2, Shield } from "lucide-react";
import { X } from "lucide-react";
import { Separator } from "../ui/separator";

export function UserDetailsDialog({ open, onOpenChange, user }: any) {
    if (!user) return null;

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase();
    };

    const getStatusColor = (status: string) => {
        const statusLower = status.toLowerCase();
        if (statusLower === "active") return "bg-green-100 text-green-700";
        if (statusLower === "pending") return "bg-yellow-100 text-yellow-700";
        return "bg-gray-100 text-gray-700";
    };

    const getRoleColor = (role: string) => {
        const roleLower = role.toLowerCase();
        if (roleLower === "admin") return "bg-purple-100 text-purple-700";
        if (roleLower === "manager") return "bg-blue-100 text-blue-700";
        return "bg-gray-100 text-gray-700";
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="overflow-y-auto my-scroll">
                <DialogHeader>
                    <DialogTitle className="text-base font-semibold">User Details</DialogTitle>
                    <DialogClose><X className="size-4" /></DialogClose>
                </DialogHeader>
                <Separator />
                <DialogBody>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-semibold">
                                {getInitials(user.name)}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-base">{user.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRoleColor(user.role)}`}>
                                        {user.role}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(user.status)}`}>
                                        {user.status}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">ID: {user.id}</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm mb-3">Contact Information</h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center shrink-0">
                                        <Mail className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-500">Email Address</p>
                                        <p className="text-sm break-all">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded bg-green-50 flex items-center justify-center shrink-0">
                                        <Phone className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500">Phone Number</p>
                                        <p className="text-sm">{user.phone || "+1 (555) 123-4567"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm mb-3">Work Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-start gap-2">
                                    <Building2 className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Department</p>
                                        <p className="text-sm">{user.department}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Shield className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Access Level</p>
                                        <p className="text-sm">{user.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm mb-3">Activity Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-start gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Joined Date</p>
                                        <p className="text-sm">{user.joinDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Last Active</p>
                                        <p className="text-sm">{user.lastActive}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm mb-3">Permissions</h4>
                            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-sm">Full system access</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-sm">User management</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-sm">Settings and configuration</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-sm">View all reports and analytics</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button
                                onClick={() => onOpenChange(false)}
                                className="bg-red-800 hover:bg-red-900 text-white"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
}