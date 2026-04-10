import { Search, Command, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from '@/components/shared/theme-toggle'
import PageTitle from "@/components/shared/page-title"
import Notifications from "@/components/shared/notifications"
import AvatarPopover from "./avatar-popover"
import SearchEverything from "./search-everything"

export default function AppTopbar() {
  return (
    <header className={'flex h-16 items-center justify-between md:border-b px-6'}>
      <PageTitle className="md:hidden block font-semibold text-xl capitalize" />
      <div className="md:block lg:hidden hidden">
        <Button variant="ghost" size="icon-lg" className="dark:hover:text-gray-500 dark:text-white hover:text-gray-500 text-gray-700">
          <Menu />
        </Button>
      </div>
      <div className="md:flex hidden gap-4">
        <SearchEverything />
      </div>

      <div className="flex items-center md:gap-2 gap-4">
        <div className="md:block hidden">
          <ThemeToggle />
        </div>
        <Notifications />
        <AvatarPopover />
      </div>
    </header>
  )
}
