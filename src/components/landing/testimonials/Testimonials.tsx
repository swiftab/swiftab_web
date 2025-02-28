"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "TableReserve has completely transformed how we handle bookings. No more phone tag or double bookings!",
    author: "Maria Rodriguez",
    role: "Owner, La Trattoria",
    rating: 5,
    gradient: "from-blue-600/10 to-indigo-600/10",
  },
  {
    quote: "Our no-show rate dropped by 60% after implementing the automated reminder system. Game changer!",
    author: "James Chen",
    role: "Manager, Umami Bistro",
    rating: 5,
    gradient: "from-indigo-600/10 to-blue-600/10",
  },
  {
    quote: "The analytics dashboard helps us staff appropriately and has improved our overall efficiency.",
    author: "Sarah Johnson",
    role: "Operations Director, The Grill House",
    rating: 4,
    gradient: "from-cyan-600/10 to-blue-600/10",
  },
  {
    quote: "Setup was incredibly easy, and the customer support team is always responsive and helpful.",
    author: "Michael Patel",
    role: "Owner, Spice Garden",
    rating: 5,
    gradient: "from-cyan-600/10 to-blue-600/10",
  },
  {
    quote: "Our guests love being able to book online, and we love the time it saves our staff.",
    author: "Emma Wilson",
    role: "General Manager, Ocean Blue",
    rating: 5,
    gradient: "from-blue-600/10 to-cyan-600/10",
  },
  {
    quote: "The guest profiles feature has helped us provide more personalized service to our regulars.",
    author: "David Thompson",
    role: "Owner, Rustic Table",
    rating: 4,
    gradient: "from-indigo-600/10 to-orange-600/10",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-20 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-b from-gray-50 via-blue-900/10 to-gray-50 opacity-50"></div>
      <div className="absolute top-0 right-0 w-1/2 h-3/4 bg-primary/40 transform rotate-12 translate-x-1/4 translate-y-[20%] rounded-3xl shadow-2xl opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Heading section */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16" data-animate>
          <div className="relative inline-block mb-2">
            {/* <svg
              className="absolute -top-3 -left-3 w-6 h-6 text-primary/40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 24C0 10.7452 10.7452 0 24 0" stroke="currentColor" strokeWidth="2" />
              <path d="M8 24C8 15.1634 15.1634 8 24 8" stroke="currentColor" strokeWidth="2" />
              <path d="M16 24C16 19.5817 19.5817 16 24 16" stroke="currentColor" strokeWidth="2" />
            </svg> */}
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-900 to-cyan-200 bg-clip-text text-transparent">
              Loved by Restaurants Everywhere
            </h2>
            {/* <svg
              className="absolute -bottom-3 -right-3 w-6 h-6 text-primary/40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 0C24 13.2548 13.2548 24 0 24" stroke="currentColor" strokeWidth="2" />
              <path d="M16 0C16 8.83656 8.83656 16 0 16" stroke="currentColor" strokeWidth="2" />
              <path d="M8 0C8 4.41828 4.41828 8 0 8" stroke="currentColor" strokeWidth="2" />
            </svg> */}
          </div>
          <p className="max-w-[800px] text-gray-700 text-lg md:text-xl">
            Don't just take our word for it. Here's what our satisfied customers have to say.
          </p>
        </div>

        <div className="relative h-64 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute top-0 left-0 w-full flex gap-8 p-4"
            animate={{
              x: ["-100%", 0],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            }}
          >
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div
                key={`floating-${index}`}
                className="min-w-64 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 flex flex-col justify-between shadow-lg"
              >
                <p className="text-gray-900 text-lg font-medium italic">
                  "{testimonial.quote}"
                </p>
                <p className="text-gray-800 text-sm font-bold mt-4">
                  - {testimonial.author}, {testimonial.role}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Static testimonial cards
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-gray-200/70 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1 overflow-hidden"
              data-animate
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30 rounded-2xl`}
              ></div>
              <div className="relative">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200/70"}`}
                    />
                  ))}
                </div>
                <blockquote className="text-lg italic text-gray-900 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-auto pt-4 border-t border-gray-200/70">
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-700">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Animated floating testimonials */}
        <div className="relative h-64 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute top-0 left-0 w-full flex gap-8 p-4"
            animate={{
              x: [0, "-100%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            }}
          >
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div
                key={`floating-${index}`}
                className="min-w-64 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 flex flex-col justify-between shadow-lg"
              >
                <p className="text-gray-900 text-lg font-medium italic">
                  "{testimonial.quote}"
                </p>
                <p className="text-gray-800 text-sm font-bold mt-4">
                  - {testimonial.author}, {testimonial.role}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}