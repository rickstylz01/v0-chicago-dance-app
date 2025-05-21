"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function SortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("sort", e.target.value)
      router.push(`/events?${params.toString()}`)
    },
    [router, searchParams],
  )

  return (
    <select
      className="bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm w-full md:w-auto"
      defaultValue={searchParams.get("sort") || "date"}
      onChange={handleSortChange}
    >
      <option value="date">Sort: Date (Upcoming)</option>
      <option value="popularity">Sort: Popularity</option>
      <option value="rating">Sort: Rating</option>
    </select>
  )
}
