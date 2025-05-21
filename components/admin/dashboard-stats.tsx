import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Users, Clock, ThumbsUp } from "lucide-react"

interface DashboardStatsProps {
  eventsCount: number
  usersCount: number
  pendingEventsCount: number
  rsvpsCount: number
}

export function DashboardStats({ eventsCount, usersCount, pendingEventsCount, rsvpsCount }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          <CalendarDays className="h-4 w-4 text-teal-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{eventsCount}</div>
          <p className="text-xs text-gray-400">Published and pending events</p>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usersCount}</div>
          <p className="text-xs text-gray-400">Registered users on the platform</p>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          <Clock className="h-4 w-4 text-cyan-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingEventsCount}</div>
          <p className="text-xs text-gray-400">Events waiting for approval</p>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total RSVPs</CardTitle>
          <ThumbsUp className="h-4 w-4 text-lime-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{rsvpsCount}</div>
          <p className="text-xs text-gray-400">Event RSVPs across the platform</p>
        </CardContent>
      </Card>
    </div>
  )
}
