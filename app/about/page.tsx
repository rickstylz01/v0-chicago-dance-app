import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Globe, Heart, MapPin, MessageCircle, Music, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
          <Image
            src="/placeholder.svg?height=600&width=1200&text=Dance+Community"
            alt="Dance community"
            width={1200}
            height={600}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-amber-500">
              What is Street Pulse?
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-200">
              Connecting dancers, building community, and keeping the culture alive.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-zinc-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Mission</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Street Pulse was born from a simple truth: finding authentic dance events shouldn't be hard. We're
                  dancers who were tired of missing out on the best sessions, battles, and workshops because information
                  was scattered across social media, group chats, and word of mouth.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">By the community, for the community</h3>
                <p className="text-gray-300 leading-relaxed">
                  We built Street Pulse as a platform owned by its community. This isn't just another event app – it's a
                  digital home for street dance culture, created by people who live and breathe it every day.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Local everywhere</h3>
                <p className="text-gray-300 leading-relaxed">
                  Whether you're in New York or Tokyo, Paris or São Paulo, Street Pulse connects you to your local dance
                  scene while being part of a global movement. Dance is universal, but the best experiences happen close
                  to home.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600&text=Dance+Community+Gathering"
                alt="Dance community gathering"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-lg font-medium italic">
                  "Dance is the hidden language of the soul, of the body."
                </p>
                <p className="text-gray-300 mt-2">— Martha Graham</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Values</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Street Pulse is built on principles that honor the roots and future of dance culture.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-teal-900/30 rounded-full">
                    <Heart className="h-8 w-8 text-teal-500" />
                  </div>
                  <h3 className="text-xl font-bold">Authenticity</h3>
                  <p className="text-gray-300">
                    We respect the history and culture of street dance. Every feature we build honors the traditions
                    while embracing innovation.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-amber-900/30 rounded-full">
                    <Users className="h-8 w-8 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold">Community First</h3>
                  <p className="text-gray-300">
                    We prioritize the needs of dancers, organizers, and venues. Our decisions are guided by what
                    strengthens the community, not just what's profitable.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-cyan-900/30 rounded-full">
                    <Globe className="h-8 w-8 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-bold">Inclusivity</h3>
                  <p className="text-gray-300">
                    Dance is for everyone. We're committed to creating a platform where all dancers feel welcome,
                    regardless of style, experience level, or background.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-zinc-950">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">How Street Pulse Works</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              We've built tools that make it easy to stay connected to your local dance scene.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <CalendarDays className="h-10 w-10 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Discover Events</h3>
                <p className="text-gray-300 mb-4 flex-grow">
                  Find dance events that match your style, from battles and workshops to social dances and performances.
                  Filter by date, style, or features like live DJs and open floors.
                </p>
                <Button variant="link" className="p-0 h-auto text-teal-500" asChild>
                  <Link href="/events">Browse Events →</Link>
                </Button>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <MapPin className="h-10 w-10 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Find Your Local Scene</h3>
                <p className="text-gray-300 mb-4 flex-grow">
                  Our map and location features help you discover dance spots near you. Whether you're at home or
                  traveling, connect with the local dance community wherever you are.
                </p>
                <Button variant="link" className="p-0 h-auto text-amber-500" asChild>
                  <Link href="/map">Explore Map →</Link>
                </Button>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <Music className="h-10 w-10 text-cyan-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Last Minute Sessions</h3>
                <p className="text-gray-300 mb-4 flex-grow">
                  Never miss a spontaneous jam again. Our Last Minute board highlights same-day events, from pop-up
                  sessions to after-parties that weren't planned in advance.
                </p>
                <Button variant="link" className="p-0 h-auto text-cyan-500" asChild>
                  <Link href="/last-minute">See Tonight's Events →</Link>
                </Button>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <MessageCircle className="h-10 w-10 text-lime-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Reviews</h3>
                <p className="text-gray-300 mb-4 flex-grow">
                  Share your experiences and learn from others. Our review system helps dancers find events with the
                  right vibe, music, and crowd for their style.
                </p>
                <Button variant="link" className="p-0 h-auto text-lime-500" asChild>
                  <Link href="/events">Read Reviews →</Link>
                </Button>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <Users className="h-10 w-10 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Organizer Tools</h3>
                <p className="text-gray-300 mb-4 flex-grow">
                  For event creators, we provide tools to reach your target audience, manage RSVPs, and build your
                  reputation in the community.
                </p>
                <Button variant="link" className="p-0 h-auto text-purple-500" asChild>
                  <Link href="/signup">Become an Organizer →</Link>
                </Button>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <Heart className="h-10 w-10 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Dance Profiles</h3>
                <p className="text-gray-300 mb-4 flex-grow">
                  Create your dancer profile to connect with others, showcase your styles, and get personalized event
                  recommendations based on your preferences.
                </p>
                <Button variant="link" className="p-0 h-auto text-pink-500" asChild>
                  <Link href="/signup">Create Your Profile →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stories */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Community Stories</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Street Pulse is made by and for the dance community. Here are some of their stories.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=300&width=500&text=Dancer+Portrait"
                    alt="Dancer portrait"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Marcus J.</h3>
                  <p className="text-gray-400 text-sm mb-4">B-Boy • Event Organizer</p>
                  <p className="text-gray-300 italic">
                    "Before Street Pulse, promoting our monthly battles was all word of mouth. Now we reach twice as
                    many dancers and our community has grown beyond what we thought possible."
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=300&width=500&text=Dancer+Portrait"
                    alt="Dancer portrait"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Sophia L.</h3>
                  <p className="text-gray-400 text-sm mb-4">House Dancer • Instructor</p>
                  <p className="text-gray-300 italic">
                    "As someone who travels for dance, Street Pulse has been a game-changer. I can find local jams
                    wherever I go, connecting with dancers I would have never met otherwise."
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=300&width=500&text=Dancer+Portrait"
                    alt="Dancer portrait"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Jamal T.</h3>
                  <p className="text-gray-400 text-sm mb-4">Popper • Beginner</p>
                  <p className="text-gray-300 italic">
                    "As a new dancer, finding beginner-friendly events was intimidating. Street Pulse helped me find
                    welcoming spaces to learn and connect with mentors who've helped me grow."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-zinc-950 to-black">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Join the Movement</h2>
            <p className="text-xl text-gray-300">
              Street Pulse is more than an app – it's a movement to strengthen dance communities everywhere. Whether
              you're a dancer, organizer, or venue, there's a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white" asChild>
                <Link href="/signup">Create Your Account</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500 text-amber-500 hover:bg-amber-950/30"
                asChild
              >
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
