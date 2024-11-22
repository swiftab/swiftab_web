"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "This product has revolutionized our business operations!",
    author: "John Doe, CEO",
  },
  {
    id: 2,
    text: "The customer support is unparalleled. Highly recommended!",
    author: "Jane Smith, CTO",
  },
  {
    id: 3,
    text: "We've seen a 50% increase in productivity since implementing this solution.",
    author: "Bob Johnson, COO",
  },
  {
    id: 4,
    text: "Intuitive interface and powerful features. A game-changer!",
    author: "Alice Brown, Project Manager",
  },
  {
    id: 5,
    text: "The ROI on this product has exceeded our expectations.",
    author: "Charlie Davis, CFO",
  },
  {
    id: 6,
    text: "This tool has streamlined our workflow significantly.",
    author: "Eva Wilson, Team Lead",
  },
];

export default function Testimonials() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute top-0 right-0 w-2/3 h-full bg-primary/40 transform rotate-12 translate-x-1/4 translate-y-[-10%] rounded-3xl shadow-2xl">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-[200%] h-[200%] flex flex-wrap gap-8 p-8"
            animate={{
              x: ["-25%", "-50%"],
              y: ["-25%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 20,
              ease: "linear",
            }}
          >
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="w-64 h-64 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 flex flex-col justify-between transform rotate-[-45deg] shadow-lg"
              >
                <p className="text-white text-lg font-medium italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="text-white text-sm font-bold mt-4">
                  - {testimonial.author}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute top-1/2 left-16 transform -translate-y-1/2 z-10">
        <div className="relative inline-block mb-12">
          <svg
            className="absolute -top-3 -left-3 w-6 h-6 text-primary/40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 24C0 10.7452 10.7452 0 24 0"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 24C8 15.1634 15.1634 8 24 8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 24C16 19.5817 19.5817 16 24 16"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <h2 className="text-4xl font-bold px-4 text-primary">
            What Our Clients Say
          </h2>
          <svg
            className="absolute -bottom-3 -right-3 w-6 h-6 text-primary/40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 0C24 13.2548 13.2548 24 0 24"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 0C16 8.83656 8.83656 16 0 16"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 0C8 4.41828 4.41828 8 0 8"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <p className="text-xl text-gray-600 max-w-md">
          Don't just take our word for it. See what our satisfied customers have
          to say about our swiftab.
        </p>
      </div>
    </div>
  );
}
