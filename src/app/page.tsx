"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Star, Clock, Bell, Heart, Utensils, MessageCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Container from "@/components/landing/FooterHome"

export default function LandingPage() {
  const servicesRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const testimonials = [
    {
      name: "Jony Lauren",
      image: "/user.png",
      rating: 5,
      text: "I recently dined at The Gourmet Haven and was absolutely blown away by the experience. From the moment I walked in, I was greeted warmly by the staff, and the ambiance was both elegant and cozy."
    },
    {
      name: "Maria Jason",
      image: "/user.png",
      rating: 5,
      text: "My visit to The Culinary Delight was nothing short of extraordinary. As soon as I stepped through the door, I was welcomed with a smile, and the atmosphere struck a perfect balance between sophistication and comfort."
    },
    {
      name: "Sarah Lackin",
      image: "/user.png",
      rating: 5,
      text: "Dining at The Epicurean Escape was an unforgettable experience. The staff greeted me with genuine warmth, and the setting was a harmonious blend of elegance and homeliness, making me feel right at ease."
    }
  ]

  const services = [
    {
      title: "Instant Reservations",
      description: "Allow users to make instant reservations at their favorite restaurants with just a few taps.",
      icon: Calendar
    },
    {
      title: "Real-Time Availability",
      description: "Provide real-time availability updates to help users find open tables quickly.",
      icon: Clock
    },
    {
      title: "Restaurant Profiles",
      description: "Create detailed profiles for each restaurant, including photos, cuisine descriptions, and hours of operation.",
      icon: Utensils
    },
    {
      title: "Favorites",
      description: "Allow users to mark favorite restaurants for quick and easy future reservations.",
      icon: Heart
    },
    {
      title: "Notifications and Reminders",
      description: "Send push notifications and reminders for upcoming reservations, special events.",
      icon: Bell
    },
    {
      title: "User Reviews and Ratings",
      description: "Include a feature for users to leave reviews and ratings, helping others make informed dining choices.",
      icon: MessageCircle
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8f8]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between ">
          <Link href="/" className="flex items-center space-x-2 px-10">
          <Image src="/swiftab/st.png" width={80} height={80} alt="logo"/>
            {/* <span className="text-xl font-bold text-blue-950">SwifTab</span> */}
          </Link>
          <nav className="hidden md:flex gap-6">
            <button className="text-sm font-medium hover:text-primary transition-colors">Home</button>
            <button className="text-sm font-medium hover:text-primary transition-colors">Contact Us</button>
            <button onClick={() => scrollToSection(servicesRef)} className="text-sm font-medium hover:text-primary transition-colors">Services</button>
            <button onClick={() => scrollToSection(testimonialsRef)} className="text-sm font-medium hover:text-primary transition-colors">About Us</button>
            <button onClick={() => scrollToSection(featuresRef)} className="text-sm font-medium hover:text-primary transition-colors">FAQ</button>
          </nav>
          <div className="flex gap-4">
            <Button variant="outline"><Link href={"/dash"}>Log In</Link></Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container grid lg:grid-cols-2 gap-8 items-center py-0 px-20">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold tracking-tight lg:text-6xl">
              Effortless <span className="text-primary">Reservations</span>
              <br />
              for Unforgettable Meals
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover, book, and enjoy your perfect meal.
            </p>
            <div className="space-y-4">
              <Button size="lg" className="px-8">
                Download the app
              </Button>
              <div className="flex gap-8 items-center text-xl">
                <div>
                  <span className="font-bold">500+</span>
                  <span className="text-muted-foreground ml-2">Restaurants</span>
                </div>
                <div>
                  <span className="font-bold">6k+</span>
                  <span className="text-muted-foreground ml-2">Customers</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[600px]">
            <Image
              src="/user.png"
              alt="TableTop App Interface"
              fill
              className="object-contain"
              priority
            />
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="bg-muted/50 py-24 px-20">
          <div className="container space-y-12">
            <div className="text-center space-y-4 ">
              <h2 className="text-3xl font-bold">Our Services</h2>
              <p className="text-xl text-muted-foreground">
                Elevate Your Dining Experience with SwifTab's Premium Services
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={testimonialsRef} className="py-24">
          <div className="container space-y-12">
            <h2 className="text-3xl font-bold text-center">What our customers say</h2>
            <Carousel className="w-1/2 max-w-5xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Feature Section */}
        <section ref={featuresRef} className="px-20 py-24">
          <div className="container grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Elevate Your Dining Experience</h2>
              <p className="text-xl text-muted-foreground">
                With SwiftTab, finding and booking the perfect table has never been easier.
              </p>
              <Button size="lg">Learn more</Button>
            </div>
            <div className="relative h-[600px]">
              <Image
                src="/user.png"
                alt="SwiftTab App Interface"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Container />
    </div>
  )
}

// Reusable Components
function ServiceCard({ service }) {
  return (
    <Card className="bg-background">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center flex-col space-x-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <service.icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-xl">{service.title}</h3>
        </div>
        <p className="text-muted-foreground">{service.description}</p>
      </CardContent>
    </Card>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full overflow-hidden relative">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400" />
          ))}
        </div>
        <p className="text-muted-foreground">{testimonial.text}</p>
        <p className="font-semibold">{testimonial.name}</p>
      </CardContent>
    </Card>
  )
}

function SocialLinks() {
  return (
    <div className="flex gap-4">
      <Link href="#" className="hover:text-primary">
        <Facebook className="h-5 w-5" />
      </Link>
      <Link href="#" className="hover:text-primary">
        <Twitter className="h-5 w-5" />
      </Link>
      <Link href="#" className="hover:text-primary">
        <Instagram className="h-5 w-5" />
      </Link>
    </div>
  )
}

