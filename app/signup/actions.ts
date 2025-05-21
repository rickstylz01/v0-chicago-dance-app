"use server"

import { createClient } from "@/lib/supabase/server"
import { sendWelcomeEmail } from "@/lib/email/send-email"

interface SignUpData {
  email: string
  password: string
  name: string
}

export async function signUp({ email, password, name }: SignUpData) {
  const supabase = createClient()

  // Check if email already exists
  const { data: existingUser } = await supabase.from("profiles").select("id").eq("email", email).single()

  if (existingUser) {
    throw new Error("Email already in use")
  }

  // Sign up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      data: {
        full_name: name,
      },
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  // Send welcome email
  try {
    await sendWelcomeEmail(email, name)
  } catch (emailError) {
    console.error("Failed to send welcome email:", emailError)
    // Continue with signup even if email fails
  }

  return { success: true, user: data.user }
}

export async function verifyEmail(token: string) {
  const supabase = createClient()

  // In a real application, you would verify the token with Supabase
  // For this demo, we'll simulate a verification
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demo purposes, we'll consider any token valid
  // In a real app, you would validate the token
  if (!token || token.length < 10) {
    throw new Error("Invalid verification token")
  }

  return { success: true }
}
