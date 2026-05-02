"use client"

import { getAllContents } from "@/lib/api/content";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SettingsExportSection from "./export/SettingsExportSection";
import SettingsPreferenceDataManagementSkeleton from "./skeletons/settings-preference-data-management-skeleton";
import SettingsDataManagementDelete from "./settings-data-management-delete";
import SettingDataManagementImport from "./settings-data-management-import";

const manageDataQueryKey = ["settings-manage-data"]

export default function SettingsDataManagementCard() {
  const { data: manageDataValues, isLoading } =
    useQuery({
      queryKey: manageDataQueryKey,
      queryFn: () => getAllContents()
    }
  )

  if (isLoading) return <SettingsPreferenceDataManagementSkeleton />

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>Manage your stored content and workspace data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SettingsExportSection
          data={manageDataValues || []}
        />
        {!!manageDataValues?.length
          ? <SettingsDataManagementDelete />
          : <SettingDataManagementImport />
        }
      </CardContent>
    </Card>
  )
}
