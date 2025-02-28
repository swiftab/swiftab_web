"use client";

import { SignInForm } from "@/components/auth/SignInForm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

// Benefits data for carousel
const benefits = [
  {
    title: "Streamlined Reservations",
    description:
      "Manage all your bookings in one place with real-time updates and notifications.",
  },
  {
    title: "Table Management",
    description:
      "Optimize your restaurant layout and assign tables efficiently to maximize seating capacity.",
  },
  {
    title: "Staff Scheduling",
    description:
      "Create and manage staff schedules to ensure proper coverage during peak hours.",
  },
  {
    title: "Customer Insights",
    description:
      "Access detailed analytics about your customers' preferences and booking patterns.",
  },
  {
    title: "Inventory Control",
    description:
      "Track your inventory levels and get alerts when supplies are running low.",
  },
];

export default function page() {
  const [currentBenefit, setCurrentBenefit] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  const navigateBenefit = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    } else {
      setCurrentBenefit(
        (prev) => (prev - 1 + benefits.length) % benefits.length
      );
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-50 px-2 py-2">
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/swiftab/bg.jpg')", borderRadius:20 }}
      >
        <div className="absolute inset-0 bg-teal-800 bg-opacity-70 flex flex-col justify-center p-12 rounded-xl">
          <div className="text-white max-w-lg">
            <h1 className="text-4xl font-bold mb-6">
              Streamline Your Restaurant Management
            </h1>
            <p className="text-xl mb-8">
              Join thousands of restaurants that use our system to manage
              reservations, tables, staff, and more.
            </p>

            <div className="space-y-6">
              <div className="mb-8 relative bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="h-24 transition-all duration-500 ease-in-out">
                  <h4
                    className="font-medium text-teal-700"
                    style={{ color: "#008080" }}
                  >
                    {benefits[currentBenefit].title}
                  </h4>
                  <p className="text-gray-600 mt-2">
                    {benefits[currentBenefit].description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  {/* <button
                    onClick={() => navigateBenefit("prev")}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    aria-label="Previous benefit"
                  >
                    <ArrowLeft
                      size={16}
                      className="text-teal-700"
                      style={{ color: "#008080" }}
                    />
                  </button> */}

                  <div className="flex gap-1">
                    {benefits.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentBenefit(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentBenefit === index
                            ? "bg-teal-600 w-4"
                            : "bg-gray-300"
                        }`}
                        style={{
                          backgroundColor:
                            currentBenefit === index ? "#008080" : undefined,
                        }}
                        aria-label={`Go to benefit ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* <button
                    onClick={() => navigateBenefit("next")}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    aria-label="Next benefit"
                  >
                    <ArrowRight
                      size={16}
                      className="text-teal-700"
                      style={{ color: "#008080" }}
                    />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right section - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4 md:p-8">
        <SignInForm />
      </div>
    </div>
  );
}
