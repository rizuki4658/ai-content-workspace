"use client"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import MySettingsChangePassword from "./my-settings-change-password"
import MySettingsDeleteAccount from "./my-settings-delete-account"
import MySettingsPersonalInformation from "./my-settings-personal-information"
import MySettingsAvatar from "./my-settings-avatar"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserProfile, logoutUser } from "@/lib/api/user"
import { User } from "@/lib/types/user"
import MySettingsAvatarSkeleton from "./skeletons/my-settings-avatar-skeleton"
import MySettingsPersonalInformationSkeleton from "./skeletons/my-settings-personal-information-skeleton"
import MySettingsButtonSkeleton from "./skeletons/my-settings-change-password-skeleton"

export default function MySettingsCard() {
  const queryClient = useQueryClient()
  const { data, isLoading, isFetching, isError } = useQuery<User | undefined>({
    queryKey: ['user'],
    queryFn: () => getUserProfile()
  })

  const onLogout = async () => {
    try {
      queryClient.clear() 

      await logoutUser()
    } catch {
      console.error("Logout failed")
    }
  }

  return (
    <div className="mx-auto w-full max-w-160 mt-10">
      <Card className="space-y-4">
        <CardHeader>
          {!isLoading && !isFetching ? <MySettingsAvatar data={data} /> : <MySettingsAvatarSkeleton />}
        </CardHeader>

        <CardContent>
          <div className="space-y-10">
            <div className="space-y-4">
              {!isLoading && !isFetching ? <MySettingsPersonalInformation data={data} /> : <MySettingsPersonalInformationSkeleton />}
              {!isLoading && !isFetching ? <MySettingsChangePassword /> : <MySettingsButtonSkeleton />}
            </div>

            <div className="space-y-4">
              {!isLoading && !isFetching ?
                <Button
                  variant="outline"
                  className="w-full bg-transparent! border-amber-500/50! text-amber-500! hover:bg-amber-300/10! hover:border-amber-300!"
                  size="lg"
                  type="button"
                  onClick={onLogout}>
                  <LogOut />
                  Logout
                </Button>
              : <MySettingsButtonSkeleton />}
              {!isLoading && !isFetching ? <MySettingsDeleteAccount /> : <MySettingsButtonSkeleton />}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
