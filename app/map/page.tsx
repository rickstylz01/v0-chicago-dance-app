import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Filter, MapPin, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function MapPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="container px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter mb-2">Map</h1>
            <p className="text-gray-400">Find dance events near you in Chicago</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-950">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search location..." className="pl-9 bg-zinc-800 border-zinc-700" />
              </div>

              <h3 className="font-medium mb-4">Events Near You</h3>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                <div className="flex gap-3 p-3 bg-zinc-800 rounded-lg">
                  <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                    <Image
                      src="/placeholder.svg?height=100&width=100&text=Event"
                      alt="Event"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Hip Hop Showcase 2024</h4>
                    <p className="text-xs text-gray-400">Apr 20 • 0.8 miles away</p>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">The Dance Loft, Chicago</span>
                    </div>
                    <Button asChild variant="link" className="p-0 h-auto text-purple-500 text-xs">
                      <Link href="/events/1">View Event</Link>
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-zinc-800 rounded-lg">
                  <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                    <Image
                      src="/placeholder.svg?height=100&width=100&text=Event"
                      alt="Event"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Breakdance Workshop</h4>
                    <p className="text-xs text-gray-400">Apr 22 • 1.2 miles away</p>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">Urban Dance Studio, Chicago</span>
                    </div>
                    <Button asChild variant="link" className="p-0 h-auto text-purple-500 text-xs">
                      <Link href="/events/2">View Event</Link>
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-zinc-800 rounded-lg">
                  <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                    <Image
                      src="/placeholder.svg?height=100&width=100&text=Event"
                      alt="Event"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Street Dance Battle</h4>
                    <p className="text-xs text-gray-400">Apr 25 • 1.5 miles away</p>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">The Underground, Chicago</span>
                    </div>
                    <Button asChild variant="link" className="p-0 h-auto text-purple-500 text-xs">
                      <Link href="/events/3">View Event</Link>
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-zinc-800 rounded-lg">
                  <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                    <Image
                      src="/placeholder.svg?height=100&width=100&text=Event"
                      alt="Event"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Urban Dance Fitness</h4>
                    <p className="text-xs text-gray-400">Apr 27 • 2.3 miles away</p>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">Rhythm & Flow Studio, Chicago</span>
                    </div>
                    <Button asChild variant="link" className="p-0 h-auto text-purple-500 text-xs">
                      <Link href="/events/4">View Event</Link>
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-zinc-800 rounded-lg">
                  <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                    <Image
                      src="/placeholder.svg?height=100&width=100&text=Event"
                      alt="Event"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Freestyle Cypher</h4>
                    <p className="text-xs text-gray-400">Apr 27 • 3.1 miles away</p>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">The Spot, Chicago</span>
                    </div>
                    <Button asChild variant="link" className="p-0 h-auto text-purple-500 text-xs">
                      <Link href="/events/5">View Event</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-900 border-zinc-800 h-[700px] overflow-hidden">
              <CardContent className="p-0 h-full">
                <div className="relative w-full h-full">
                  <Image
                    src="/placeholder.svg?height=700&width=1000&text=Interactive+Map+of+Chicago"
                    alt="Map of Chicago"
                    width={1000}
                    height={700}
                    className="w-full h-full object-cover"
                  />

                  {/* Map Markers */}
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative group">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-zinc-800 rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <h4 className="font-medium text-sm">Hip Hop Showcase 2024</h4>
                        <p className="text-xs text-gray-400">Apr 20 • The Dance Loft</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative group">
                      <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-zinc-800 rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <h4 className="font-medium text-sm">Breakdance Workshop</h4>
                        <p className="text-xs text-gray-400">Apr 22 • Urban Dance Studio</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative group">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-zinc-800 rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <h4 className="font-medium text-sm">Street Dance Battle</h4>
                        <p className="text-xs text-gray-400">Apr 25 • The Underground</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative group">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center cursor-pointer">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-zinc-800 rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <h4 className="font-medium text-sm">Urban Dance Fitness</h4>
                        <p className="text-xs text-gray-400">Apr 27 • Rhythm & Flow Studio</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative group">
                      <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center cursor-pointer">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-zinc-800 rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <h4 className="font-medium text-sm">Freestyle Cypher</h4>
                        <p className="text-xs text-gray-400">Apr 27 • The Spot</p>
                      </div>
                    </div>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button size="icon" className="bg-zinc-800 hover:bg-zinc-700 h-8 w-8">
                      <span className="text-lg">+</span>
                    </Button>
                    <Button size="icon" className="bg-zinc-800 hover:bg-zinc-700 h-8 w-8">
                      <span className="text-lg">-</span>
                    </Button>
                  </div>

                  {/* Current Location */}
                  <Button className="absolute bottom-4 right-4 bg-zinc-800 hover:bg-zinc-700">
                    <MapPin className="h-4 w-4 mr-2" />
                    Use My Location
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
