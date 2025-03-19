"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { BrainLogo } from "./brain-logo"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertTriangle, Bell, HelpCircle, LogOut, Settings, User } from "lucide-react"

export function DashboardHeader() {
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/login")
  }

  const handleReportIssue = () => {
    // In a real app, this would open a report dialog
    console.log("Report issue clicked")
  }

  return (
    <header className="border-b border-gray-800 bg-cyberpunk-deep-blue/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <BrainLogo size="sm" />
            <span className="text-xl font-bold text-white">
              Mind<span className="text-cyberpunk-neon-purple">scribe</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-1"
            onClick={handleReportIssue}
          >
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span className="hidden sm:inline">Report Issue</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full border border-cyberpunk-neon-purple/50 bg-gray-900"
              >
                <User className="h-4 w-4 text-cyberpunk-neon-purple" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800">
              <DropdownMenuLabel className="text-gray-400">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem
                className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer"
                onClick={() => router.push("/dashboard/settings")}
              >
                <Settings className="mr-2 h-4 w-4 text-cyberpunk-neon-purple" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem
                className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4 text-cyberpunk-neon-purple" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

