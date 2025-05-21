import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-amber-500">
                STREET PULSE
              </span>
            </Link>
            <p className="text-sm text-gray-400">Find your rhythm. Connect with the community. Never miss a beat.</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-sm text-gray-400 hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-sm text-gray-400 hover:text-white">
                  Calendar
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-sm text-gray-400 hover:text-white">
                  Map
                </Link>
              </li>
              <li>
                <Link href="/last-minute" className="text-sm text-gray-400 hover:text-white">
                  Last Minute
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-gray-400 hover:text-white">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-gray-400 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest events and updates.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="bg-zinc-800 border-zinc-700" />
              <Button className="bg-teal-600 hover:bg-teal-700">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Street Pulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
