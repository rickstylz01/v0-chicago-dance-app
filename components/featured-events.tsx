import { EventCard } from "./event-card"
import { createClient } from "@/lib/supabase/server"

export async function FeaturedEvents() {
  const supabase = createClient()

  const { data: events } = await supabase
    .from("events")
    .select(`
      id,
      title,
      start_time,
      location_id,
      cover_image,
      has_live_dj,
      is_beginner_friendly,
      has_open_floor,
      locations(name, city, state)
    `)
    .eq("status", "published")
    .eq("is_featured", true)
    .order("start_time", { ascending: true })
    .limit(4)

  // Get the tags for each event
  const eventIds = events?.map((event) => event.id) || []
  const { data: eventTags } = await supabase
    .from("event_tags_junction")
    .select(`
      event_id,
      event_tags(name)
    `)
    .in("event_id", eventIds)

  // Get the RSVP count for each event - fixed the query
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
        date: startTime.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        time: startTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        location: event.locations ? `${event.locations.name}, ${event.locations.city}` : "No location",
        image: event.cover_image || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(event.title)}`,
        tags: eventTagsList,
        attendees: Number(attendees),
        hasLiveDJ: event.has_live_dj,
        isBeginnerFriendly: event.is_beginner_friendly,
        hasOpenFloor: event.has_open_floor,
      }
    }) || []

  // If no featured events, use sample data
  if (!formattedEvents.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No featured events available at this time.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {formattedEvents.map((event) => (
        <EventCard key={event.id} event={event} featured={true} />
      ))}
    </div>
  )
}
