"use client";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  const restaurants = [
    {
      id: 1,
      imgUrl:
        "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1733905076/restaurants/zku4hfvxs9q7uwtcwdak.jpg",
    },
    {
      id: 2,
      imgUrl:
        "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1733910494/restaurants/ocm2vnbsfoauzoqldhme.jpg",
    },
    {
      id: 3,
      imgUrl:
        "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1733996854/restaurants/dphptf1c7gnropx6ax1v.jpg",
    },
    {
      id: 4,
      imgUrl:
        "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1733997670/restaurants/mndtver11wmkwhxy2scr.jpg",
    },
  ];

  const trustedRes = [
    { id: 1, imgUrl: "/trustedres/estilo.jpeg" },
    { id: 2, imgUrl: "/trustedres/blitong.jpeg" },
    { id: 3, imgUrl: "/trustedres/food.jpeg" },
    { id: 4, imgUrl: "/trustedres/hotgrill.jpeg" },
    { id: 5, imgUrl: "/trustedres/sokhaku.jpeg" },
    { id: 6, imgUrl: "/trustedres/thai.jpeg" },
    { id: 7, imgUrl: "/trustedres/mafe.jpeg" },
  ];
  return (
    <section ref={heroRef} className="relative py-10 md:py-15 ">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8" data-animate>
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-300 backdrop-blur-sm text-sm font-medium text-gray-700 border border-white/20">
                <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                Powering 2,000+ premier restaurants globally
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-900 to-primary/20 bg-clip-text text-transparent">
                Smart Reservations for Modern Dining
              </h1>
              <p className="text-xl text-gray-700 max-w-[600px]">
                Eliminate booking headaches, maximize table capacity, and
                delight your guests with our reservation management system.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 text-white border-0 shadow-lg shadow-blue-700/20 px-8 h-14 rounded-full font-medium text-base transition-all duration-300"
              >
                Get Started
                {/* — Free for 14 Days */}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 h-14 rounded-full font-medium text-base transition-all duration-300"
              >
                Schedule a Personalized Demo
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex -space-x-2">
                {restaurants.map((item) => (
                  <div
                    key={item.id}
                    className="inline-block rounded-full overflow-hidden border-2 border-gray-50 h-10 w-10 transition-transform hover:scale-105"
                  >
                    <Image
                      src={item.imgUrl}
                      width={40}
                      height={40}
                      alt="Restaurant Owner"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-gray-700">
                Join <span className="font-medium text-gray-900">2,000+</span>{" "}
                successful restaurants transforming their booking experience
              </div>
            </div>
          </div>
          <div className="relative" data-animate>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 blur-3xl rounded-full opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-primary/50 to-green-900/50 backdrop-blur-sm rounded-2xl border border-gray-200/70 p-1 shadow-2xl">
              <div className="bg-gray-50/80 rounded-xl overflow-hidden">
                {/* <Image
                  src="/swiftab/home.jpg"
                  width={1920}
                  height={1080}
                  alt="SwifTab restaurant management dashboard showing reservations, table availability, customer metrics, and revenue data"
                  className="w-full aspect-video object-cover object-center rounded-t-xl shadow-md"
                  quality={100}
                  priority
                /> */}
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  {/* Desktop HD Image */}
                  <div className="hidden md:block w-full md:w-2/3">
                    <Image
                      src="/swiftab/home.jpg"
                      width={1920}
                      height={1080}
                      alt="SwifTab restaurant management dashboard showing reservations, table availability, and metrics"
                      className="w-full aspect-auto object-cover object-center rounded-xl shadow-md"
                      quality={100}
                      priority
                    />
                  </div>

                  {/* Mobile Image */}
                  <div className="block md:hidden w-full">
                    <Image
                      src="/swiftab/mobile.jpg"
                      width={375}
                      height={512}
                      alt="SwifTab mobile dashboard view with service utilization and orders"
                      className="w-full aspect-auto object-contain object-center rounded-xl shadow-md"
                      quality={100}
                      priority
                    />
                  </div>

                  {/* Mobile Image Preview (Shown beside desktop on larger screens) */}
                  <div className="hidden md:block w-full md:w-1/3">
                    <Image
                      src="/swiftab/mobile.jpg"
                      width={375}
                      height={512}
                      alt="SwifTab mobile dashboard view with service utilization and orders"
                      className="w-full max-w-xs mx-auto aspect-auto object-contain object-center rounded-xl shadow-md border-2 border-gray-200"
                      quality={100}
                    />
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200/70">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                      <span className="text-sm text-gray-700">
                        Real-time Dashboard
                      </span>
                    </div>
                    <div className="text-sm text-gray-700">
                      Live data • Auto-refreshed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating UI elements with refined styling */}
            <div className="absolute -top-10 -right-10 bg-gradient-to-br from-primary/90 to-green-900/90 backdrop-blur-sm rounded-xl border border-gray-200/70 p-4 shadow-xl animate-float-slow">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-primary/50 to-green-500 p-2 rounded-full">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Today's Guests
                  </p>
                  <p className="text-xl font-bold text-white">128</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-primary/90 to-green-900/90 backdrop-blur-sm rounded-xl border border-gray-200/70 p-4 shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Today's Bookings
                  </p>
                  <p className="text-xl font-bold text-white">42</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refined brands section */}
      <div className="container px-4 md:px-6 mt-20">
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-medium">
            Empowering culinary excellence at restaurants like
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
          {trustedRes.map((item) => (
            <div
              key={item.id}
              className="h-20 transition-all duration-300 hover:opacity-100"
            >
              <Image
                src={item.imgUrl}
                width={80}
                height={80}
                alt={`Premium Restaurant Partner ${item.id}`}
                className="h-full w-auto object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
