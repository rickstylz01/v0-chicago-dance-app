"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AtSign, Check, Loader2, Mail } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { verifyEmail } from "@/app/signup/actions"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const token = searchParams.get("token") || ""

  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // If there's a token in the URL, verify it automatically
  useEffect(() => {
    if (token) {
      verifyEmailWithToken(token)
    }
  }, [token])

  async function verifyEmailWithToken(verificationToken: string) {
    setIsVerifying(true)
    setError(null)

    try {
      await verifyEmail(verificationToken)
      setIsVerified(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify email")
    } finally {
      setIsVerifying(false)
    }
  }

  // For demo purposes, generate a fake verification token
  const demoVerificationToken = `verify-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
  const verificationLink = `/signup/verify?token=${demoVerificationToken}&email=${encodeURIComponent(email)}`

  return (
    <div className="flex min-h-screen items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900">
        <CardHeader className="space-y-1">
          {isVerified ? (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                <Check className="h-6 w-6 text-teal-600" />
              </div>
              <CardTitle className="text-center text-2xl font-bold">Email Verified!</CardTitle>
              <CardDescription className="text-center">
                Your email has been successfully verified. You can now access all features of Street Pulse.
              </CardDescription>
            </>
          ) : (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Mail className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="text-center text-2xl font-bold">Verify your email</CardTitle>
              <CardDescription className="text-center">
                We sent a verification link to <span className="font-medium">{email}</span>
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-900/20 border border-red-800 p-3 text-sm text-red-400">{error}</div>
          )}

          {isVerifying && (
            <div className="flex flex-col items-center justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-teal-500 mb-2" />
              <p className="text-sm text-gray-400">Verifying your email...</p>
            </div>
          )}

          {!isVerified && !isVerifying && (
            <div className="rounded-md bg-zinc-800 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AtSign className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium">Verification instructions</h3>
                  <div className="mt-2 text-sm text-gray-400">
                    <p>
                      Please check your email inbox and click on the verification link to complete your registration. If
                      you don&apos;t see the email, check your spam folder.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* This is for demo purposes only - in a real app, this would be sent via email */}
          {!isVerified && !isVerifying && (
            <div className="rounded-md bg-teal-900/20 border border-teal-800 p-4 mt-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-teal-400">Demo: Verification Link</h3>
                  <div className="mt-2 text-sm text-gray-400">
                    <p>
                      In a real application, this link would be sent to your email. Click the link below to simulate
                      email verification:
                    </p>
                    <Link
                      href={verificationLink}
                      className="mt-2 inline-block text-teal-500 hover:text-teal-400 underline break-all"
                    >
                      {verificationLink}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {isVerified ? (
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <Link href="/">Go to Homepage</Link>
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="w-full border-teal-500 text-teal-500 hover:bg-teal-950/30"
                onClick={() => {
                  // In a real app, this would resend the verification email
                  alert("Verification email resent! Please check your inbox.")
                }}
              >
                Resend verification email
              </Button>
              <div className="text-center text-sm">
                <Link href="/login" className="text-teal-500 hover:text-teal-400">
                  Back to login
                </Link>
              </div>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
