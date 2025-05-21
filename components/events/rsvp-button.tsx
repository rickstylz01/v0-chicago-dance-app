"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { rsvpToEvent, getUserRsvpStatus } from "@/app/actions/events"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface RsvpButtonProps {
  eventId: string
}

export function RsvpButton({ eventId }: RsvpButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [rsvpStatus, setRsvpStatus] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      setIsLoggedIn(!!data.session)

      if (data.session) {
        // Get user's RSVP status for this event
        try {
          const status = await getUserRsvpStatus(eventId)
          setRsvpStatus(status)
        } catch (error) {
          console.error("Error getting RSVP status:", error)
        }
      }
    }

    checkAuth()
  }, [eventId, supabase])

  const handleRsvp = async (status: "attending" | "maybe" | "not_attending") => {
    if (!isLoggedIn) {
      router.push(`/login?redirectTo=/events/${eventId}`)
      return
    }

    setIsLoading(true)
    try {
      await rsvpToEvent(eventId, status)
      setRsvpStatus(status)
      router.refresh()
    } catch (error) {
      console.error("Error RSVPing to event:", error)
      alert("Failed to RSVP to event. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 mb-3">
        <Link href={`/login?redirectTo=/events/${eventId}`}>Sign in to RSVP</Link>
      </Button>
    )
  }

  if (rsvpStatus === "attending") {
    return (
      <Button
        className="w-full bg-teal-600 hover:bg-teal-700 mb-3"
        disabled={isLoading}
        onClick={() => handleRsvp("not_attending")}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        You're Going! (Click to Cancel)
      </Button>
    )
  }

  if (rsvpStatus === "maybe") {
    return (
      <Button
        className="w-full bg-amber-600 hover:bg-amber-700 mb-3"
        disabled={isLoading}
        onClick={() => handleRsvp("attending")}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Maybe Going (Click to Confirm)
      </Button>
    )
  }

  return (
    <Button
      className="w-full bg-teal-600 hover:bg-teal-700 mb-3"
      disabled={isLoading}
      onClick={() => handleRsvp("attending")}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      RSVP Now
    </Button>
  )
}
