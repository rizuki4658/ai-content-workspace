"use client"

import { useEffect, useState } from "react"
import { Link, LoaderCircle, Pen, X } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateImageProfile } from "@/lib/api/user"
import { User } from "@/lib/types/user"

import { CardDescription, CardTitle } from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import MySettingsAvatarSkeleton from "./skeletons/my-settings-avatar-skeleton"

const initialAvatarUrl = "https://github.com/shadcn.png"

export default function MySettingsAvatar({ data }: { data?: User }) {
  const queryClient = useQueryClient()

  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl)
  const [avatarInput, setAvatarInput] = useState(initialAvatarUrl)
  const [isEditingAvatar, setIsEditingAvatar] = useState(false)

  const { mutateAsync: updatePersonalPhoto, isPending } = useMutation({
    mutationFn: async (payload: { email: string; image: string }) => {
      return updateImageProfile(payload)
    },

    onMutate: async (newAvatar) => {
      await queryClient.cancelQueries({ queryKey: ["user"] })

      const previousUser = queryClient.getQueriesData<User>({
        queryKey: ["user"],
      })

      queryClient.setQueriesData<User>({ queryKey: ["user"] }, (oldUser) => {
        if (!oldUser) return oldUser

        return {
          ...oldUser,
          image: newAvatar.image,
        }
      })

      return { previousUser }
    },

    onError: (_error, _variables, context) => {
      context?.previousUser?.forEach(([queryKey, oldUser]) => {
        queryClient.setQueryData(queryKey, oldUser)
      })
    }
  })

  const cleanName = (name: string) => {
    const names = name.trim().split(/\s+/)

    if (!names[0]) return ""

    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }

    const singleName = names[0]

    if (singleName.length === 1) {
      return singleName[0].toUpperCase()
    }

    return `${singleName[0]}${singleName[singleName.length - 1]}`.toUpperCase()
  }

  const getCurrentUserEmail = () => {
    if (data?.email) return data.email

    if (typeof window === "undefined") return ""

    return localStorage.getItem("currentUserEmail") || ""
  }

  const onEditAvatar = () => {
    setAvatarInput(avatarUrl)
    setIsEditingAvatar(true)
  }

  const onCancelAvatar = () => {
    setAvatarInput(avatarUrl)
    setIsEditingAvatar(false)
  }

  const onSaveAvatar = async () => {
    const nextAvatarUrl = avatarInput.trim()
    const email = getCurrentUserEmail()

    if (!nextAvatarUrl || !email) return

    await updatePersonalPhoto({
      email,
      image: nextAvatarUrl,
    })

    setAvatarUrl(nextAvatarUrl)
    setAvatarInput(nextAvatarUrl)
    setIsEditingAvatar(false)
  }

  useEffect(() => {
    if (!data) return

    const image = data.image?.trim() || ""

    setAvatarUrl(image)
    setAvatarInput(image)
    setIsEditingAvatar(false)
  }, [data])

  return !isPending ? <>
      <CardTitle className="pt-4">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <Avatar className="h-20 w-20">
              {avatarUrl.trim() ? (
                <AvatarImage src={avatarUrl} alt="Profile avatar" />
              ) : null}

              <AvatarFallback>
                {cleanName(data?.name || "-")}
              </AvatarFallback>
            </Avatar>

            <div className="absolute right-0 bottom-0 z-10">
              <Button
                variant="secondary"
                size="icon-xs"
                className="rounded-full"
                type="button"
                disabled={isPending}
                onClick={isEditingAvatar ? onCancelAvatar : onEditAvatar}
              >
                {isEditingAvatar ? <X /> : <Pen />}
              </Button>
            </div>
          </div>
        </div>
      </CardTitle>

      <CardDescription>
        {isEditingAvatar ? (
          <div className="mt-2 flex items-center justify-center">
            <div className="flex w-full items-center gap-2 md:max-w-sm">
              <InputGroup className="flex-1">
                <InputGroupInput
                  value={avatarInput}
                  placeholder="https://www.example.com/img.png"
                  disabled={isPending}
                  onChange={(event) => setAvatarInput(event.target.value)}
                />

                <InputGroupAddon align="inline-end">
                  <Link />
                </InputGroupAddon>
              </InputGroup>

              <Button
                type="button"
                size="sm"
                onClick={onSaveAvatar}
                disabled={!avatarInput.trim() || isPending}
              >
                {isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : null}
                Save
              </Button>
            </div>
          </div>
        ) : null}
      </CardDescription>
    </> : <MySettingsAvatarSkeleton />
}
