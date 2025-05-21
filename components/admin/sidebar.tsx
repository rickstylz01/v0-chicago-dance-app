"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, Users, Settings, LogOut, PlusCircle, ListChecks } from "lucide-react"
import { signOut } from "@/app/actions/auth"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-amber-500">
            STREET PULSE
          </span>
        </Link>
      </div>

      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Dashboard</h2>
        <div className="space-y-1">
          <Button variant={isActive("/admin") ? "secondary" : "ghost"} className="w-full justify-start" asChild>
            <Link href="/admin">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Overview
            </Link>
          </Button>

          <Button variant={isActive("/admin/events") ? "secondary" : "ghost"} className="w-full justify-start" asChild>
            <Link href="/admin/events">
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </Link>
          </Button>

          <Button variant={isActive("/admin/users") ? "secondary" : "ghost"} className="w-full justify-start" asChild>
            <Link href="/admin/users">
              <Users className="mr-2 h-4 w-4" />
              Users
            </Link>
          </Button>

          <Button
            variant={isActive("/admin/approvals") ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link href="/admin/approvals">
              <ListChecks className="mr-2 h-4 w-4" />
              Approvals
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</h2>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/events/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-3 py-2 mt-auto">
        <h2 className="mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</h2>
        <div className="space-y-1">
          <Button
            variant={isActive("/admin/settings") ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link href="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-900/20"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
