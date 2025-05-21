import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin, Music, Star, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface EventCardProps {
  event: {
    id: string
    title: string
    date: string
    time: string
    location: string
    image: string
    tags: string[]
    attendees: number
    rating?: number
    hasLiveDJ?: boolean
    isBeginnerFriendly?: boolean
    hasOpenFloor?: boolean
  }
  featured?: boolean
  lastMinute?: boolean
}

export function EventCard({ event, featured = false, lastMinute = false }: EventCardProps) {
  return (
    <Card className={`overflow-hidden border-zinc-800 bg-zinc-900 ${featured ? "h-full" : ""}`}>
      <div className="relative">
        <Image
          src={event.image || "/placeholder.svg?height=300&width=500"}
          alt={event.title}
          width={500}
          height={300}
          className="w-full h-48 object-cover"
        />
        {lastMinute && (
          <div className="absolute top-2 right-2 bg-amber-500 text-black px-2 py-1 rounded-md text-xs font-bold">
            TONIGHT
          </div>
        )}
        {event.hasLiveDJ && (
          <div className="absolute bottom-2 left-2 bg-teal-600/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <Music className="h-3 w-3" /> LIVE DJ
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg line-clamp-1">{event.title}</h3>
            <div className="flex items-center text-gray-400 text-sm mt-1">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>{event.date}</span>
              <Clock className="h-4 w-4 ml-3 mr-1" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
          {event.rating && (
            <div className="flex items-center bg-zinc-800 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-sm font-medium">{event.rating}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {event.tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="bg-zinc-800 hover:bg-zinc-700 text-xs">
              {tag}
            </Badge>
          ))}
          {event.isBeginnerFriendly && (
            <Badge
              variant="outline"
              className="bg-lime-900/30 text-lime-400 hover:bg-lime-900/50 border-lime-800 text-xs"
            >
              Beginner Friendly
            </Badge>
          )}
          {event.hasOpenFloor && (
            <Badge
              variant="outline"
              className="bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50 border-cyan-800 text-xs"
            >
              Open Floor
            </Badge>
          )}
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <Users className="h-4 w-4 mr-1" />
          <span>{event.attendees} attending</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
          <Link href={`/events/${event.id}`}>View Details</Link>
        </Button>
        <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-950/30">
          RSVP
        </Button>
      </CardFooter>
    </Card>
  )
}
