import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarDays, Grid3X3, List, MapPin, Search } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { EventFilters } from "@/components/event-filters"
import { SortDropdown } from "@/components/events/sort-dropdown"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"

export default async function EventsPage({
  searchParams,
}: {
  searchParams?: { q?: string; style?: string; page?: string; sort?: string }
}) {
  const supabase = createClient()

  const query = searchParams?.q || ""
  const style = searchParams?.style || ""
  const page = Number.parseInt(searchParams?.page || "1")
  const sort = searchParams?.sort || "date"
  const limit = 9

  // Fetch events
  let eventsQuery = supabase
    .from("events")
    .select(
      `
      id,
      title,
      start_time,
      location_id,
      cover_image,
      has_live_dj,
      is_beginner_friendly,
      has_open_floor,
      locations(name, city, state)
    `,
      { count: "exact" },
    )
    .eq("status", "published")

  // Apply sorting
  if (sort === "date") {
    eventsQuery = eventsQuery.order("start_time", { ascending: true })
  } else if (sort === "popularity") {
    // For now, we'll just sort by id as a placeholder
    eventsQuery = eventsQuery.order("id", { ascending: false })
  } else if (sort === "rating") {
    // For now, we'll just sort by id as a placeholder
    eventsQuery = eventsQuery.order("id", { ascending: false })
  }

  // Apply pagination
  eventsQuery = eventsQuery.range((page - 1) * limit, page * limit - 1)

  if (query) {
    eventsQuery = eventsQuery.ilike("title", `%${query}%`)
  }

  if (style) {
    // Get the dance style ID
    const { data: danceStyle } = await supabase.from("dance_styles").select("id").eq("name", style).single()

    if (danceStyle) {
      eventsQuery = eventsQuery.contains("dance_styles", [danceStyle.id])
    }
  }

  const { data: events, count } = await eventsQuery

  // Get the tags for each event
  const eventIds = events?.map((event) => event.id) || []
  const { data: eventTags } = await supabase
    .from("event_tags_junction")
    .select(`
      event_id,
      event_tags(name)
    `)
    .in("event_id", eventIds)

  // Get the RSVP count for each event
  const { data: rsvps } = await supabase
    .from("rsvps")
    .select("event_id, status")
    .in("event_id", eventIds)
    .eq("status", "attending")

  // Count RSVPs manually
  const rsvpCounts = eventIds.map((id) => {
    const count = rsvps?.filter((rsvp) => rsvp.event_id === id).length || 0
    return { event_id: id, count }
  })

  // Get dance styles for filters
  const { data: danceStyles } = await supabase.from("dance_styles").select("name").order("name")

  // Format the events for the EventCard component
  const formattedEvents =
    events?.map((event) => {
      const eventTagsList =
        eventTags?.filter((tag) => tag.event_id === event.id).map((tag) => tag.event_tags.name) || []

      const attendees = rsvpCounts.find((rsvp) => rsvp.event_id === event.id)?.count || 0

      const startTime = new Date(event.start_time)

      return {
        id: event.id,
        title: event.title,
        date: format(startTime, "MMM d, yyyy"),
        time: format(startTime, "h:mm a"),
        location: event.locations ? `${event.locations.name}, ${event.locations.city}` : "No location",
        image: event.cover_image || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(event.title)}`,
        tags: eventTagsList,
        attendees: Number(attendees),
        hasLiveDJ: event.has_live_dj,
        isBeginnerFriendly: event.is_beginner_friendly,
        hasOpenFloor: event.has_open_floor,
      }
    }) || []

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="container px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter mb-2">Events</h1>
            <p className="text-gray-400">Find and RSVP to dance events in Chicago</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-950/30" asChild>
              <Link href="/calendar">
                <CalendarDays className="h-4 w-4 mr-2" />
                Calendar View
              </Link>
            </Button>
            <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-950/30" asChild>
              <Link href="/map">
                <MapPin className="h-4 w-4 mr-2" />
                Map View
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <EventFilters danceStyles={danceStyles?.map((style) => style.name) || []} />
          </div>

          {/* Events List */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <form>
                  <Input
                    name="q"
                    placeholder="Search events..."
                    className="pl-9 bg-zinc-900 border-zinc-800 w-full md:w-[300px]"
                    defaultValue={query}
                  />
                </form>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Grid3X3 className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
                <SortDropdown />
              </div>
            </div>

            {formattedEvents.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No events found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                <Button asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/events">View All Events</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {formattedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}

            {count && count > limit && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center justify-center space-x-2 py-4">
                  {page > 1 && (
                    <Button variant="outline" className="border-zinc-800 hover:bg-zinc-800" asChild>
                      <Link
                        href={{
                          pathname: "/events",
                          query: {
                            ...searchParams,
                            page: page - 1,
                          },
                        }}
                      >
                        Previous
                      </Link>
                    </Button>
                  )}
                  <span className="text-sm text-gray-400">
                    Page {page} of {Math.ceil(count / limit)}
                  </span>
                  {page < Math.ceil(count / limit) && (
                    <Button variant="outline" className="border-zinc-800 hover:bg-zinc-800" asChild>
                      <Link
                        href={{
                          pathname: "/events",
                          query: {
                            ...searchParams,
                            page: page + 1,
                          },
                        }}
                      >
                        Next
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
