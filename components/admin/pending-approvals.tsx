import { createClient } from "@/lib/supabase/server"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export async function PendingApprovals() {
  const supabase = createClient()

  const { data: events } = await supabase
    .from("events")
    .select(`
      id,
      title,
      created_at,
      organizer:profiles(full_name)
    `)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(5)

  if (!events || events.length === 0) {
    return <p className="text-gray-400">No pending approvals.</p>
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
              <span>Submitted {formatDistanceToNow(new Date(event.created_at), { addSuffix: true })}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-red-500 text-red-500 hover:bg-red-900/20">
              <X className="h-4 w-4" />
              <span className="sr-only">Reject</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 border-teal-500 text-teal-500 hover:bg-teal-900/20"
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Approve</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
