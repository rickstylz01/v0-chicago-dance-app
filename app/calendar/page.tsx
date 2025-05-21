import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"
import Link from "next/link"

export default function CalendarPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="container px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter mb-2">Calendar</h1>
            <p className="text-gray-400">Browse dance events by date</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[120px] bg-zinc-900 border-zinc-800">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="agenda">Agenda</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-950">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <Card className="bg-zinc-900 border-zinc-800 lg:row-span-2">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">April 2024</h3>
                <div className="flex">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Calendar mode="single" className="rounded-md border-zinc-800" />
              <div className="mt-6 space-y-2">
                <h4 className="text-sm font-medium mb-3">Event Types</h4>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Workshops & Classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span className="text-sm">Battles & Competitions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Social Dance Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Showcases & Performances</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Last Minute Events</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Grid */}
          <div className="lg:col-span-3">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="grid grid-cols-7 gap-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium py-2">
                      {day}
                    </div>
                  ))}
                  {/* Calendar days - first week */}
                  <div className="text-center p-1 text-gray-500">26</div>
                  <div className="text-center p-1 text-gray-500">27</div>
                  <div className="text-center p-1 text-gray-500">28</div>
                  <div className="text-center p-1 text-gray-500">29</div>
                  <div className="text-center p-1 text-gray-500">30</div>
                  <div className="text-center p-1 text-gray-500">31</div>
                  <div className="text-center p-1">1</div>

                  {/* Second week */}
                  <div className="text-center p-1">2</div>
                  <div className="text-center p-1">3</div>
                  <div className="text-center p-1">4</div>
                  <div className="text-center p-1">5</div>
                  <div className="text-center p-1">6</div>
                  <div className="text-center p-1">7</div>
                  <div className="text-center p-1">8</div>

                  {/* Third week */}
                  <div className="text-center p-1">9</div>
                  <div className="text-center p-1">10</div>
                  <div className="text-center p-1">11</div>
                  <div className="text-center p-1">12</div>
                  <div className="text-center p-1">13</div>
                  <div className="text-center p-1">14</div>
                  <div className="text-center p-1">15</div>

                  {/* Fourth week */}
                  <div className="text-center p-1">16</div>
                  <div className="text-center p-1">17</div>
                  <div className="text-center p-1">18</div>
                  <div className="text-center p-1">19</div>
                  <div className="text-center p-1 relative">
                    20
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-purple-500 rounded-full"></div>
                  </div>
                  <div className="text-center p-1">21</div>
                  <div className="text-center p-1">22</div>

                  {/* Fifth week */}
                  <div className="text-center p-1 relative">
                    23
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="text-center p-1">24</div>
                  <div className="text-center p-1 relative">
                    25
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-pink-500 rounded-full"></div>
                  </div>
                  <div className="text-center p-1">26</div>
                  <div className="text-center p-1 relative">
                    27
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-center p-1">28</div>
                  <div className="text-center p-1">29</div>

                  {/* Sixth week */}
                  <div className="text-center p-1">30</div>
                  <div className="text-center p-1 text-gray-500">1</div>
                  <div className="text-center p-1 text-gray-500">2</div>
                  <div className="text-center p-1 text-gray-500">3</div>
                  <div className="text-center p-1 text-gray-500">4</div>
                  <div className="text-center p-1 text-gray-500">5</div>
                  <div className="text-center p-1 text-gray-500">6</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-3">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-3 bg-zinc-800 rounded-lg">
                    <div className="w-2 self-stretch bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Hip Hop Showcase 2024</h4>
                          <p className="text-sm text-gray-400">Apr 20, 8:00 PM - 11:30 PM</p>
                          <p className="text-sm text-gray-400">The Dance Loft, Chicago</p>
                        </div>
                        <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Link href="/events/1">View</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 p-3 bg-zinc-800 rounded-lg">
                    <div className="w-2 self-stretch bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">House Dance Social</h4>
                          <p className="text-sm text-gray-400">Apr 23, 7:00 PM - 10:00 PM</p>
                          <p className="text-sm text-gray-400">Groove Studio, Chicago</p>
                        </div>
                        <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Link href="/events/8">View</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 p-3 bg-zinc-800 rounded-lg">
                    <div className="w-2 self-stretch bg-pink-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Street Dance Battle: Chicago Edition</h4>
                          <p className="text-sm text-gray-400">Apr 25, 9:00 PM - 1:00 AM</p>
                          <p className="text-sm text-gray-400">The Underground, Chicago</p>
                        </div>
                        <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Link href="/events/3">View</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 p-3 bg-zinc-800 rounded-lg">
                    <div className="w-2 self-stretch bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Urban Dance Fitness Class</h4>
                          <p className="text-sm text-gray-400">Apr 27, 10:00 AM - 11:30 AM</p>
                          <p className="text-sm text-gray-400">Rhythm & Flow Studio, Chicago</p>
                        </div>
                        <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Link href="/events/4">View</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
