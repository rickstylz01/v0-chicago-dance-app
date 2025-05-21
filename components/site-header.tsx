import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, Menu, Search, User } from "lucide-react"
import { MobileNav } from "./mobile-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-zinc-900 border-zinc-800">
              <MobileNav />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-amber-500">
              STREET PULSE
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/events" className="text-sm font-medium transition-colors hover:text-teal-500">
            Events
          </Link>
          <Link href="/calendar" className="text-sm font-medium transition-colors hover:text-teal-500">
            Calendar
          </Link>
          <Link href="/map" className="text-sm font-medium transition-colors hover:text-teal-500">
            Map
          </Link>
          <Link href="/last-minute" className="text-sm font-medium transition-colors hover:text-teal-500">
            Last Minute
          </Link>
          <Link href="/community" className="text-sm font-medium transition-colors hover:text-teal-500">
            Community
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <CalendarDays className="h-5 w-5" />
            <span className="sr-only">Calendar</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button asChild className="hidden md:flex bg-teal-600 hover:bg-teal-700">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
