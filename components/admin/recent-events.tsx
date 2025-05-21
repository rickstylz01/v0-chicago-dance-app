import { createClient } from "@/lib/supabase/server"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export async function RecentEvents() {
  const supabase = createClient()

  const { data: events } = await supabase
    .from("events")
    .select(`
      id,
      title,
      status,
      start_time,
      created_at,
      updated_at,
      organizer:profiles(full_name)
    `)
    .order("updated_at", { ascending: false })
    .limit(5)

  if (!events || events.length === 0) {
    return <p className="text-gray-400">No recent events found.</p>
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex items-center justify-between border-b border-zinc-800 pb-4 last:border-0 last:pb-0"
        >
          <div className="space-y-1">
            <Link href={`/admin/events/${event.id}`} className="font-medium hover:text-teal-500 transition-colors">
              {event.title}
            </Link>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>By {event.organizer?.full_name || "Unknown"}</span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(event.updated_at), { addSuffix: true })}</span>
            </div>
          </div>
          <Badge
            variant={event.status === "published" ? "default" : event.status === "pending" ? "outline" : "destructive"}
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
      ))}
    </div>
  )
}
