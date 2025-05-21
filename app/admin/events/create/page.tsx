import { EventForm } from "@/components/admin/event-form"
import { createClient } from "@/lib/supabase/server"

export default async function CreateEventPage() {
  const supabase = createClient()

  // Fetch locations for the dropdown
  const { data: locations } = await supabase.from("locations").select("id, name, city, state").order("name")

  // Fetch dance styles for the dropdown
  const { data: danceStyles } = await supabase.from("dance_styles").select("id, name").order("name")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Event</h1>
        <p className="text-gray-400">Create a new event for approval</p>
      </div>

      <EventForm locations={locations || []} danceStyles={danceStyles || []} />
    </div>
  )
}
