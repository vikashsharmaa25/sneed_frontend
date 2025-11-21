import React, { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import RoleCardSkeleton from "../Skelton"
import CreateRoleDialog from "./CreateRoleDialog"
import RoleCard from "./RoleCard"
import { COLOR_HEX_MAP } from "./ColorCode"

export default function RoleGrid({
  data,
  isLoading,
  error,
}: {
  data: any
  isLoading: boolean
  error: any
}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const roles = useMemo(() => {
    if (!data?.roles) return []

    return data.roles.map((role: any): any => {
      const color =
        Object.entries(COLOR_HEX_MAP).find(
          ([_, hex]: any) => hex.toLowerCase() === (role.color_code?.toLowerCase() || "")
        )?.[0] || "violet"

      const tags =
        role.granted_permissions_by_module?.map((module: any) => ({
          label: module.module_name,
          count: module.actions?.length || 0,
        })) || []

      return {
        id: String(role.role_id),
        name: role.role_name,
        description: role.role_description || "No description",
        color,
        system: role.role_name === "ADMIN",
        userCount: role.user_count,
        permissionsCount: role.permissions_granted_count,
        tags,
      }
    })
  }, [data, COLOR_HEX_MAP])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <RoleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-center py-10">
          <p className="text-red-500">Error loading roles. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (!roles || roles.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Role
          </Button>
        </div>
        <div className="text-center py-10 text-muted-foreground">
          No roles found. Create your first role to get started.
        </div>

        <CreateRoleDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSuccess={() => {
            setIsCreateDialogOpen(false)
            window.location.reload()
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role: any) => (
          <RoleCard
            key={role.id}
            role={{
              ...role,
              users: role.userCount,
              permissions: role.permissionsCount,
            }}
          />
        ))}
      </div>

      <CreateRoleDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={() => {
          setIsCreateDialogOpen(false)
          window.location.reload()
        }}
      />
    </div>
  )
}
