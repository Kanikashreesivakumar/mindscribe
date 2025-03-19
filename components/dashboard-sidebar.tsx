"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, FileText, Home, Menu, Settings, X } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Start Thought Processing",
    href: "/dashboard/thought-processing",
    icon: Brain,
  },
  {
    title: "Saved Thoughts",
    href: "/dashboard/notes",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface DashboardSidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div
        className={cn("fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden", isOpen ? "block" : "hidden")}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-72 border-r border-gray-800 bg-cyberpunk-deep-blue/90 backdrop-blur-md transition-transform md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">Menu</span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)] py-6">
          <nav className="px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-white",
                  pathname === item.href
                    ? "bg-cyberpunk-neon-purple/20 text-white shadow-[0_0_10px_rgba(157,78,221,0.3)]"
                    : "hover:bg-gray-800",
                )}
              >
                <item.icon
                  className={cn("h-5 w-5", pathname === item.href ? "text-cyberpunk-neon-purple" : "text-gray-400")}
                />
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="mt-10 px-4">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-gray-300">Need Help?</h3>
              <p className="text-xs text-gray-400 mb-3">Check our documentation or contact support for assistance.</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}

