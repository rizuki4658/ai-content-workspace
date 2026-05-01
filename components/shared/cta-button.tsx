"use client"

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Wand2, BriefcaseBusiness, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import HireMeDialog from "@/components/layout/hire-me-dialog"
import Link from 'next/link'

export default function DraggableCTA() {
  const constraintsRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [canDrag, setCanDrag] = useState(true)
  const isDragging = useRef(false)

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setCanDrag(true), 300)
      return () => clearTimeout(timer)
    } else {
      setCanDrag(false)
    }
  }, [isOpen])

  return (
    <div ref={constraintsRef} className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <motion.div
        drag={canDrag}
        dragConstraints={constraintsRef}
        dragMomentum={false}
        onDragStart={() => (isDragging.current = true)}
        onDragEnd={() => setTimeout(() => (isDragging.current = false), 100)}
        className={cn(
          "absolute bottom-20 right-6 pointer-events-auto flex flex-col items-end justify-end",
          canDrag ? "cursor-grab active:cursor-grabbing" : "cursor-default"
        )}
      >
        {/* MENU OPTIONS */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-end gap-2 mb-4"
            >
              <HireMeDialog>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border shadow-xl text-sm font-medium whitespace-nowrap"
                >
                  <span>Hire Me</span>
                  <BriefcaseBusiness size={16} />
                </Button>
              </HireMeDialog>

              <Link href="/generate">
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border shadow-xl text-sm font-medium whitespace-nowrap">
                  <span>Generate</span>
                  <Wand2 size={16} />
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => !isDragging.current && setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-full shadow-2xl transition-colors duration-300",
            isOpen ? "bg-zinc-200 dark:bg-zinc-800 text-foreground" : "bg-primary text-primary-foreground"
          )}
          whileHover={{ scale: 1 }} 
          whileTap={{ scale: 1 }}
        >
          <motion.div 
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center justify-center"
          >
            <Plus size={24} />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  )
}
