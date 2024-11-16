"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/landing/ServiceCard";
import TestimonialCard from "@/components/landing/TestimonialCard";
import FooterHome from "@/components/landing/FooterHome";

export default function LandingPage() {
  const servicesRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8f8]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/10 backdrop-blur">
        <div className="container flex h-16 items-center justify-between ">
          <Link href="/" className="flex items-center space-x-2 px-10">
            <Image src="/swiftab/logo.svg" width={100} height={100} alt="logo" className="bg-background/10" />
            {/* <span className="text-xl font-bold text-blue-950">SwifTab</span> */}
          </Link>
          <nav className="hidden md:flex gap-6">
            <button className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </button>
            <button className="text-sm font-medium hover:text-primary transition-colors">
              Contact Us
            </button>
            <button
              onClick={() => scrollToSection(servicesRef)}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection(testimonialsRef)}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              FAQ
            </button>
          </nav>
          <div className="flex gap-4">
            <Button variant="outline">
              <Link href={"/dash"}>Log In</Link>
            </Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
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
                  <span className="text-muted-foreground ml-2">
                    Restaurants
                  </span>
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
          <ServiceCard />
        </section>

        {/* Feature Section */}
        <section ref={featuresRef} className="px-20 py-15">
          <div className="container grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                Elevate Your Dining Experience
              </h2>
              <p className="text-xl text-muted-foreground">
                With SwifTab, finding and booking the perfect table has never
                been easier.
              </p>
              <Button size="lg">Learn more</Button>
            </div>
            <div className="relative h-[500px]">
              <Image
                src="/user.png"
                alt="SwifTab App Interface"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={testimonialsRef} className="py-24">
          <TestimonialCard />
        </section>
      </main>

      {/* Footer */}
      <FooterHome />
    </div>
  );
}
