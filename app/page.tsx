import { CalendarDays, MapPin, Music, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeaturedEvents } from "@/components/featured-events"
import { LastMinuteBoard } from "@/components/last-minute-board"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            poster="/placeholder.svg?height=1080&width=1920"
          >
            <source src="/dance-background.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-amber-500">
              STREET PULSE
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-200 max-w-[700px] mx-auto">
              Find your rhythm. Connect with the community. Never miss a beat.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
              Browse Events
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-500 hover:bg-amber-950/30"
              asChild
            >
              <Link href="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-zinc-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center p-6 bg-zinc-800 rounded-xl">
              <CalendarDays className="h-12 w-12 text-teal-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Browse Events</h3>
              <p className="text-gray-400">Find events by date, style, or location that match your vibe</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-zinc-800 rounded-xl">
              <MapPin className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Nearby Map</h3>
              <p className="text-gray-400">Discover dance events happening close to you</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-zinc-800 rounded-xl">
              <Music className="h-12 w-12 text-cyan-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Live DJs</h3>
              <p className="text-gray-400">Filter for events with live DJs and open floor sessions</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-zinc-800 rounded-xl">
              <Users className="h-12 w-12 text-lime-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-400">Connect with dancers, DJs, and event organizers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-12 md:py-24 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-2">Featured Events</h2>
              <p className="text-gray-400 max-w-[700px]">Check out these hot events happening this week</p>
            </div>
            <Button variant="link" className="text-teal-500 p-0 h-auto font-bold">
              View All Events →
            </Button>
          </div>
          <FeaturedEvents />
        </div>
      </section>

      {/* Last Minute Board */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-zinc-900 to-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-amber-500" />
                <h2 className="text-3xl font-bold tracking-tighter">Last Minute Board</h2>
              </div>
              <p className="text-gray-400 max-w-[700px]">Happening tonight! Don't miss these same-day events</p>
            </div>
            <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-950/30">
              Post Last Minute Event
            </Button>
          </div>
          <LastMinuteBoard />
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-12 md:py-24 bg-black">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter mb-2">Choose Your Vibe</h2>
            <p className="text-gray-400 max-w-[700px] mx-auto">Select the plan that matches your dance journey</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col p-6 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Free Tier</h3>
                <p className="text-gray-400">For casual dancers looking to explore</p>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="mb-6 space-y-2 flex-1">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-teal-500 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Browse events by date, style, location
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-teal-500 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Filter for live DJs, open floor, etc.
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-teal-500 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  RSVP and get reminders
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-teal-500 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Map of nearby events
                </li>
              </ul>
              <Button className="mt-auto bg-teal-600 hover:bg-teal-700 text-white">Get Started</Button>
            </div>
            <div className="flex flex-col p-6 bg-gradient-to-b from-teal-900 to-teal-950 rounded-xl border border-teal-700 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Pro/Organizer Tier</h3>
                <p className="text-gray-300">For event organizers and promoters</p>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">$19.99</span>
                <span className="text-gray-300">/month</span>
              </div>
              <ul className="mb-6 space-y-2 flex-1">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-amber-400 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  All Free Tier features
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-amber-400 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Event posting & promotion tools
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-amber-400 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Advanced RSVP and waitlist features
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-amber-400 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Auto reminders to subscribers
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-amber-400 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Basic analytics (views, RSVPs)
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-amber-400 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Cross-post to social media
                </li>
              </ul>
              <Button className="mt-auto bg-amber-600 hover:bg-amber-700 text-white">Upgrade to Pro</Button>
            </div>
            <div className="flex flex-col p-6 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Dancer Profile Tier</h3>
                <p className="text-gray-400">For dedicated dancers</p>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="mb-6 space-y-2 flex-1">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-teal-500 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  All Free Tier features
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-teal-500 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Personal profile with dance styles
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-teal-500 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Match notifications for events
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-teal-500 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Follow favorite DJs and studios
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-teal-500 mr-2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Submit reviews and vibe ratings
                </li>
              </ul>
              <Button className="mt-auto bg-cyan-600 hover:bg-cyan-700 text-white">Upgrade Profile</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
