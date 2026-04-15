"use client"

import * as React from 'react'
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { motion, AnimatePresence } from 'motion/react'
import { useSidebar } from "@/contexts/sidebar-context"

export function NavigationMenuItem({ children, title, collapse, path }: {
  children: React.ReactNode;
  title: string;
  collapse: boolean;
  path: string
}) {
  const { open, toggleSidebar } = useSidebar()
  const pathname = usePathname()
  const isActive = pathname === path
  const onOpen = () => {
    const widthSreen = window.innerWidth
    if (widthSreen > 768 && widthSreen < 1024) {
      toggleSidebar(!open)
    }
  }

  const content = (
    <Link 
      href={path} 
      className={cn(
        "flex items-center rounded-md h-10 w-full relative group transition-colors duration-200",
        isActive
          ? "text-primary dark:text-white font-medium"
          : "text-muted-foreground hover:text-primary hover:bg-primary/10",
        collapse ? "justify-start px-3" : "justify-center px-0"
      )}
      onClick={onOpen}
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="sidebar-active-pill"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary/10 dark:bg-primary/60 rounded-md z-0"
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30,
            }}
          />
        )}
      </AnimatePresence>
      
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </Link>
  )

  return (
    <li className="list-none w-full">
      {!collapse ? (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            {title}
          </TooltipContent>
        </Tooltip>
      ) : (
        content
      )}
    </li>
  )
}

export function NavigationMenuContent({ children }: { children: React.ReactNode }) {
  return (
    <ul className="flex flex-col gap-1">{children}</ul>
  )
}

export function NavigationMenu({ children, open }: { children: React.ReactNode, open: boolean }) {
  return (
    <nav
      className={cn(
        "flex flex-col transition-all duration-300 py-6 h-full overflow-y-auto overflow-x-hidden scroll-smooth",
        open ? "px-6" : "px-4"
      )}
    >
      {children}
    </nav>
  )
}

export function NavigationMenuMobile({ children }: { children: React.ReactNode }) {
  return (
    <nav
      className={cn(
        "h-16 md:border-t px-6"
      )}>
      {children}
    </nav>
  )
}

export function NavigationMenuContentMobile({ children }: { children: React.ReactNode }) {
  return (
    <ul className="w-full h-full mx-auto flex items-center justify-center gap-2.5">{children}</ul>
  )
}

export function NavigationMenuItemMobile({ children, path }: {
  children: React.ReactNode;
  path: string
}) {
  const pathname = usePathname()
  const isActive = pathname === path

  const content = (
    <Link 
      href={path} 
      className={cn(
        "relative z-10 flex items-center justify-center rounded-lg h-13 w-13 transition-colors duration-300 hover:text-primary",
        isActive ? "text-primary dark:text-white" : "text-muted-foreground"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-primary/10 dark:bg-primary rounded-lg"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      
      <div className="relative z-20 flex flex-col items-center justify-center gap-1">
        {children}
      </div>
    </Link>
  )

  return (
    <li className="list-none relative">
      {content}
    </li>
  )
}
