"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Filter, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"

interface EventFiltersProps {
  danceStyles?: string[]
}

export function EventFilters({ danceStyles = [] }: EventFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Use a ref to track if we've already initialized from URL params
  const initializedRef = useRef(false)

  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [distance, setDistance] = useState<number[]>([5])
  const [rating, setRating] = useState<number[]>([4])
  const [features, setFeatures] = useState({
    liveDj: false,
    openFloor: false,
    beginnerFriendly: false,
    freeEntry: false,
  })

  // Initialize filters from URL params only once
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    const style = searchParams.get("style")
    if (style) {
      setSelectedStyles([style])
    }

    const liveDj = searchParams.get("liveDj") === "true"
    const openFloor = searchParams.get("openFloor") === "true"
    const beginnerFriendly = searchParams.get("beginnerFriendly") === "true"
    const freeEntry = searchParams.get("freeEntry") === "true"

    setFeatures({
      liveDj,
      openFloor,
      beginnerFriendly,
      freeEntry,
    })

    const distanceParam = searchParams.get("distance")
    if (distanceParam) {
      setDistance([Number.parseInt(distanceParam)])
    }

    const ratingParam = searchParams.get("rating")
    if (ratingParam) {
      setRating([Number.parseFloat(ratingParam)])
    }
  }, [searchParams])

  const handleStyleChange = (style: string, checked: boolean) => {
    if (checked) {
      setSelectedStyles([...selectedStyles, style])
    } else {
      setSelectedStyles(selectedStyles.filter((s) => s !== style))
    }
  }

  const handleFeatureChange = (feature: keyof typeof features, checked: boolean) => {
    setFeatures({
      ...features,
      [feature]: checked,
    })
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    // Preserve existing query parameter if present
    const query = searchParams.get("q")
    if (query) params.set("q", query)

    // Add selected styles
    if (selectedStyles.length === 1) {
      params.set("style", selectedStyles[0])
    }

    // Add features
    if (features.liveDj) params.set("liveDj", "true")
    if (features.openFloor) params.set("openFloor", "true")
    if (features.beginnerFriendly) params.set("beginnerFriendly", "true")
    if (features.freeEntry) params.set("freeEntry", "true")

    // Add distance and rating
    params.set("distance", distance[0].toString())
    params.set("rating", rating[0].toString())

    router.push(`/events?${params.toString()}`)
  }

  const clearFilters = () => {
    setSelectedStyles([])
    setFeatures({
      liveDj: false,
      openFloor: false,
      beginnerFriendly: false,
      freeEntry: false,
    })
    setDistance([5])
    setRating([4])

    // Clear URL params except search query
    const params = new URLSearchParams()
    const query = searchParams.get("q")
    if (query) params.set("q", query)

    router.push(`/events?${params.toString()}`)
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </h3>
        <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-400 hover:text-white" onClick={clearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      <div className="space-y-6">
        {/* Date Range */}
        <div>
          <h4 className="text-sm font-medium mb-3">Date Range</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="text-xs h-8 bg-zinc-800 border-zinc-700">
              Today
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-8 bg-zinc-800 border-zinc-700">
              Tomorrow
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-8 bg-zinc-800 border-zinc-700">
              This Weekend
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-8 bg-zinc-800 border-zinc-700">
              Next Week
            </Button>
          </div>
        </div>

        {/* Dance Styles */}
        <div>
          <h4 className="text-sm font-medium mb-3">Dance Styles</h4>
          <div className="space-y-2">
            {danceStyles.slice(0, 6).map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox
                  id={`style-${style}`}
                  checked={selectedStyles.includes(style)}
                  onCheckedChange={(checked) => handleStyleChange(style, checked as boolean)}
                />
                <Label htmlFor={`style-${style}`} className="text-sm">
                  {style}
                </Label>
              </div>
            ))}
            {danceStyles.length > 6 && (
              <Button variant="link" size="sm" className="h-auto p-0 text-xs text-teal-500">
                Show more styles
              </Button>
            )}
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-sm font-medium mb-3">Features</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="live-dj"
                checked={features.liveDj}
                onCheckedChange={(checked) => handleFeatureChange("liveDj", checked as boolean)}
              />
              <Label htmlFor="live-dj" className="text-sm">
                Live DJ
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="open-floor"
                checked={features.openFloor}
                onCheckedChange={(checked) => handleFeatureChange("openFloor", checked as boolean)}
              />
              <Label htmlFor="open-floor" className="text-sm">
                Open Floor
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="beginner-friendly"
                checked={features.beginnerFriendly}
                onCheckedChange={(checked) => handleFeatureChange("beginnerFriendly", checked as boolean)}
              />
              <Label htmlFor="beginner-friendly" className="text-sm">
                Beginner Friendly
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="free-entry"
                checked={features.freeEntry}
                onCheckedChange={(checked) => handleFeatureChange("freeEntry", checked as boolean)}
              />
              <Label htmlFor="free-entry" className="text-sm">
                Free Entry
              </Label>
            </div>
          </div>
        </div>

        {/* Distance */}
        <div>
          <div className="flex justify-between mb-3">
            <h4 className="text-sm font-medium">Distance</h4>
            <span className="text-xs text-gray-400">{distance[0]} miles</span>
          </div>
          <Slider value={distance} onValueChange={setDistance} max={25} step={1} className="mb-2" />
          <div className="flex justify-between text-xs text-gray-400">
            <span>0 mi</span>
            <span>25 mi</span>
          </div>
        </div>

        {/* Rating */}
        <div>
          <div className="flex justify-between mb-3">
            <h4 className="text-sm font-medium">Minimum Rating</h4>
            <span className="text-xs text-gray-400">{rating[0]}+</span>
          </div>
          <Slider value={rating} onValueChange={setRating} max={5} min={1} step={0.5} className="mb-2" />
          <div className="flex justify-between text-xs text-gray-400">
            <span>1.0</span>
            <span>5.0</span>
          </div>
        </div>

        <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
