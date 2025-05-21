import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is not signed in and the current path is protected, redirect to login
  if (!session && (req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname.startsWith("/profile"))) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/login"
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is signed in but not an organizer/admin and trying to access admin pages
  if (session && req.nextUrl.pathname.startsWith("/admin")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_organizer, is_admin")
      .eq("id", session.user.id)
      .single()

    if (!profile || (!profile.is_organizer && !profile.is_admin)) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/events/create", "/events/edit/:path*"],
}
