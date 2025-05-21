import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  return (
    <div className="flex flex-col h-full py-4">
      <div className="px-2 mb-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-amber-500">
            STREET PULSE
          </span>
        </Link>
      </div>
      <nav className="flex flex-col gap-4 px-2">
        <Link href="/events" className="text-sm font-medium transition-colors hover:text-teal-500 py-2">
          Events
        </Link>
        <Link href="/calendar" className="text-sm font-medium transition-colors hover:text-teal-500 py-2">
          Calendar
        </Link>
        <Link href="/map" className="text-sm font-medium transition-colors hover:text-teal-500 py-2">
          Map
        </Link>
        <Link href="/last-minute" className="text-sm font-medium transition-colors hover:text-teal-500 py-2">
          Last Minute
        </Link>
        <Link href="/community" className="text-sm font-medium transition-colors hover:text-teal-500 py-2">
          Community
        </Link>
      </nav>
      <div className="mt-auto px-2">
        <Button className="w-full bg-teal-600 hover:bg-teal-700">Sign In</Button>
        <Button variant="outline" className="w-full mt-2 border-amber-500 text-amber-500 hover:bg-amber-950/30">
          Create Account
        </Button>
      </div>
    </div>
  )
}
