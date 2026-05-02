// components/providers/database-seeder.tsx
"use client"

import { useEffect } from "react"
import { seedDefaultData } from "@/lib/db"

export function DatabaseSeeder() {
  useEffect(() => {
    seedDefaultData()
  }, [])

  return null
}
