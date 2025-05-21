import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/server"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentEvents } from "@/components/admin/recent-events"
import { PendingApprovals } from "@/components/admin/pending-approvals"

export default async function AdminDashboard() {
  const supabase = createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user?.id).single()

  // Get stats
  const { data: eventsCount } = await supabase.from("events").select("*", { count: "exact", head: true })

  const { data: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  const { data: pendingEventsCount } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { data: rsvpsCount } = await supabase.from("rsvps").select("*", { count: "exact", head: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-400">Welcome back, {profile?.full_name || user?.email}</p>
      </div>

      <DashboardStats
        eventsCount={eventsCount?.count || 0}
        usersCount={usersCount?.count || 0}
        pendingEventsCount={pendingEventsCount?.count || 0}
        rsvpsCount={rsvpsCount?.count || 0}
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Recently created or updated events</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentEvents />
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Events waiting for approval</CardDescription>
              </CardHeader>
              <CardContent>
                <PendingApprovals />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed analytics about your events and users</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Analytics dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and download reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Reports dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
