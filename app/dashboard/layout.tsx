import type React from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar className="hidden md:block" />
        <main className="flex-1 md:ml-72">
          <div className="container py-6 px-4 md:px-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

