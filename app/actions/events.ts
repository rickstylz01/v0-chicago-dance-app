"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type EventFormData = {
  title: string
  description: string
  location_id?: string
  start_time: string
  end_time: string
  price_range?: string
  cover_image?: string
  has_live_dj: boolean
  is_beginner_friendly: boolean
  has_open_floor: boolean
  age_restriction?: string
  dress_code?: string
  amenities?: string[]
  dance_styles?: string[]
  tags?: string[]
}

export async function createEvent(formData: EventFormData) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to create an event")
  }

  // Check if user is an organizer
  const { data: profile } = await supabase.from("profiles").select("is_organizer, is_admin").eq("id", user.id).single()

  if (!profile || (!profile.is_organizer && !profile.is_admin)) {
    throw new Error("You must be an organizer to create events")
  }

  // Insert the event
  const { data: event, error } = await supabase
    .from("events")
    .insert({
      title: formData.title,
      description: formData.description,
      organizer_id: user.id,
      location_id: formData.location_id || null,
      start_time: formData.start_time,
      end_time: formData.end_time,
      price_range: formData.price_range || null,
      cover_image: formData.cover_image || null,
      status: "pending", // New events are pending by default
      has_live_dj: formData.has_live_dj,
      is_beginner_friendly: formData.is_beginner_friendly,
      has_open_floor: formData.has_open_floor,
      age_restriction: formData.age_restriction || null,
      dress_code: formData.dress_code || null,
      amenities: formData.amenities || [],
      dance_styles: formData.dance_styles || [],
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Error creating event: ${error.message}`)
  }

  // If tags are provided, add them to the event
  if (formData.tags && formData.tags.length > 0 && event) {
    // First, ensure all tags exist in the event_tags table
    for (const tagName of formData.tags) {
      // Check if tag exists
      const { data: existingTag } = await supabase.from("event_tags").select("id").eq("name", tagName).single()

      if (!existingTag) {
        // Create the tag if it doesn't exist
        const { data: newTag, error: tagError } = await supabase
          .from("event_tags")
          .insert({ name: tagName })
          .select()
          .single()

        if (tagError) {
          console.error(`Error creating tag ${tagName}:`, tagError)
          continue
        }

        // Link the tag to the event
        if (newTag) {
          await supabase.from("event_tags_junction").insert({
            event_id: event.id,
            tag_id: newTag.id,
          })
        }
      } else {
        // Link the existing tag to the event
        await supabase.from("event_tags_junction").insert({
          event_id: event.id,
          tag_id: existingTag.id,
        })
      }
    }
  }

  revalidatePath("/events")
  revalidatePath("/admin/events")

  return { success: true, eventId: event?.id }
}

export async function updateEvent(eventId: string, formData: EventFormData) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to update an event")
  }

  // Check if user is the organizer or an admin
  const { data: event } = await supabase.from("events").select("organizer_id").eq("id", eventId).single()

  if (!event) {
    throw new Error("Event not found")
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (event.organizer_id !== user.id && (!profile || !profile.is_admin)) {
    throw new Error("You do not have permission to update this event")
  }

  // Update the event
  const { error } = await supabase
    .from("events")
    .update({
      title: formData.title,
      description: formData.description,
      location_id: formData.location_id || null,
      start_time: formData.start_time,
      end_time: formData.end_time,
      price_range: formData.price_range || null,
      cover_image: formData.cover_image || null,
      has_live_dj: formData.has_live_dj,
      is_beginner_friendly: formData.is_beginner_friendly,
      has_open_floor: formData.has_open_floor,
      age_restriction: formData.age_restriction || null,
      dress_code: formData.dress_code || null,
      amenities: formData.amenities || [],
      dance_styles: formData.dance_styles || [],
      updated_at: new Date().toISOString(),
    })
    .eq("id", eventId)

  if (error) {
    throw new Error(`Error updating event: ${error.message}`)
  }

  // If tags are provided, update them
  if (formData.tags) {
    // First, remove all existing tag associations
    await supabase.from("event_tags_junction").delete().eq("event_id", eventId)

    // Then add the new tags
    for (const tagName of formData.tags) {
      // Check if tag exists
      const { data: existingTag } = await supabase.from("event_tags").select("id").eq("name", tagName).single()

      if (!existingTag) {
        // Create the tag if it doesn't exist
        const { data: newTag, error: tagError } = await supabase
          .from("event_tags")
          .insert({ name: tagName })
          .select()
          .single()

        if (tagError) {
          console.error(`Error creating tag ${tagName}:`, tagError)
          continue
        }

        // Link the tag to the event
        if (newTag) {
          await supabase.from("event_tags_junction").insert({
            event_id: eventId,
            tag_id: newTag.id,
          })
        }
      } else {
        // Link the existing tag to the event
        await supabase.from("event_tags_junction").insert({
          event_id: eventId,
          tag_id: existingTag.id,
        })
      }
    }
  }

  revalidatePath(`/events/${eventId}`)
  revalidatePath("/events")
  revalidatePath("/admin/events")

  return { success: true }
}

export async function deleteEvent(eventId: string) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to delete an event")
  }

  // Check if user is the organizer or an admin
  const { data: event } = await supabase.from("events").select("organizer_id").eq("id", eventId).single()

  if (!event) {
    throw new Error("Event not found")
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (event.organizer_id !== user.id && (!profile || !profile.is_admin)) {
    throw new Error("You do not have permission to delete this event")
  }

  // Delete the event
  const { error } = await supabase.from("events").delete().eq("id", eventId)

  if (error) {
    throw new Error(`Error deleting event: ${error.message}`)
  }

  revalidatePath("/events")
  revalidatePath("/admin/events")

  return { success: true }
}

export async function publishEvent(eventId: string) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to publish an event")
  }

  // Check if user is an admin
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile || !profile.is_admin) {
    throw new Error("Only admins can publish events")
  }

  // Update the event status
  const { error } = await supabase
    .from("events")
    .update({
      status: "published",
      updated_at: new Date().toISOString(),
    })
    .eq("id", eventId)

  if (error) {
    throw new Error(`Error publishing event: ${error.message}`)
  }

  revalidatePath(`/events/${eventId}`)
  revalidatePath("/events")
  revalidatePath("/admin/events")

  return { success: true }
}

export async function getEvents(
  options: {
    page?: number
    limit?: number
    featured?: boolean
    lastMinute?: boolean
    status?: string
    organizerId?: string
  } = {},
) {
  const { page = 1, limit = 10, featured = false, lastMinute = false, status = "published", organizerId } = options

  const supabase = createClient()

  let query = supabase
    .from("events")
    .select(`
      *,
      location:locations(*),
      organizer:profiles(id, username, full_name, avatar_url),
      tags:event_tags_junction(tag:event_tags(*))
    `)
    .eq("status", status)
    .order("start_time", { ascending: true })
    .range((page - 1) * limit, page * limit - 1)

  if (featured) {
    query = query.eq("is_featured", true)
  }

  if (lastMinute) {
    query = query.eq("is_last_minute", true)
  }

  if (organizerId) {
    query = query.eq("organizer_id", organizerId)
  }

  const { data, error, count } = await query

  if (error) {
    throw new Error(`Error fetching events: ${error.message}`)
  }

  return {
    events: data || [],
    count,
  }
}

export async function getEvent(eventId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("events")
    .select(`
      *,
      location:locations(*),
      organizer:profiles(id, username, full_name, avatar_url),
      tags:event_tags_junction(tag:event_tags(*)),
      images:event_images(*)
    `)
    .eq("id", eventId)
    .single()

  if (error) {
    throw new Error(`Error fetching event: ${error.message}`)
  }

  return data
}

export async function rsvpToEvent(eventId: string, status: "attending" | "maybe" | "not_attending") {
  const supabase = createClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to RSVP to an event")
  }

  // Check if user already has an RSVP for this event
  const { data: existingRsvp } = await supabase
    .from("rsvps")
    .select("id, status")
    .eq("event_id", eventId)
    .eq("user_id", user.id)
    .single()

  if (existingRsvp) {
    // Update existing RSVP
    const { error } = await supabase
      .from("rsvps")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingRsvp.id)

    if (error) {
      throw new Error(`Error updating RSVP: ${error.message}`)
    }
  } else {
    // Create new RSVP
    const { error } = await supabase.from("rsvps").insert({
      event_id: eventId,
      user_id: user.id,
      status,
    })

    if (error) {
      throw new Error(`Error creating RSVP: ${error.message}`)
    }
  }

  revalidatePath(`/events/${eventId}`)

  return { success: true }
}

export async function getUserRsvpStatus(eventId: string) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data } = await supabase.from("rsvps").select("status").eq("event_id", eventId).eq("user_id", user.id).single()

  return data?.status || null
}

export async function getEventRsvps(eventId: string) {
  const supabase = createClient()

  const { data, error, count } = await supabase
    .from("rsvps")
    .select("*, user:profiles(id, username, full_name, avatar_url)", { count: "exact" })
    .eq("event_id", eventId)

  if (error) {
    throw new Error(`Error fetching RSVPs: ${error.message}`)
  }

  return {
    rsvps: data || [],
    count,
  }
}
