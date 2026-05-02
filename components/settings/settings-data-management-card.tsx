"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Upload } from "lucide-react";
import { Button } from "../ui/button";

export default function SettingsDataManagementCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>Manage your stored content and workspace data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          size="lg"
          className="w-full">
          <Upload />
          Export Data
        </Button>

        <Button
          variant="destructive"
          size="lg"
          className="w-full">
          <Trash />
          Clear All Content
        </Button>
      </CardContent>
    </Card>
  )
}
