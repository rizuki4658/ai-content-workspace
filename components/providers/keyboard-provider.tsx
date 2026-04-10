"use client";

import { useEffect } from "react";

export default function KeyboardProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        
        alert("Command + K ditekan!");
        // openSearch()
      }
    };

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return <>{children}</>
}
