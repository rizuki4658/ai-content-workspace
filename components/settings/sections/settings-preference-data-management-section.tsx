"use client"

import SettingsDataManagementCard from "@/components/settings/settings-data-management-card"
import SettingsPreferencesCard from "@/components/settings/settings-preferences-card"

export default function SettingsPreferenceDataManagementSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SettingsPreferencesCard />
      <SettingsDataManagementCard />
    </div>
  )
}