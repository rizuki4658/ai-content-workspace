"use client"

import Link from "next/link"
import { Globe, LogOut, Settings } from "lucide-react"
import { TbBrandAstro } from "react-icons/tb"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
} from "@/components/ui/popover"
import HireMeDialog from "./hire-me-dialog"
import { getUserProfile, logoutUser } from "@/lib/api/user"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { User } from "@/lib/types/user"
import { useRouter } from "next/navigation"

// Terima props sebagai objek { data }
function AvatarBadge({ data }: { data: User | undefined }) {
  const cleanName = (name: string) => {
    if (!name) return "??"

    const words = name.trim().split(/\s+/)

    if (!words.length || words[0] === "") return "??"

    if (words.length >= 2) return `${words[0][0]}${words[1][0]}`.toUpperCase()

    const word = words[0]
    if (word.length === 1) return word.toUpperCase()

    return word.substring(0, 2).toUpperCase()
  }

  return data?.email ? (
    <Avatar className="h-9 w-9">
      <AvatarImage src={data.image} alt={data.name} />
      <AvatarFallback>{cleanName(data.name || data.email)}</AvatarFallback>
    </Avatar>
  ) : (
    <Avatar className="h-9 w-9">
      <AvatarFallback>??</AvatarFallback>
    </Avatar>
  )
}


export default function AvatarPopover() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data } = useQuery<User | undefined>({
    queryKey: ['user'],
    queryFn: () => getUserProfile()
  })

  const onLogout = async () => {
    try {
      queryClient.clear() 

      await logoutUser()
      router.push('/login')
    } catch {
      console.error("Logout failed")
    }
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            aria-label="Open account menu"
          >
            <AvatarBadge data={data} />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="center" className="w-60 p-3">
          <div className="border-b px-2 pb-3 pt-1">
            <div className="flex items-center gap-3">
              <AvatarBadge data={data} />

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-700 dark:text-white">{data?.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {data?.bio || '-'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-1">
            <PopoverClose asChild>  
              <Link href="/">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full justify-start gap-3 px-4 py-4 dark:hover:text-gray-500 dark:text-white hover:text-gray-500 text-gray-700"
                >
                  <TbBrandAstro />
                  <span>My Portfolio</span>
                </Button>
              </Link>
            </PopoverClose>
            <PopoverClose asChild>  
              <HireMeDialog />
            </PopoverClose>
            <PopoverClose asChild>  
              <Link href="/my-settings">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="w-full justify-start gap-3 px-4 py-4 dark:hover:text-gray-500 dark:text-white hover:text-gray-500 text-gray-700"
                >
                  <Settings />
                  <span>Settings</span>
                </Button>
              </Link>
            </PopoverClose>

            <div className="my-1 h-px bg-border" />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="w-full justify-start gap-3 px-4 py-4 text-destructive hover:text-destructive"
            >
              <LogOut />
              <span>Logout</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
