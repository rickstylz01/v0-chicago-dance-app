import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { CalendarDays, MapPin, Pencil } from "lucide-react"

interface UserEventsProps {
  userId: string
}

export async function UserEvents({ userId }: UserEventsProps) {
  const supabase = createClient()

  const { data: events } = await supabase
    .from("events")
    .select(`
      id,
      title,
      start_time,
      status,
      location_id,
      locations(name, city, state)
    `)
    .eq("organizer_id", userId)
    .order("start_time", { ascending: false })

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 mb-4">You haven't created any events yet.</p>
        <Button asChild className="bg-teal-600 hover:bg-teal-700">
          <Link href="/admin/events/create">Create Your First Event</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-zinc-800 rounded-lg"
        >
          <div className="space-y-2 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{event.title}</h3>
              <Badge
                variant={
                  event.status === "published" ? "default" : event.status === "pending" ? "outline" : "destructive"
                }
                className={
                  event.status === "published"
                    ? "bg-teal-900/50 text-teal-400 hover:bg-teal-900/70 border-teal-800"
                    : event.status === "pending"
                      ? "bg-amber-900/50 text-amber-400 hover:bg-amber-900/70 border-amber-800"
                      : "bg-red-900/50 text-red-400 hover:bg-red-900/70 border-red-800"
                }
              >
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" />
                {format(new Date(event.start_time), "MMM d, yyyy 'at' h:mm a")}
              </div>
              {event.locations && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.locations.name}, {event.locations.city}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="border-zinc-700">
              <Link href={`/events/${event.id}`}>View</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-zinc-700">
              <Link href={`/admin/events/${event.id}/edit`}>
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
