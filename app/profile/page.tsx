import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/profile/profile-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRsvps } from "@/components/profile/user-rsvps"
import { UserEvents } from "@/components/profile/user-events"

export default async function ProfilePage() {
  const supabase = createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get dance styles
  const { data: danceStyles } = await supabase.from("dance_styles").select("id, name").order("name")

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-zinc-900 border-zinc-800">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="events">Your Events</TabsTrigger>
          <TabsTrigger value="rsvps">Your RSVPs</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm user={user} profile={profile} danceStyles={danceStyles || []} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle>Your Events</CardTitle>
              <CardDescription>Events you've created or organized</CardDescription>
            </CardHeader>
            <CardContent>
              <UserEvents userId={user.id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rsvps">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle>Your RSVPs</CardTitle>
              <CardDescription>Events you've RSVP'd to</CardDescription>
            </CardHeader>
            <CardContent>
              <UserRsvps userId={user.id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
