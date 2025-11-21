"use client"
import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Home,
    ShoppingCart,
    FolderKanban,
    Package,
    Users,
    FileText,
    CreditCard,
    BarChart3,
    Megaphone,
    Tag,
    Shield,
    LogOut,
    User,
    ChevronDown,
    Settings,
    User as UserIcon,
    HelpCircle,
    BookOpen,
    UploadIcon
} from "lucide-react"
import Image from "next/image"
import Logo from "@/public/images/logo.png"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = () => {
        // Add your logout logic here
        // Example: router.push('/login')
    }

    const isOn = (href: string, { exact = false }: { exact?: boolean } = {}) => {
        if (exact) return pathname === href
        return pathname === href || pathname.startsWith(href + "/")
    }

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <div className="px-2 py-1 text-sm font-semibold">
                        <Image src={Logo} alt="Sneed Dashboard" width={150} height={20} className="object-contain" />
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Main</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Home" isActive={isOn("/dashboard", { exact: true })}>
                                        <Link href="/dashboard">
                                            <Home />
                                            <span>Home</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Order" isActive={isOn("/dashboard/orders")}>
                                        <Link href="/dashboard/orders">
                                            <ShoppingCart />
                                            <span>Order</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Manage Category" isActive={isOn("/dashboard/categories")}>
                                        <Link href="/dashboard/categories">
                                            <FolderKanban />
                                            <span>Manage Category</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Products" isActive={isOn("/dashboard/products")}>
                                        <Link href="/dashboard/products">
                                            <Package />
                                            <span>Products</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Customers" isActive={isOn("/dashboard/customers")}>
                                        <Link href="/dashboard/customers">
                                            <Users />
                                            <span>Customers</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Content" isActive={isOn("/dashboard/content")}>
                                        <Link href="/dashboard/content">
                                            <FileText />
                                            <span>Content</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Finance" isActive={isOn("/dashboard/finance")}>
                                        <Link href="/dashboard/finance">
                                            <CreditCard />
                                            <span>Finance</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Analytics" isActive={isOn("/dashboard/analytics")}>
                                        <Link href="/dashboard/analytics">
                                            <BarChart3 />
                                            <span>Analytics</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Marketing" isActive={isOn("/dashboard/marketing")}>
                                        <Link href="/dashboard/marketing">
                                            <Megaphone />
                                            <span>Marketing</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Discounts" isActive={isOn("/dashboard/discounts")}>
                                        <Link href="/dashboard/discounts">
                                            <Tag />
                                            <span>Discounts</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="User Management" isActive={isOn("/dashboard/users")}>
                                        <Link href="/dashboard/users">
                                            <Shield />
                                            <span>User Management</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Role Management" isActive={isOn("/dashboard/roles")}>
                                        <Link href="/dashboard/roles">
                                            <Shield />
                                            <span>Role Management</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Media Library" isActive={isOn("/dashboard/media-library")}>
                                        <Link href="/dashboard/media-library">
                                            <UploadIcon />
                                            <span>Media Library</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Knowledge Base" isActive={isOn("/dashboard/knowledge-base")}>
                                        <Link href="/dashboard/knowledge-base">
                                            <BookOpen />
                                            <span>Knowledge Base</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Blog" isActive={isOn("/dashboard/blog")}>
                                        <Link href="/dashboard/blog">
                                            <BookOpen />
                                            <span>Blog</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    {/* <SidebarSeparator /> */}
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                <header className="flex h-14 items-center justify-between border-b">
                    <SidebarTrigger />
                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-100 cursor-pointer">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        <User className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <span className="text-sm font-medium">Admin</span>
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <UserIcon className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <HelpCircle className="mr-2 h-4 w-4" />
                                    <span>Help</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <div className="p-1">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}
