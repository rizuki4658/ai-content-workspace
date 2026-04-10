"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  Command as CommandIcon, 
  Loader2, 
  History, 
  Sparkles, 
  Settings, 
  LayoutDashboard, 
  FileCode 
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export default function SearchEverything() {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [search, setSearch] = React.useState("")

  /**
   * Keyboard Shortcut Logic
   */
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  /**
   * Simulated API Loading Logic
   */
  React.useEffect(() => {
    if (search.length > 0) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 600) // Fake API delay
      return () => clearTimeout(timer)
    } else {
      setIsLoading(false)
    }
  }, [search])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="flex items-center gap-4 rounded-sm text-gray-400 hover:bg-gray-50 hover:text-gray-400"
        >
          <div className="flex items-center justify-start gap-4">
            <Search className="h-4 w-4" />
            <p className="min-w-48 text-left lg:min-w-2xs">Search...</p>
          </div>

          <div className="flex items-center gap-1 text-xs font-medium">
            <CommandIcon className="h-3 w-3" />
            <span>K</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden p-0 sm:max-w-md" showCloseButton={false}>
        <DialogTitle className="sr-only">Command Menu</DialogTitle>
        <DialogDescription className="sr-only">
          Search for files, tools, and personal projects.
        </DialogDescription>

        <Command className="rounded-lg border-none" shouldFilter={true}>
          <CommandInput 
            placeholder="Search everything..." 
            value={search}
            onValueChange={setSearch}
            className="border-none focus:ring-0"
          />

          <CommandList className="max-h-100">
            {isLoading ? (
              <div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching results...
              </div>
            ) : (
              <>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Recent Activity">
                  <CommandItem>
                    <History className="mr-2 h-4 w-4" />
                    <span>Golang: Step 26 Advanced Logic</span>
                  </CommandItem>
                  <CommandItem>
                    <History className="mr-2 h-4 w-4" />
                    <span>Motolog Dashboard Styles</span>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Quick Actions">
                  <CommandItem>
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>New Project</span>
                  </CommandItem>
                  <CommandItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Navigation">
                  <CommandItem>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </CommandItem>
                  <CommandItem>
                    <FileCode className="mr-2 h-4 w-4" />
                    <span>Project Contents</span>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Search Results">
                  <CommandItem className="flex flex-col items-start gap-0.5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Hoodie Capsule Wardrobe</span>
                      <span className="text-[10px] bg-gray-700 text-white dark:bg-white dark:text-gray-700 px-1 rounded uppercase">Personal</span>
                    </div>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      Drafting color rotation: Maroon, Black, Charcoal, Navy, Beige
                    </span>
                  </CommandItem>

                  <CommandItem className="flex flex-col items-start gap-0.5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Go Structs & Interfaces</span>
                      <span className="text-[10px] bg-gray-700 text-white dark:bg-white dark:text-gray-700 px-1 rounded uppercase">Learning</span>
                    </div>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      Module documentation and implementation notes
                    </span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
