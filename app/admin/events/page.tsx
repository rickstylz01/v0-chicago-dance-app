"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { EventsTable } from "@/components/admin/events-table"

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; page?: string }
}) {
  const supabase = createClient()

  const query = searchParams.q || ""
  const status = searchParams.status || "all"
  const page = Number.parseInt(searchParams.page || "1")
  const limit = 10

  let eventsQuery = supabase
    .from("events")
    .select(
      `
      *,
      organizer:profiles(id, full_name),
      location:locations(name, city, state)
    `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (status !== "all") {
    eventsQuery = eventsQuery.eq("status", status)
  }

  if (query) {
    eventsQuery = eventsQuery.ilike("title", `%${query}%`)
  }

  const { data: events, count } = await eventsQuery

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <Button asChild className="bg-teal-600 hover:bg-teal-700">
          <Link href="/admin/events/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <form>
            <Input
              name="q"
              placeholder="Search events..."
              className="pl-9 bg-zinc-900 border-zinc-800"
              defaultValue={query}
            />
          </form>
        </div>
        <select
          name="status"
          className="h-10 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm"
          defaultValue={status}
          onChange={(e) => {
            const url = new URL(window.location.href)
            url.searchParams.set("status", e.target.value)
            window.location.href = url.toString()
          }}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <EventsTable events={events || []} />

      {count && count > limit && (
        <div className="flex items-center justify-center space-x-2 py-4">
          {page > 1 && (
            <Button variant="outline" className="border-zinc-800 hover:bg-zinc-800" asChild>
              <Link
                href={{
                  pathname: "/admin/events",
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
                  pathname: "/admin/events",
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
      )}
    </div>
  )
}
