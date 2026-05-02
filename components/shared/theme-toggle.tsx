"use client";

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTheme } from "@/contexts/theme-context"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const toggleDarkMode = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className={isDark ? 'text-white hover:text-gray-500' : 'text-gray-700 hover:text-gray-500'} onClick={toggleDarkMode}>
          {isDark ? <Sun /> : <Moon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{`${!isDark ? 'Dark' : 'Light'} mode`}</p>
      </TooltipContent>
    </Tooltip>
  );
}
