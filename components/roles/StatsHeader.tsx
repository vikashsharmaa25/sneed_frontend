'use client'
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDownUp, Download, Plus } from "lucide-react"
import CreateRoleDialog from "./CreateRoleDialog"
import { Separator } from "@/components/ui/separator"

export default function StatsHeader({ data }: any) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-4 cardBg">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Role Management</h1>

          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="size-4 mr-1" />
              Export
            </Button>

            <Button variant="outline">
              <ArrowDownUp className="size-4 mr-1" />
              Import
            </Button>

            <Button variant="default" onClick={() => setOpen(true)}>
              <div className="flex items-center gap-2">
                <Plus className="size-4" />
                Add Role
              </div>
            </Button>
          </div>
        </div>
      </div>

      <Separator />
      
      <div className="cardBg mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-muted/60">
            <CardContent className="p-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <div className="text-2xl font-semibold">{data?.total_users || 0}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-muted/60">
            <CardContent className="p-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Permissions</p>
                <div className="text-2xl font-semibold">{data?.total_permissions || 0}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-muted/60">
            <CardContent className="p-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Roles</p>
                <div className="text-2xl font-semibold">{data?.total_roles || 0}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateRoleDialog open={open} setOpen={setOpen} />
    </div>
  )
}
