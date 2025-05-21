"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

interface EventReviewsProps {
  eventId: string
}

export function EventReviews({ eventId }: EventReviewsProps) {
  const [reviews, setReviews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [averageRating, setAverageRating] = useState(0)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true)
      try {
        // Check if user is logged in
        const { data: authData } = await supabase.auth.getSession()
        setIsLoggedIn(!!authData.session)
        if (authData.session) {
          setUserId(authData.session.user.id)
        }

        // Fetch reviews
        const { data } = await supabase
          .from("reviews")
          .select(`
            id,
            rating,
            comment,
            music_rating,
            crowd_rating,
            venue_rating,
            created_at,
            user:profiles(id, username, full_name, avatar_url)
          `)
          .eq("event_id", eventId)
          .order("created_at", { ascending: false })

        if (data) {
          setReviews(data)

          // Calculate average rating
          if (data.length > 0) {
            const sum = data.reduce((acc, review) => acc + review.rating, 0)
            setAverageRating(sum / data.length)
          }
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [eventId, supabase])

  const handleSubmitReview = async () => {
    if (!isLoggedIn) {
      router.push(`/login?redirectTo=/events/${eventId}`)
      return
    }

    if (rating === 0) {
      alert("Please select a rating")
      return
    }

    setIsSubmitting(true)
    try {
      // Check if user already reviewed this event
      const { data: existingReview } = await supabase
        .from("reviews")
        .select("id")
        .eq("event_id", eventId)
        .eq("user_id", userId)
        .single()

      if (existingReview) {
        // Update existing review
        await supabase
          .from("reviews")
          .update({
            rating,
            comment,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingReview.id)
      } else {
        // Create new review
        await supabase.from("reviews").insert({
          event_id: eventId,
          user_id: userId,
          rating,
          comment,
        })
      }

      // Refresh the page to show the new review
      router.refresh()

      // Reset form
      setRating(0)
      setComment("")

      // Fetch reviews again
      const { data } = await supabase
        .from("reviews")
        .select(`
          id,
          rating,
          comment,
          music_rating,
          crowd_rating,
          venue_rating,
          created_at,
          user:profiles(id, username, full_name, avatar_url)
        `)
        .eq("event_id", eventId)
        .order("created_at", { ascending: false })

      if (data) {
        setReviews(data)

        // Calculate average rating
        if (data.length > 0) {
          const sum = data.reduce((acc, review) => acc + review.rating, 0)
          setAverageRating(sum / data.length)
        }
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Reviews & Ratings</h3>
        <div className="flex items-center">
          <Star className="h-5 w-5 text-amber-500 mr-1" />
          <span className="font-medium">{averageRating.toFixed(1)}</span>
          <span className="text-gray-400 text-sm ml-1">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Write a review */}
      <div className="bg-zinc-900 rounded-lg p-4">
        <h4 className="text-sm font-medium mb-3">Write a Review</h4>
        <div className="flex items-center mb-3">
          <div className="text-sm mr-2">Rating:</div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 cursor-pointer ${
                  star <= rating ? "text-amber-500" : "text-gray-500"
                } hover:text-amber-500`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <Textarea
          placeholder="Share your experience..."
          className="bg-zinc-800 border-zinc-700 mb-3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleSubmitReview} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-400">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-zinc-900 rounded-lg p-4">
              <div className="flex justify-between mb-3">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src={review.user?.avatar_url || "/placeholder.svg"}
                      alt={review.user?.full_name || "User"}
                    />
                    <AvatarFallback>{(review.user?.full_name || "User").substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {review.user?.full_name || review.user?.username || "Anonymous User"}
                    </div>
                    <div className="text-xs text-gray-400">{format(new Date(review.created_at), "MMM d, yyyy")}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-amber-500" : "text-gray-500"}`}
                      fill={i < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-4">{review.comment}</p>

              {/* Vibe Ratings */}
              {(review.music_rating || review.crowd_rating || review.venue_rating) && (
                <div className="bg-zinc-800 rounded p-3">
                  <div className="text-xs font-medium mb-2">Vibe Ratings</div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {review.music_rating && (
                      <div>
                        <div className="text-gray-400 mb-1">Music</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.music_rating ? "text-teal-500" : "text-gray-600"}`}
                              fill={i < review.music_rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {review.crowd_rating && (
                      <div>
                        <div className="text-gray-400 mb-1">Crowd</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.crowd_rating ? "text-amber-500" : "text-gray-600"}`}
                              fill={i < review.crowd_rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {review.venue_rating && (
                      <div>
                        <div className="text-gray-400 mb-1">Venue</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.venue_rating ? "text-cyan-500" : "text-gray-600"}`}
                              fill={i < review.venue_rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {reviews.length > 3 && (
        <Button variant="outline" className="w-full border-teal-500 text-teal-500 hover:bg-teal-950/30">
          Load More Reviews
        </Button>
      )}
    </div>
  )
}
