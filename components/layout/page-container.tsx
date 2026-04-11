"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return (
    <main className="flex-1 pb-16 md:pb-0">
      <div className="p-6 max-w-360 w-full mx-auto">{children}</div>
    </main>
  )
}
