"use client"

import { Button } from "@/components/ui/button"
import {
  X,
  Menu,
  FileText,
  ChartPie,
  Settings,
  FilePenLine,
  LayoutPanelLeft,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem } from "./nav-main"
import { Menus } from "@/lib/data/menu"
import { useSidebar } from "@/contexts/sidebar-context"

const ICON_MAP = {
  dashboard: LayoutPanelLeft,
  generate: FilePenLine,
  contents: FileText,
  analytics: ChartPie,
  settings: Settings,
  privacy: AlertCircle
} as const

type IconName = keyof typeof ICON_MAP

function Icons({ name, size }: { name: string; size: number; }) {
  const SelectedIcon = ICON_MAP[name as IconName] || AlertCircle

  return <SelectedIcon size={size} />
}

export default function AppSidebar() {
  const { open, toggleSidebar } = useSidebar()

  return (
    <aside
      className={cn(
        "bg-white dark:bg-background border-r h-screen transition-all duration-300 ease-in-out",
        // 1. Mobile: Hidden
        "hidden",
        // 2. Tablet: Fixed slide menu (width 64)
        "md:fixed md:top-0 md:z-50 md:flex md:w-64",
        open ? "md:left-0" : "md:-left-64",
        // 3. Desktop: Static collapse flow
        "lg:sticky lg:top-0 lg:flex",
        open ? "lg:max-w-64" : "lg:max-w-20"
      )}
    >
      <div className="flex h-full w-full flex-col overflow-hidden">
        <div
          className={cn(
            "h-16 flex items-center transition-all duration-300",
            open ? "px-6 justify-between" : "px-4 justify-center"
          )}
        >
          {/* Logo: Link Navigasi + Trigger Open in Desktop */}
          <div
            className="flex items-center"
            onClick={() => {
              if (!open) toggleSidebar(true)
            }}
          >
            <img src="/logo/logo3.png" alt="Logo" className="w-12 min-w-12 cursor-pointer" />
            
            {/* Teks Workspace: 
                - Tablet (md) always shown (block)
                - Desktop (lg) hidden if collapsed
            */}
            <div className={cn(
              "flex-col justify-center",
              "md:flex", 
              open ? "lg:flex" : "lg:hidden"
            )}>
              <p className="text-[10px] font-semibold leading-3 uppercase">AI Content</p>
              <p className="text-sm text-gray-700 dark:text-gray-400 leading-3">Workspace</p>
            </div>
          </div>

          {/* Button Toggle:
              - Tablet: X for close
              - Desktop: Menu for collapse, appear when OPENED
          */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "dark:text-white text-gray-700",
              // Mobile: Hidden
              "hidden",
              // Tablet: Always show (md:flex)
              "md:flex",
              // Desktop: Hidden if collapsed (lg:hidden)
              !open ? "lg:hidden" : "lg:flex"
            )}
            onClick={() => toggleSidebar(!open)}
          >
            {/* Icon Menu for Desktop, Icon X for Tablet */}
            <Menu className="hidden lg:block h-5 w-5" />
            <X className="lg:hidden md:block hidden h-5 w-5" />
          </Button>
        </div>

        <div className={`flex-1 min-h-0`}>
          <NavigationMenu open={open}>
            <section>
              {Menus.map((group, idx) => (
                <div key={idx} className={cn("flex flex-col w-full", idx !== 0 && "mt-4")}>
                  
                  {/* Label Group */}
                  {group.label && (
                    <div className={cn(
                      "mb-2 px-4 h-4 items-center",
                      "md:flex",
                      open ? "lg:flex" : "lg:hidden"
                    )}>
                      <span className="text-[8px] font-semibold text-muted-foreground uppercase tracking-widest animate-in fade-in duration-500">
                        {group.label}
                      </span>
                    </div>
                  )}

                  {/* Menu Items Inside Group */}
                  <NavigationMenuContent>
                    {group.items.map((menu) => (
                      <NavigationMenuItem
                        key={menu.key}
                        title={menu.name}
                        path={menu.url}
                        collapse={open}
                      >
                        <div className={cn(
                          "flex items-center gap-4",
                          !open ? "justify-center" : "justify-start"
                        )}>
                          <Icons name={menu.key} size={open ? 16 : 16} />
                          <span className={cn(
                            "text-sm truncate",
                            "md:inline",
                            open ? "lg:inline" : "lg:hidden"
                          )}>{menu.name}</span>
                        </div>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuContent>
                </div>
              ))}
            </section>
          </NavigationMenu>
        </div>
      </div>
    </aside>
  )
}
