import { EventCard } from "./event-card"
import { createClient } from "@/lib/supabase/server"

export async function LastMinuteBoard() {
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
    .eq("is_last_minute", true)
    .order("start_time", { ascending: true })
    .limit(3)

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
        date: "Today",
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

  // If no last minute events, use sample data
  if (!formattedEvents.length) {
    // Sample data for demonstration
    const lastMinuteEvents = [
      {
        id: "5",
        title: "Freestyle Cypher at The Spot",
        date: "Today",
        time: "10:00 PM",
        location: "The Spot, 555 Jackson Blvd, Chicago",
        image: "/placeholder.svg?height=300&width=500&text=Freestyle+Cypher",
        tags: ["Freestyle", "Cypher", "Hip Hop"],
        attendees: 28,
        hasLiveDJ: true,
        isBeginnerFriendly: true,
        hasOpenFloor: true,
      },
      {
        id: "6",
        title: "Late Night Dance Session",
        date: "Today",
        time: "11:30 PM",
        location: "Midnight Studio, 777 Adams St, Chicago",
        image: "/placeholder.svg?height=300&width=500&text=Late+Night+Dance",
        tags: ["Late Night", "Open Session", "All Styles"],
        attendees: 15,
        hasLiveDJ: false,
        isBeginnerFriendly: true,
        hasOpenFloor: true,
      },
      {
        id: "7",
        title: "Pop-Up Dance Party",
        date: "Today",
        time: "9:00 PM",
        location: "Secret Location (Check RSVP for details)",
        image: "/placeholder.svg?height=300&width=500&text=Pop-Up+Dance+Party",
        tags: ["Pop-Up", "Party", "Urban"],
        attendees: 42,
        hasLiveDJ: true,
        isBeginnerFriendly: false,
        hasOpenFloor: true,
      },
    ]

    return (
      <div className="grid gap-6 md:grid-cols-3">
        {lastMinuteEvents.map((event) => (
          <EventCard key={event.id} event={event} lastMinute={true} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {formattedEvents.map((event) => (
        <EventCard key={event.id} event={event} lastMinute={true} />
      ))}
    </div>
  )
}
