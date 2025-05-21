"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createEvent, updateEvent } from "@/app/actions/events"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location_id: z.string().optional(),
  start_time: z.date({
    required_error: "Start time is required.",
  }),
  end_time: z.date({
    required_error: "End time is required.",
  }),
  price_range: z.string().optional(),
  cover_image: z.string().optional(),
  has_live_dj: z.boolean().default(false),
  is_beginner_friendly: z.boolean().default(false),
  has_open_floor: z.boolean().default(false),
  age_restriction: z.string().optional(),
  dress_code: z.string().optional(),
  dance_styles: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
})

interface EventFormProps {
  event?: any
  locations: { id: string; name: string; city: string; state: string }[]
  danceStyles: { id: string; name: string }[]
}

export function EventForm({ event, locations, danceStyles }: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: event
      ? {
          title: event.title,
          description: event.description,
          location_id: event.location_id || undefined,
          start_time: new Date(event.start_time),
          end_time: new Date(event.end_time),
          price_range: event.price_range || "",
          cover_image: event.cover_image || "",
          has_live_dj: event.has_live_dj || false,
          is_beginner_friendly: event.is_beginner_friendly || false,
          has_open_floor: event.has_open_floor || false,
          age_restriction: event.age_restriction || "",
          dress_code: event.dress_code || "",
          dance_styles: event.dance_styles || [],
          tags: event.tags?.map((t: any) => t.tag.name) || [],
        }
      : {
          title: "",
          description: "",
          location_id: undefined,
          start_time: new Date(),
          end_time: new Date(new Date().setHours(new Date().getHours() + 3)),
          price_range: "",
          cover_image: "",
          has_live_dj: false,
          is_beginner_friendly: false,
          has_open_floor: false,
          age_restriction: "",
          dress_code: "",
          dance_styles: [],
          tags: [],
        },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      if (event) {
        // Update existing event
        await updateEvent(event.id, values)
        router.push(`/admin/events/${event.id}`)
      } else {
        // Create new event
        const result = await createEvent(values)
        router.push(`/admin/events/${result.eventId}`)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to save event. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event title" className="bg-zinc-900 border-zinc-800" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-zinc-900 border-zinc-800">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}, {location.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter event description"
                  className="min-h-32 bg-zinc-900 border-zinc-800"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Time</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal bg-zinc-900 border-zinc-800",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? format(field.value, "PPP p") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    <div className="p-3 border-t border-zinc-800">
                      <Input
                        type="time"
                        className="bg-zinc-900 border-zinc-800"
                        value={field.value ? format(field.value, "HH:mm") : ""}
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value.split(":")
                          const newDate = new Date(field.value)
                          newDate.setHours(Number.parseInt(hours, 10))
                          newDate.setMinutes(Number.parseInt(minutes, 10))
                          field.onChange(newDate)
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Time</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal bg-zinc-900 border-zinc-800",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? format(field.value, "PPP p") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    <div className="p-3 border-t border-zinc-800">
                      <Input
                        type="time"
                        className="bg-zinc-900 border-zinc-800"
                        value={field.value ? format(field.value, "HH:mm") : ""}
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value.split(":")
                          const newDate = new Date(field.value)
                          newDate.setHours(Number.parseInt(hours, 10))
                          newDate.setMinutes(Number.parseInt(minutes, 10))
                          field.onChange(newDate)
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="price_range"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Range</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. $10 - $25 or Free" className="bg-zinc-900 border-zinc-800" {...field} />
                </FormControl>
                <FormDescription>Enter the price range or "Free" if the event is free</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age_restriction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age Restriction</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                  <FormControl>
                    <SelectTrigger className="bg-zinc-900 border-zinc-800">
                      <SelectValue placeholder="Select age restriction" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="none">No Restriction</SelectItem>
                    <SelectItem value="18+">18+</SelectItem>
                    <SelectItem value="21+">21+</SelectItem>
                    <SelectItem value="All Ages">All Ages</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="cover_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" className="bg-zinc-900 border-zinc-800" {...field} />
              </FormControl>
              <FormDescription>Enter a URL for the event cover image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="has_live_dj"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-800 p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Live DJ</FormLabel>
                  <FormDescription>This event features a live DJ</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_beginner_friendly"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-800 p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Beginner Friendly</FormLabel>
                  <FormDescription>This event is suitable for beginners</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="has_open_floor"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-800 p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Open Floor</FormLabel>
                  <FormDescription>This event has an open floor session</FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dress_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dress Code</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Casual, Formal, etc." className="bg-zinc-900 border-zinc-800" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" className="border-zinc-800" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {event ? "Updating..." : "Creating..."}
              </>
            ) : event ? (
              "Update Event"
            ) : (
              "Create Event"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
