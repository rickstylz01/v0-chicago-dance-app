"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Pencil, MoreVertical, Trash2, Check } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { publishEvent, deleteEvent } from "@/app/actions/events"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface EventsTableProps {
  events: any[]
}

export function EventsTable({ events }: EventsTableProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()

  if (!events.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-medium">No events found</h3>
        <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
      </div>
    )
  }

  async function handlePublish(id: string) {
    try {
      setIsLoading(id)
      await publishEvent(id)
      router.refresh()
    } catch (error) {
      console.error("Failed to publish event:", error)
      alert("Failed to publish event")
    } finally {
      setIsLoading(null)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return
    }

    try {
      setIsLoading(id)
      await deleteEvent(id)
      router.refresh()
    } catch (error) {
      console.error("Failed to delete event:", error)
      alert("Failed to delete event")
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="rounded-md border border-zinc-800">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-zinc-900">
            <TableHead className="w-[300px]">Event</TableHead>
            <TableHead>Organizer</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id} className="border-zinc-800 hover:bg-zinc-900">
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>{event.organizer?.full_name || "Unknown"}</TableCell>
              <TableCell>{event.location ? `${event.location.name}, ${event.location.city}` : "No location"}</TableCell>
              <TableCell>{format(new Date(event.start_time), "MMM d, yyyy")}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    event.status === "published" ? "default" : event.status === "pending" ? "outline" : "destructive"
                  }
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
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem asChild>
                      <Link href={`/events/${event.id}`} className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/events/${event.id}/edit`} className="cursor-pointer">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    {event.status === "pending" && (
                      <DropdownMenuItem
                        onClick={() => handlePublish(event.id)}
                        disabled={isLoading === event.id}
                        className="cursor-pointer text-teal-500 focus:text-teal-500"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Approve
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => handleDelete(event.id)}
                      disabled={isLoading === event.id}
                      className="cursor-pointer text-red-500 focus:text-red-500"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
