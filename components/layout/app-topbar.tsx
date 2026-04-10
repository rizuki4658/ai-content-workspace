import { Search, Command, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from '@/components/shared/theme-toggle'
import PageTitle from "@/components/shared/page-title"
import Notifications from "@/components/shared/notifications"
import AvatarPopover from "./avatar-popover"

export default function AppTopbar() {
  return (
    <header className={'flex h-16 items-center justify-between lg:border-b px-6'}>
      <PageTitle className="md:hidden block font-semibold text-xl capitalize" />
      <div className="md:block lg:hidden hidden">
        <Button variant="ghost" size="icon-lg" className="dark:hover:text-gray-500 dark:text-white hover:text-gray-500 text-gray-700">
          <Menu />
        </Button>
      </div>
      <div className="md:flex hidden gap-4">
        <Button
          size="lg"
          variant="outline"
          className="text-gray-400 rounded-sm hover:text-gray-400 hover:bg-gray-50 flex items-center gap-4"
        >
          <div className="flex items-center justify-start gap-4">
            <Search />
            <p className="min-w-48 lg:min-w-2xs text-left">Search...</p>
          </div>
          <div className="flex items-center gap-1">
            <Command />
            K
          </div>
        </Button>
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
