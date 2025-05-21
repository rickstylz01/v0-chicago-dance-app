"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createClient } from "@/lib/supabase/client"

const formSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  full_name: z.string().min(2).max(100),
  bio: z.string().max(500).optional(),
  website: z.string().url().optional().or(z.literal("")),
  dance_styles: z.array(z.string()).optional(),
})

interface ProfileFormProps {
  user: any
  profile: any
  danceStyles: { id: string; name: string }[]
}

export function ProfileForm({ user, profile, danceStyles }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: profile?.username || "",
      full_name: profile?.full_name || user?.user_metadata?.full_name || "",
      bio: profile?.bio || "",
      website: profile?.website || "",
      dance_styles: profile?.dance_styles || [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username: values.username || null,
          full_name: values.full_name,
          bio: values.bio || null,
          website: values.website || null,
          dance_styles: values.dance_styles || [],
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" className="bg-zinc-900 border-zinc-800" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Choose a username"
                  className="bg-zinc-900 border-zinc-800"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>This will be your public username visible to other users</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself"
                  className="min-h-32 bg-zinc-900 border-zinc-800"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Share your dance background, styles, and interests</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://yourwebsite.com"
                  className="bg-zinc-900 border-zinc-800"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dance_styles"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Dance Styles</FormLabel>
                <FormDescription>Select the dance styles you're interested in</FormDescription>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {danceStyles.map((style) => (
                  <FormField
                    key={style.id}
                    control={form.control}
                    name="dance_styles"
                    render={({ field }) => {
                      return (
                        <FormItem key={style.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(style.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), style.id])
                                  : field.onChange(field.value?.filter((value) => value !== style.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{style.name}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  )
}
