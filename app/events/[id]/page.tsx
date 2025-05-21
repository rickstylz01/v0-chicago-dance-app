import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, MapPin, Music, Share2, Star, ThumbsUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EventReviews } from "@/components/event-reviews"
import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"
import { notFound } from "next/navigation"
import { RsvpButton } from "@/components/events/rsvp-button"

export default async function EventPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  // Fetch the event
  const { data: event } = await supabase
    .from("events")
    .select(`
      *,
      organizer:profiles(id, username, full_name, avatar_url),
      location:locations(*),
      tags:event_tags_junction(tag:event_tags(*))
    `)
    .eq("id", params.id)
    .single()

  if (!event) {
    notFound()
  }

  // Get the RSVP count
  const { count: attendeesCount } = await supabase
    .from("rsvps")
    .select("*", { count: "exact", head: true })
    .eq("event_id", params.id)
    .eq("status", "attending")

  // Get similar events
  const { data: similarEvents } = await supabase
    .from("events")
    .select(`
      id,
      title,
      start_time,
      location:locations(name, city)
    `)
    .eq("status", "published")
    .neq("id", params.id)
    .limit(2)

  // Format the event data
  const formattedEvent = {
    ...event,
    formattedDate: format(new Date(event.start_time), "MMM d, yyyy"),
    formattedTime: `${format(new Date(event.start_time), "h:mm a")} - ${format(new Date(event.end_time), "h:mm a")}`,
    tags: event.tags.map((tag: any) => tag.tag.name),
    attendees: attendeesCount || 0,
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="container px-4 py-8 md:py-12">
        <div className="mb-6">
          <Link href="/events" className="text-teal-500 hover:text-teal-400 flex items-center text-sm">
            ← Back to Events
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Image */}
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src={
                  event.cover_image || `/placeholder.svg?height=600&width=1200&text=${encodeURIComponent(event.title)}`
                }
                alt={event.title}
                width={1200}
                height={600}
                className="w-full object-cover aspect-[2/1]"
              />
              {event.has_live_dj && (
                <div className="absolute top-4 left-4 bg-teal-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-md text-sm font-bold flex items-center gap-1">
                  <Music className="h-4 w-4" /> LIVE DJ
                </div>
              )}
            </div>

            {/* Event Details */}
            <div>
              <h1 className="text-3xl font-bold tracking-tighter mb-4">{event.title}</h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {formattedEvent.tags.map((tag: string, i: number) => (
                  <Badge key={i} variant="outline" className="bg-zinc-800 hover:bg-zinc-700">
                    {tag}
                  </Badge>
                ))}
                {event.is_beginner_friendly && (
                  <Badge
                    variant="outline"
                    className="bg-lime-900/30 text-lime-400 hover:bg-lime-900/50 border-lime-800"
                  >
                    Beginner Friendly
                  </Badge>
                )}
                {event.has_open_floor && (
                  <Badge
                    variant="outline"
                    className="bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50 border-cyan-800"
                  >
                    Open Floor
                  </Badge>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 mb-6">
                <div className="flex items-center text-gray-300">
                  <CalendarDays className="h-5 w-5 mr-2 text-teal-500" />
                  <div>
                    <div className="font-medium">{formattedEvent.formattedDate}</div>
                    <div className="text-sm text-gray-400">{formattedEvent.formattedTime}</div>
                  </div>
                </div>
                {event.location && (
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-5 w-5 mr-2 text-teal-500" />
                    <div>
                      <div className="font-medium">{event.location.name}</div>
                      <div className="text-sm text-gray-400">
                        {event.location.address}, {event.location.city}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-zinc-900">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="performers">Details</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-gray-300 whitespace-pre-line">{event.description}</p>

                    <div className="bg-zinc-900 rounded-lg p-4 mt-6">
                      <h3 className="font-medium mb-2">Event Details</h3>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start">
                          <span className="font-medium w-32">Price:</span>
                          <span>{event.price_range || "Free"}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium w-32">Age Restriction:</span>
                          <span>{event.age_restriction || "None"}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium w-32">Dress Code:</span>
                          <span>{event.dress_code || "Casual, comfortable for dancing"}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium w-32">Amenities:</span>
                          <span>{event.amenities?.join(", ") || "None specified"}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="performers" className="mt-4">
                  <div className="space-y-6">
                    <div className="bg-zinc-900 p-4 rounded-lg">
                      <h3 className="font-medium mb-3">Event Features</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${event.has_live_dj ? "bg-teal-500" : "bg-zinc-700"}`}
                          ></div>
                          <span className="text-sm">Live DJ</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${event.has_open_floor ? "bg-cyan-500" : "bg-zinc-700"}`}
                          ></div>
                          <span className="text-sm">Open Floor</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${event.is_beginner_friendly ? "bg-lime-500" : "bg-zinc-700"}`}
                          ></div>
                          <span className="text-sm">Beginner Friendly</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${event.price_range === "Free" ? "bg-amber-500" : "bg-zinc-700"}`}
                          ></div>
                          <span className="text-sm">Free Entry</span>
                        </div>
                      </div>
                    </div>

                    {event.location && (
                      <div className="bg-zinc-900 p-4 rounded-lg">
                        <h3 className="font-medium mb-3">Venue Information</h3>
                        <p className="text-sm text-gray-300 mb-2">
                          {event.location.description || "No venue description available."}
                        </p>
                        {event.location.website && (
                          <Button variant="link" className="p-0 h-auto text-teal-500 text-sm" asChild>
                            <a href={event.location.website} target="_blank" rel="noopener noreferrer">
                              Visit Venue Website
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                  <EventReviews eventId={params.id} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* RSVP Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-teal-500" />
                  <span className="font-medium">{formattedEvent.attendees} attending</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-amber-500 mr-1" />
                  <span className="font-medium">4.8</span>
                </div>
              </div>

              <RsvpButton eventId={params.id} />

              <Button variant="outline" className="w-full border-amber-500 text-amber-500 hover:bg-amber-950/30 mb-4">
                Add to Calendar
              </Button>

              <div className="flex justify-between">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Interested
                </Button>
              </div>
            </div>

            {/* Organizer */}
            {event.organizer && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="font-medium mb-4">Organized by</h3>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={event.organizer.avatar_url || "/placeholder.svg"}
                      alt={event.organizer.full_name}
                    />
                    <AvatarFallback>{event.organizer.full_name?.substring(0, 2) || "OR"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{event.organizer.full_name}</div>
                    <div className="text-sm text-gray-400">Event Organizer</div>
                  </div>
                </div>
                <Button variant="link" className="p-0 h-auto text-teal-500 text-sm mt-2" asChild>
                  <Link href={`/profile/${event.organizer.id}`}>View Profile</Link>
                </Button>
              </div>
            )}

            {/* Location Map */}
            {event.location && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="font-medium mb-4">Location</h3>
                <div className="aspect-video bg-zinc-800 rounded-lg mb-3 overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=300&width=500&text=Map+of+${encodeURIComponent(event.location.name)}`}
                    alt="Event location map"
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  {event.location.address}, {event.location.city}, {event.location.state}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-teal-500 text-teal-500 hover:bg-teal-950/30"
                  asChild
                >
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${event.location.address}, ${event.location.city}, ${event.location.state}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Button>
              </div>
            )}

            {/* Similar Events */}
            {similarEvents && similarEvents.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="font-medium mb-4">Similar Events</h3>
                <div className="space-y-4">
                  {similarEvents.map((similarEvent) => (
                    <div key={similarEvent.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                        <Image
                          src={`/placeholder.svg?height=100&width=100&text=Event`}
                          alt={similarEvent.title}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{similarEvent.title}</h4>
                        <p className="text-xs text-gray-400">
                          {format(new Date(similarEvent.start_time), "MMM d")} • {similarEvent.location?.name}
                        </p>
                        <Button variant="link" className="p-0 h-auto text-teal-500 text-xs" asChild>
                          <Link href={`/events/${similarEvent.id}`}>View Event</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
