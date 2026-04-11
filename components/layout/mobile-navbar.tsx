"use client"

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
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
import { NavigationMenuMobile, NavigationMenuContentMobile, NavigationMenuItemMobile } from './nav-main'

import { MenusMobile } from "@/lib/data/menu"

const ICON_MAP = {
  dashboard: LayoutPanelLeft,
  generate: FilePenLine,
  contents: FileText,
  analytics: ChartPie,
  settings: Settings,
} as const

type IconName = keyof typeof ICON_MAP

function Icons({ name, size }: { name: string; size: number; }) {
  const SelectedIcon = ICON_MAP[name as IconName] || AlertCircle

  return <SelectedIcon size={size} />
}

export default function AppMobileNavbar() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bg-white dark:bg-background bottom-0 left-0 right-0 h-16 px-6 md:hidden border-t">
      <NavigationMenuMobile>
        <section className="h-full">
          <NavigationMenuContentMobile>
            {MenusMobile.map(menu => (
              <NavigationMenuItemMobile
                key={menu.key}
                path={menu.url}>
                <div className="flex flex-col items-center justify-center gap-1">
                  <Icons name={menu.key} size={menu.url === pathname ? 16 : 20} />
                  <p className={`${menu.url === pathname ? 'text-[6px]' : 'text-[8px]'}`}>{menu.name}</p>
                </div>
              </NavigationMenuItemMobile>
            ))}
          </NavigationMenuContentMobile>
        </section>
      </NavigationMenuMobile>
    </div>
  )
}
