"use client";
import { usePathname } from "next/navigation";


export default function NavPageTitle({ className }: { className: string }) {
  const pathname = usePathname()
  const title = pathname === "/"
    ? "Dashboard"
    : pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ')
  
  return <h1 className={className}>{title}</h1>
}
