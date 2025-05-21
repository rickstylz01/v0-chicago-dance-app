import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { CalendarDays, MapPin } from "lucide-react"

interface UserRsvpsProps {
  userId: string
}

export async function UserRsvps({ userId }: UserRsvpsProps) {
  const supabase = createClient()

  const { data: rsvps } = await supabase
    .from("rsvps")
    .select(`
      id,
      status,
      event:events(
        id,
        title,
        start_time,
        location_id,
        locations(name, city, state)
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (!rsvps || rsvps.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 mb-4">You haven't RSVP'd to any events yet.</p>
        <Button asChild className="bg-teal-600 hover:bg-teal-700">
          <Link href="/events">Browse Events</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {rsvps.map((rsvp) => (
        <div
          key={rsvp.id}
          className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-zinc-800 rounded-lg"
        >
          <div className="space-y-2 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{rsvp.event.title}</h3>
              <Badge
                variant={rsvp.status === "attending" ? "default" : rsvp.status === "maybe" ? "outline" : "destructive"}
                className={
                  rsvp.status === "attending"
                    ? "bg-teal-900/50 text-teal-400 hover:bg-teal-900/70 border-teal-800"
                    : rsvp.status === "maybe"
                      ? "bg-amber-900/50 text-amber-400 hover:bg-amber-900/70 border-amber-800"
                      : "bg-red-900/50 text-red-400 hover:bg-red-900/70 border-red-800"
                }
              >
                {rsvp.status.charAt(0).toUpperCase() + rsvp.status.slice(1)}
              </Badge>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" />
                {format(new Date(rsvp.event.start_time), "MMM d, yyyy 'at' h:mm a")}
              </div>
              {rsvp.event.locations && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {rsvp.event.locations.name}, {rsvp.event.locations.city}
                </div>
              )}
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="border-zinc-700">
            <Link href={`/events/${rsvp.event.id}`}>View Event</Link>
          </Button>
        </div>
      ))}
    </div>
  )
}
