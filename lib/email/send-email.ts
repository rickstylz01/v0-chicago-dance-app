"use server"

import { createClient } from "@/lib/supabase/server"

// In a real app, you would use a service like Resend or SendGrid
// This is a mock implementation for demonstration purposes
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html: string
  text: string
}) {
  console.log(`Sending email to ${to}`)
  console.log(`Subject: ${subject}`)
  console.log(`Text: ${text}`)

  // In a real app, you would use something like:
  // await resend.emails.send({
  //   from: 'noreply@streetpulse.com',
  //   to,
  //   subject,
  //   html,
  //   text,
  // })

  // For now, we'll just log the email and store it in the database for demo purposes
  const supabase = createClient()

  // Get user ID from email
  const { data: user } = await supabase.from("profiles").select("id").eq("email", to).single()

  if (user) {
    // Store the email in the database
    await supabase.from("email_logs").insert({
      user_id: user.id,
      email: to,
      subject,
      content: html,
      sent_at: new Date().toISOString(),
    })
  }

  return { success: true }
}

export async function sendWelcomeEmail(email: string, name: string) {
  const subject = "Welcome to Street Pulse!"
  const text = `
    Hi ${name},
    
    Welcome to Street Pulse! We're excited to have you join our community of dancers.
    
    With Street Pulse, you can:
    - Discover dance events near you
    - RSVP to events and get reminders
    - Connect with other dancers and organizers
    - And much more!
    
    Get started by browsing events or completing your profile.
    
    Happy dancing!
    The Street Pulse Team
  `

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0d9488;">Welcome to Street Pulse!</h1>
      <p>Hi ${name},</p>
      <p>Welcome to Street Pulse! We're excited to have you join our community of dancers.</p>
      <p>With Street Pulse, you can:</p>
      <ul>
        <li>Discover dance events near you</li>
        <li>RSVP to events and get reminders</li>
        <li>Connect with other dancers and organizers</li>
        <li>And much more!</li>
      </ul>
      <p>Get started by browsing events or completing your profile.</p>
      <div style="margin-top: 30px; text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/events" style="background-color: #0d9488; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Browse Events</a>
      </div>
      <p style="margin-top: 30px;">Happy dancing!<br>The Street Pulse Team</p>
    </div>
  `

  return sendEmail({ to: email, subject, html, text })
}

export async function sendRsvpConfirmation(
  email: string,
  name: string,
  eventTitle: string,
  eventDate: string,
  eventLocation: string,
) {
  const subject = `RSVP Confirmation: ${eventTitle}`
  const text = `
    Hi ${name},
    
    Your RSVP for "${eventTitle}" has been confirmed!
    
    Event Details:
    - Date: ${eventDate}
    - Location: ${eventLocation}
    
    We look forward to seeing you there!
    
    The Street Pulse Team
  `

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0d9488;">RSVP Confirmation</h1>
      <p>Hi ${name},</p>
      <p>Your RSVP for <strong>${eventTitle}</strong> has been confirmed!</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h2 style="margin-top: 0;">Event Details:</h2>
        <p><strong>Date:</strong> ${eventDate}</p>
        <p style="margin-bottom: 0;"><strong>Location:</strong> ${eventLocation}</p>
      </div>
      <p>We look forward to seeing you there!</p>
      <p style="margin-top: 30px;">The Street Pulse Team</p>
    </div>
  `

  return sendEmail({ to: email, subject, html, text })
}

export async function sendWeeklyDigest(email: string, name: string, events: any[]) {
  const subject = "Your Weekly Dance Events Digest"

  const eventsText = events
    .map(
      (event) => `
    - ${event.title}
    - Date: ${event.date}
    - Location: ${event.location}
  `,
    )
    .join("\n\n")

  const text = `
    Hi ${name},
    
    Here are the upcoming dance events this week that match your interests:
    
    ${eventsText}
    
    Check out the full calendar on our website.
    
    Happy dancing!
    The Street Pulse Team
  `

  const eventsHtml = events
    .map(
      (event) => `
    <div style="margin-bottom: 20px;">
      <h3 style="margin-bottom: 5px;">${event.title}</h3>
      <p style="margin: 0;"><strong>Date:</strong> ${event.date}</p>
      <p style="margin: 0;"><strong>Location:</strong> ${event.location}</p>
    </div>
  `,
    )
    .join("")

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0d9488;">Your Weekly Dance Events Digest</h1>
      <p>Hi ${name},</p>
      <p>Here are the upcoming dance events this week that match your interests:</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
        ${eventsHtml}
      </div>
      <div style="margin-top: 30px; text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/events" style="background-color: #0d9488; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View All Events</a>
      </div>
      <p style="margin-top: 30px;">Happy dancing!<br>The Street Pulse Team</p>
    </div>
  `

  return sendEmail({ to: email, subject, html, text })
}
