"use client"

import SettingsDataManagementCard from "../settings-data-management-card"
import SettingsPreferencesCard from "../settings-preferences-card"

export default function SettingsPreferenceDataManagementSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SettingsPreferencesCard />
      <SettingsDataManagementCard />
    </div>
  )
}