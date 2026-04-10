"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Mail, Briefcase, CopyIcon } from "lucide-react"
import { FaLinkedin } from "react-icons/fa"
import { SiUpwork } from "react-icons/si"

export default function HireMeDialog() {
  const onCopyEmail = (e: any) => {
    e?.preventDefault()
    e?.stopPropagation()
    
    navigator.clipboard.writeText("rizkikhair4658@email.com")
    alert("Email copied!")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-full justify-start gap-3 px-4 py-4 dark:hover:text-gray-400 dark:text-white hover:text-gray-500 text-gray-700"
        >
          <Briefcase />
          <span>Hire Me</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2 dark:text-white text-gray-700">
              Work With Me
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-2">

          <a
            href="https://www.upwork.com/freelancers/~01d508c0a118e53e90?mp_source=share"
            target="_blank"
            className="flex items-center gap-3 rounded-md border p-3 text-sm transition hover:bg-muted dark:hover:text-gray-400 dark:text-white hover:text-gray-500 text-gray-700"
          >
            <SiUpwork className="h-4 w-4" />
            <span>Hire me on Upwork</span>
          </a>

          <a
            href="mailto:rizkikhair4658@email.com"
            className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm transition hover:bg-muted dark:hover:text-gray-400 dark:text-white hover:text-gray-500 text-gray-700"
          >
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4" />
              <span>Drop me an email</span>
            </div>
            <Button variant="ghost" className="px-0 py-0 dark:hover:text-gray-400 dark:text-white hover:text-gray-500 text-gray-700" onClick={onCopyEmail}>
              <CopyIcon />
            </Button>
          </a>

          <a
            href="https://www.linkedin.com/in/rizki-khair-0b5a67186/"
            target="_blank"
            className="flex items-center gap-3 rounded-md border p-3 text-sm transition hover:bg-muted dark:hover:text-gray-400 dark:text-white hover:text-gray-500 text-gray-700"
          >
            <FaLinkedin className="h-4 w-4" />
            <span>Let's connect on LinkedIn</span>
          </a>

        </div>
      </DialogContent>
    </Dialog>
  )
}