"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { createRole, updateRole, getPermissions, getRoleById } from "@/apis/all-apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiRoleResponse, Permission } from "@/types/interface";
import { COLOR_OPTIONS, COLOR_HEX_MAP } from "./ColorCode";

export default function CreateRoleDialog({ open, setOpen, roleId }: any) {
  console.log("open", open)
  console.log("roleId", roleId)
  const [activeCat, setActiveCat] = useState(0);
  const [selectedPerms, setSelectedPerms] = useState<Record<string, boolean>>({});
  const [color, setColor] = useState<any>("violet");
  const [roleName, setRoleName] = useState("");
  const [roleDesc, setRoleDesc] = useState("");
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  const { data: roleData, isLoading: roleLoading } = useQuery({
    queryKey: ["role", roleId],
    queryFn: () => getRoleById(roleId),
    enabled: !!roleId && open,
    staleTime: 0,
  });

  const { data: response, isLoading, error } = useQuery<ApiRoleResponse>({
    queryKey: ["rolespermission"],
    queryFn: getPermissions,
  });

  const permissions = useMemo<Permission[]>(() => {
    if (!response) return [];
    if (Array.isArray(response)) return response;
    return [];
  }, [response]);

  const groupedPermissions = useMemo(() => {
    if (!permissions.length) return {};
    return permissions.reduce<Record<string, Permission[]>>((acc, perm) => {
      const module = perm.module.toLowerCase();
      if (!acc[module]) acc[module] = [];
      acc[module].push(perm);
      return acc;
    }, {});
  }, [permissions]);

  const categories = useMemo(() => Object.keys(groupedPermissions).sort(), [groupedPermissions]);
  const activeCategory = categories[activeCat] || "";
  const activePermissions = groupedPermissions[activeCategory] || [];

  const selectedInCategory = activePermissions.filter((p: any) => selectedPerms[String(p.id)]).length;
  const totalSelected = Object.keys(selectedPerms).filter((k) => selectedPerms[k]).length;
  const totalPermissions = permissions.length;

  function togglePerm(id: number | string, checked: boolean) {
    setSelectedPerms((prev) => ({ ...prev, [String(id)]: checked }));
  }

  function selectAllInCategory() {
    setSelectedPerms((prev) => {
      const updated = { ...prev };
      activePermissions.forEach((p: any) => {
        updated[String(p.id)] = true;
      });
      return updated;
    });
  }

  const { mutate: createRoleMutate, isPending: isCreating } = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["rolespermission"] });
      resetForm();
      toast.success("Role created successfully");
    },
    onError: handleError,
  });

  const { mutate: updateRoleMutate, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: any }) => updateRole(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["rolespermission"] });
      resetForm();
      toast.success("Role updated successfully");
    },
    onError: handleError,
  });

  function resetForm() {
    setRoleName("");
    setRoleDesc("");
    setColor("violet");
    setSelectedPerms({});
    setOpen(false);
    setActiveCat(0);
  }

  function handleSubmit() {
    const payload = {
      roleName,
      roleDescription: roleDesc,
      colorCode: COLOR_HEX_MAP[color as keyof typeof COLOR_HEX_MAP],
      permissionIds: Object.keys(selectedPerms)
        .filter((id) => selectedPerms[id])
        .map((id) => Number(id)),
    };

    if (roleId) {
      updateRoleMutate({ id: roleId, payload });
    } else {
      createRoleMutate(payload);
    }
  }

  useEffect(() => {
    if (roleData) {
      setRoleName(roleData?.role_name || "");
      setRoleDesc(roleData?.role_description || "");
      const colorKey = Object.keys(COLOR_HEX_MAP).find(
        (key) => COLOR_HEX_MAP[key as keyof typeof COLOR_HEX_MAP] === roleData?.color_code
      );
      setColor(colorKey || "violet");

      if (roleData?.granted_permissions_by_module) {
        const newSelected: Record<string, boolean> = {};
        roleData.granted_permissions_by_module.forEach((mod: any) => {
          mod.actions.forEach((action: any) => {
            if (action.permission_id) {
              newSelected[String(action.permission_id)] = true;
            }
          });
        });
        setSelectedPerms(newSelected);
      }
    }
  }, [roleData]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className="max-w-xl overflow-y-auto my-scroll">
        <DialogHeader>
          <DialogTitle>{roleId ? "Edit Role" : "Create New Role"}</DialogTitle>
          <DialogClose>
            <X className="size-4" />
          </DialogClose>
        </DialogHeader>

        <Separator />

        <DialogBody className="space-y-5">
          <div className="space-y-3">
            <div>
              <Label htmlFor="role_name">Role Name *</Label>
              <Input
                id="role_name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="e.g., Content Manager"
                required
                disabled={roleId}
              />
            </div>

            <div>
              <Label htmlFor="role_desc">Description *</Label>
              <Textarea
                id="role_desc"
                value={roleDesc}
                onChange={(e) => setRoleDesc(e.target.value)}
                rows={3}
                placeholder="Describe this role..."
                required
              />
            </div>

            <div>
              <Label>Color Badge</Label>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setColor(c.key)}
                    className={`w-8 h-8 rounded-full ${c.className} ${color === c.key ? "ring-2 ring-offset-2 ring-primary" : ""
                      } hover:opacity-90`}
                    aria-label={`Select ${c.key} color`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            {isLoading ? (
              <div className="text-center py-4 text-muted-foreground">Loading permissions...</div>
            ) : error ? (
              <div className="text-center py-4 text-destructive">Error loading permissions</div>
            ) : !permissions.length ? (
              <div className="text-center py-4 text-muted-foreground">No permissions available</div>
            ) : (
              <>
                <div className="flex justify-between text-sm mb-2">
                  <Label>Permissions *</Label>
                  <span className="text-muted-foreground">
                    {totalSelected} of {totalPermissions} selected
                  </span>
                </div>

                <div className="flex gap-1 overflow-x-auto border rounded-md p-1 mb-3">
                  {categories.map((cat, idx) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCat(idx)}
                      className={`px-4 py-2 rounded text-sm font-medium whitespace-nowrap transition-colors ${activeCat === idx
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                        }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>

                {categories.length > 0 && (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        {selectedInCategory} / {activePermissions.length} selected
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={selectAllInCategory}
                      >
                        Select All
                      </Button>
                    </div>

                    {activePermissions.map((perm: any) => (
                      <div
                        key={perm.id}
                        className="flex items-start gap-3 p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`perm-${perm.id}`}
                            checked={!!selectedPerms[String(perm.id)]}
                            onChange={(e) =>
                              togglePerm(perm.id, e.target.checked)
                            }
                          />
                          <label
                            htmlFor={`perm-${perm.id}`}
                            className="text-sm font-medium leading-none"
                          >
                            {perm.name}
                          </label>
                        </div>
                        <div className="text-xs text-muted-foreground">{perm.description}</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </DialogBody>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <div className="text-xs text-muted-foreground w-full sm:flex-1">
            Selected {totalSelected} permissions across {categories.length} categories
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isCreating || isUpdating}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!roleName || isCreating || isUpdating}>
              {isCreating || isUpdating
                ? "Saving..."
                : roleId
                  ? "Update Role"
                  : "Create Role"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
