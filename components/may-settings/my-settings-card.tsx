"use client"

import {
  Card,
  CardContent,
  CardHeader,
} from "../ui/card"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import MySettingsChangePassword from "./my-settings-change-password"
import MySettingsDeleteAccount from "./my-settings-delete-account"
import MySettingsPersonalInformation from "./my-settings-personal-information"
import MySettingsAvatar from "./my-settings-avatar"

export default function MySettingsCard() {

  const onLogout = () => {
    console.log("logout")
  }

  return (
    <div className="mx-auto w-full max-w-160 mt-10">
      <Card className="space-y-4">
        <CardHeader>
          <MySettingsAvatar />
        </CardHeader>

        <CardContent>
          <div className="space-y-10">
            <div className="space-y-4">
              <MySettingsPersonalInformation />
              <MySettingsChangePassword />
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full bg-transparent! border-amber-500/50! text-amber-500! hover:bg-amber-300/10! hover:border-amber-300!"
                size="lg"
                type="button"
                onClick={onLogout}
              >
                <LogOut />
                Logout
              </Button>

              <MySettingsDeleteAccount />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
