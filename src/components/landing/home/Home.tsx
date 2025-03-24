"use client"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronRight, Users } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  const restaurants = [
    {
      id: 1,
      imgUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1733905076/restaurants/zku4hfvxs9q7uwtcwdak.jpg",
    },
    {
      id: 2,
      imgUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1733910494/restaurants/ocm2vnbsfoauzoqldhme.jpg",
    },
    {
      id: 3,
      imgUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1733996854/restaurants/dphptf1c7gnropx6ax1v.jpg",
    },
    {
      id: 4,
      imgUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1733997670/restaurants/mndtver11wmkwhxy2scr.jpg",
    },
  ]

  const trustedRes = [
    { id: 1, imgUrl: "/trustedres/estilo.jpeg", name: "Estilo" },
    { id: 2, imgUrl: "/trustedres/blitong.jpeg", name: "Blitong" },
    { id: 3, imgUrl: "/trustedres/food.jpeg", name: "Food Co" },
    { id: 4, imgUrl: "/trustedres/hotgrill.jpeg", name: "Hot Grill" },
    { id: 5, imgUrl: "/trustedres/sokhaku.jpeg", name: "Sokhaku" },
    { id: 6, imgUrl: "/trustedres/thai.jpeg", name: "Thai Cuisine" },
    { id: 7, imgUrl: "/trustedres/mafe.jpeg", name: "Mafe" },
  ]

  return (
    <main className="overflow-hidden">
      <section ref={heroRef} className="relative py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[70%] bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-[60%] -left-[10%] w-[40%] h-[60%] bg-green-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col justify-center space-y-8" data-animate>
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary border border-primary/20 transition-all hover:bg-primary/15 cursor-default">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  Powering 2,000+ premier restaurants globally
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-primary bg-clip-text text-transparent">
                  Smart Reservations for Modern Dining
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-[600px] leading-relaxed">
                  Eliminate booking headaches, maximize table capacity, and delight your guests with our intelligent
                  reservation management system.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white border-0 shadow-lg shadow-primary/20 px-8 h-14 rounded-full font-medium text-base transition-all duration-300 group"
                >
                  <span>Get Started</span>
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 h-14 rounded-full font-medium text-base transition-all duration-300"
                >
                  Schedule a Demo
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm pt-2">
                <div className="flex -space-x-3">
                  {restaurants.map((item) => (
                    <div
                      key={item.id}
                      className="inline-block rounded-full overflow-hidden border-2 border-white h-10 w-10 transition-transform hover:scale-105 hover:z-10 shadow-sm"
                    >
                      <Image
                        src={item.imgUrl || "/placeholder.svg"}
                        width={40}
                        height={40}
                        alt="Restaurant Owner"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-gray-600">
                  Join <span className="font-semibold text-gray-900">2,000+</span> successful restaurants transforming
                  their booking experience
                </div>
              </div>
            </div>

            <div className="relative" data-animate>
              {/* Main product showcase */}
              <div className="relative bg-gradient-to-r from-primary/80 to-green-700/80 backdrop-blur-sm rounded-2xl border border-white/20 p-1.5 shadow-2xl">
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="hidden md:block w-full relative h-[420px] mx-auto">
                      <Image
                        src="/swiftab/hero.jpg"
                        alt="SwifTab restaurant management dashboard"
                        className="object-center rounded-xl shadow-md w-full"
                        quality={100}
                        priority
                        fill
                      />
                    </div>

                    {/* Mobile Image */}
                    <div className="block md:hidden w-full">
                      <Image
                        src="/swiftab/mobile.jpg"
                        width={375}
                        height={512}
                        alt="SwifTab mobile dashboard view"
                        className="w-full aspect-auto object-contain object-center rounded-xl shadow-md"
                        quality={100}
                        priority
                      />
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-700">Real-time Dashboard</span>
                      </div>
                      <div className="text-sm text-gray-500">Live data • Auto-refreshed</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating UI elements */}
              <div className="absolute -top-10 -right-10 bg-gradient-to-br from-primary to-green-700 backdrop-blur-sm rounded-xl border border-white/20 p-4 shadow-xl animate-float-slow">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Today's Guests</p>
                    <p className="text-xl font-bold text-white">128</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-primary to-green-700 backdrop-blur-sm rounded-xl border border-white/20 p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Today's Bookings</p>
                    <p className="text-xl font-bold text-white">42</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted restaurants section */}
        <div className="container px-4 md:px-6 mt-24">
          <div className="text-center mb-10">
            <p className="text-gray-500 text-sm uppercase tracking-wider font-medium">
              Trusted by leading restaurants worldwide
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
            {trustedRes.map((item) => (
              <div
                key={item.id}
                className="h-16 transition-all duration-300 opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
              >
                <Image
                  src={item.imgUrl || "/placeholder.svg"}
                  width={80}
                  height={80}
                  alt={`${item.name} - Restaurant Partner`}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

