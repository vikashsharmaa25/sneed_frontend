"use client";

import { getUserPermissions } from '@/apis/all-apis';
import RoleGrid from '@/components/roles/RoleGrid';
import StatsHeader from '@/components/roles/StatsHeader';
import { useQuery } from '@tanstack/react-query';
import { ApiRoleResponse } from '@/types/interface';

function Page() {
  const { data: rolesData, isLoading, error } = useQuery<ApiRoleResponse>({
    queryKey: ["roles"],
    queryFn: getUserPermissions,
  });

  return (
    <div className="space-y-2">
      <StatsHeader data={rolesData} />
      <RoleGrid data={rolesData} isLoading={isLoading} error={error} />
    </div>
  );
}

export default Page 