"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from '@/components/shared/theme-toggle'
import NavPageTitle from "@/components/shared/nav-page-title"
import Notifications from "@/components/shared/notifications"
import AvatarPopover from "./avatar-popover"
import SearchEverything from "./search-everything"
import AppMobileNavbar from "./mobile-navbar"
import { useSidebar } from "@/contexts/sidebar-context"

export default function AppTopbar() {
  const { open, toggleSidebar } = useSidebar()
  return (
    <header className={'h-16 md:border-b px-6 sticky top-0 bg-white dark:bg-background z-40'}>
      <div className="max-w-360 w-full h-full mx-auto flex items-center justify-between">
        <div className="md:hidden flex items-center gap-1">
          <img src="/logo/logo3.png" alt="Logo" className="w-8 min-w-8 cursor-pointer" />
          <NavPageTitle className="font-medium text-lg capitalize" />
        </div>
        <div className="md:block lg:hidden hidden">
          <Button variant="ghost" size="icon-lg" className="dark:hover:text-gray-500 dark:text-white hover:text-gray-500 text-gray-700" onClick={() => toggleSidebar(!open)}>
            <Menu />
          </Button>
        </div>
        <div className="md:flex hidden gap-4">
          <SearchEverything dense={false} />
        </div>

        <div className="flex items-center md:gap-2 gap-0">
          <div className="md:hidden block">
            <SearchEverything dense={true} />
          </div>
          <ThemeToggle />
          <Notifications />
          <AvatarPopover />
        </div>
      </div>
      <AppMobileNavbar />
    </header>
  )
}
