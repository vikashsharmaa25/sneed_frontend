"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, KeyRound, Shield, ShieldCheck, Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { colorClasses } from "./ColorCode";
import { RoleData } from "@/types/interface";
import CreateRoleDialog from "./CreateRoleDialog";

export default function RoleCard({ role }: { role: RoleData }) {
  const [open, setOpen] = useState(false);

  const safeRole: RoleData = {
    id: role?.id || "unknown",
    name: role?.name || "Unnamed Role",
    description: role?.description || "No description available",
    color: (role?.color as RoleData["color"]) || "slate",
    system: role?.system || false,
    users: role?.users || 0,
    permissions: role?.permissions || 0,
    tags: role?.tags || [],
  };

  const c = colorClasses(safeRole.color as any);
  const ShieldIcon = safeRole.system ? ShieldCheck : Shield;

  return (
    <>
      <Card className="border-muted/60 h-full flex flex-col">
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div
                className={`grid w-11 h-10 place-items-center rounded-xl ring ${c.ring} ${c.bg} shrink-0`}
              >
                <ShieldIcon className={`size-5 ${c.icon}`} />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold leading-none text-foreground truncate">
                    {safeRole.name}
                  </h3>
                  {safeRole.system && (
                    <Badge variant="warning" className="shrink-0">
                      System
                    </Badge>
                  )}
                </div>

                {safeRole.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {safeRole.description}
                  </p>
                )}

                {safeRole.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {safeRole.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className="inline-flex items-center gap-1.5 rounded-md border border-muted bg-muted/50 px-2 py-1 text-xs text-foreground"
                      >
                        <span className={`size-1.5 rounded-full ${c.dot}`} />
                        <span className="truncate max-w-[120px]">
                          {tag.label}
                        </span>
                        <span className="font-medium">{tag.count}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="size-4" />
                <span className="text-foreground font-medium">
                  {safeRole.users}
                </span>{" "}
                Users
              </div>
              <div className="flex items-center gap-2">
                <KeyRound className="size-4" />
                <span className="text-foreground font-medium">
                  {safeRole.permissions}
                </span>{" "}
                Permissions
              </div>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <CreateRoleDialog open={open} setOpen={setOpen} roleId={safeRole.id} />
    </>
  );
}
