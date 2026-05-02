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

export default function AvatarPopover() {
  const onLogout = () => {
    console.log("logout clicked")
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
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="Rizki Khair" />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>

        <PopoverContent align="center" className="w-60 p-3">
          <div className="border-b px-2 pb-3 pt-1">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="Rizki Khair" />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-700 dark:text-white">Rizki Khair</p>
                <p className="truncate text-xs text-muted-foreground">
                  Frontend Engineer
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